# 3D 项目性能优化

## 加载优化

### 1.缓存

### 2.路由懒加载

### 3.Web Worker

> glb 模型并发加载工作原理
> web worker 可以解析 glb 模型 但是 postMessage 发送的数据类型只是普通的对象，
> 并且不能存在方法，方法无法传递，带方法会导致发送失败，并且不会触发 onerror
> THREE 构建物体所需的 bufferGeometry，还是 BufferAttribute 或者 Material 等原型对象无法被传递
> 传递到主线程的只是一个普通对象和上面的属性(对象中不能有函数)
> 可以通过生成一个 THREE 所需的类型 把传递过来的对象上的参数复制给 THREE 需要的对象上
> 这样在主线程生成一个同样的模型，但是省去了解析模型时间(模型解析在 web worker 中与 js 主线程并发执行)实现并发加载

- 创建 webworker

> 普通 worker 无法使用导入的库: 添加第二个参数 { type: 'module' }

```js
const worker = new Worker(new URL('../composables/task.ts', import.meta.url), { type: 'module' })
let model: any = null
worker.onmessage = (event) => {
  console.log('webwork', event.data)
  model = parseModel(event.data)
  console.log({ model })
  // scene.add(model)
}
worker.postMessage('floor')
```

- webworker 子线程任务

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import setFloorMaterial from './setFloorMaterial'
import { genAnimations, genGroupStruct } from './parse'

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./3D/draco/')
loader.setDRACOLoader(dracoLoader)

onmessage = (e) => {
  const num = e.data
  console.log({ num })
  loader.load(
    'http://localhost:5173/3D/gltf/floor-1.glb',
    (gltf: any) => {
      // 材质重置
      setFloorMaterial(gltf.scene)

      return postMessage({
        ...genGroupStruct(gltf.scene),
        sceneAnimations: genAnimations(gltf.animations)
      })
    },
    (xhr: any) => {
      // console.log({ xhr })
    },
    (err: any) => {
      console.log({ err })
      postMessage({ msg: 'Worker 模型加载错误！' + num })
    }
  )
}
```

- 模型解析器

```js
/**
 * 生成基本参数 旋转 位移 缩放等属性
 */
const genBaseStruct = (obj: THREE.Object3D) => {
  const { type, name, quaternion: q, position: p, rotation: r, scale: s, up: u, userData, visible, matrix } = obj
  const quaternion = [q.x, q.y, q.z, q.w]
  const position = [p.x, p.y, p.z]
  const rotation = [r.x, r.y, r.z, r.order]
  const scale = [s.x, s.y, s.z]
  const up = [u.x, u.y, u.z]

  return {
    type,
    name,
    quaternion,
    position,
    rotation,
    scale,
    up,
    matrix,
    userData,
    visible,
    children: genObject3DChildren(obj.children),
    animations: genAnimations(obj.animations)
  }
}

/**
 * 生成动画结构
 */
export const genAnimations = (animations: THREE.AnimationClip[]) =>
  animations.map((animation) => {
    animation['tracks'].forEach((t) => delete t['createInterpolant'])
    return animation
  })

/**
 * 生成物体参数
 */
const genMeshStruct = (mesh: THREE.Mesh) => {
  const { geometry, material } = mesh

  return {
    geometry,
    material,
    ...genBaseStruct(mesh)
  }
}

/**
 * 生成物体参数
 */
const genLineSegmentsStruct = (lineSegments: THREE.LineSegments) => {
  const { geometry, material } = lineSegments

  return {
    geometry,
    material,
    ...genBaseStruct(lineSegments)
  }
}

const genPointLightStruct = (pointLight: THREE.PointLight) => {
  return {
    power: pointLight.power,
    color: pointLight.color,
    decay: pointLight.decay,
    castShadow: pointLight.castShadow,
    distance: pointLight.distance,
    frustumCulled: pointLight.frustumCulled,
    intensity: pointLight.intensity,
    layers: pointLight.layers,
    ...genBaseStruct(pointLight)
  }
}

const genObject3DStruct = (object: THREE.Object3D) => {
  return {
    ...genBaseStruct(object)
  }
}

/**
 * 生成子元素结构
 */
const genObject3DChildren = (children: THREE.Object3D[]) => {
  const childStruct = []
  for (const child of children) {
    const { type } = child
    if (type === 'Mesh') {
      childStruct.push(genMeshStruct(child as THREE.Mesh))
    } else if (type === 'LineSegments') {
      childStruct.push(genLineSegmentsStruct(child as THREE.LineSegments))
    } else if (type === 'Group') {
      childStruct.push(genGroupStruct(child as THREE.Group))
    } else if (type === 'PointLight') {
      childStruct.push(genPointLightStruct(child as THREE.PointLight))
    } else if (type === 'Object3D') {
      childStruct.push(genObject3DStruct(child))
    }
  }
  return childStruct
}

/**
 * 生成物体组结构
 */
export const genGroupStruct = (group: THREE.Group) => {
  const struct = { ...genBaseStruct(group) }
  return struct
}

```

- 模型加载器

```js
import * as THREE from 'three'
import { THREEMaterialType, Vector3Arr, IBaseProps, IGroupParams, IMeshParams, IPointLight } from './types'

/**
 * 通过设置attributes index来复刻一个集合体
 */
const genGeometry = (geometry: IMeshParams['geometry']) => {
  const geom = new THREE.BufferGeometry()
  // const geom = new THREE.InstancedBufferGeometry()
  const {
    attributes: { position, uv, normal },
    index
  } = geometry

  console.log({ position, uv, normal })

  //处理几何坐标

  const vertexBuffer = new THREE.InterleavedBuffer(position.data.array, 8)
  const positions = new THREE.InterleavedBufferAttribute(vertexBuffer, position.itemSize, position.offset, position.normalized)
  geom.setAttribute('position', positions)
  const uvs = new THREE.InterleavedBufferAttribute(vertexBuffer, uv.itemSize, uv.offset, uv.normalized)
  geom.setAttribute('uv', uvs)
  const normals = new THREE.InterleavedBufferAttribute(vertexBuffer, normal.itemSize, normal.offset, normal.normalized)
  geom.setAttribute('normal', normals)

  geom.setIndex(index ? new THREE.BufferAttribute(index.array, index.itemSize, index.normalized) : null)

  // const attributes = {
  //   position: new THREE.BufferAttribute(position.data.array, position.itemSize, position.normalized),
  //   uv: new THREE.BufferAttribute(uv.data.array, uv.itemSize, uv.normalized),
  //   normal: new THREE.BufferAttribute(normal.data.array, normal.itemSize, normal.normalized)
  // }
  // geom.attributes = attributes
  // geom.index = index ? new THREE.BufferAttribute(index.array, index.itemSize, index.normalized) : null

  return geom
}

/**
 * 通过设置attributes index来复刻一个 LineSegments 集合体
 */
const genLineSegmentsGeometry = (geometry: IMeshParams['geometry']) => {
  const geom = new THREE.BufferGeometry()
  // const geom = new THREE.InstancedBufferGeometry()
  const {
    attributes: { position }
  } = geometry

  // 处理几何坐标
  geom.setAttribute('position', new THREE.BufferAttribute(position.array, position.itemSize, position.normalized))

  return geom
}

/**
 * 根据传入纹理的参数生成真正有效的Material类型数据
 */
const genMaterial = (mate: IMeshParams['material']) => {
  if (!mate) return undefined
  const multipleMaterial = Array.isArray(mate)
  const material = multipleMaterial ? ([] as THREE.Material[]) : new THREE[mate.type as THREEMaterialType]()
  //处理材质
  //多个材质
  if (multipleMaterial && Array.isArray(material)) {
    for (const m of mate) {
      const im = new THREE[m.type as THREEMaterialType]()
      material.push(im)
    }
  } else if (mate) {
    //单个材质
    Object.assign(material, mate)
  }
  return material
}

/**
 * 处理基本属性转换(Object3D基类上的属性) matrix scale rotate translate position children  animations
 */
const parseBaseParams = (params: IBaseProps, object: THREE.Object3D) => {
  const matrix = new THREE.Matrix4()
  matrix.elements = params.matrix.elements
  object.name = params.name
  object.matrix = matrix
  object.rotation.set(...params.rotation)
  object.position.set(...params.position)
  object.scale.set(...params.scale)
  object.quaternion.set(...params.quaternion)
  object.up.set(...params.up)
  object.userData = params.userData
  object.visible = params.visible

  parseChildren(object, params.children)
  genAnimations(object, params.animations)
}

const parseMesh = (IMeshParams: IMeshParams) => {
  const geometry = genGeometry(IMeshParams.geometry)
  const material = genMaterial(IMeshParams.material)

  const mesh = new THREE.Mesh(geometry, material)
  parseBaseParams(IMeshParams, mesh)
  return mesh
}

const parseLineSegments = (ILineSegments: IMeshParams) => {
  const geometry = genLineSegmentsGeometry(ILineSegments.geometry)
  const material = genMaterial(ILineSegments.material)

  const line = new THREE.LineSegments(geometry, material)
  parseBaseParams(ILineSegments, line)
  return line
}

const parseGroup = (params: IGroupParams) => {
  const group = new THREE.Group()
  parseBaseParams(params, group)
  return group
}

const parsePointLight = (params: IPointLight) => {
  const color = new THREE.Color()
  // 色彩空间
  // export type ColorSpace = NoColorSpace | SRGBColorSpace | LinearSRGBColorSpace
  // export type NoColorSpace = ''
  // export type SRGBColorSpace = 'srgb'
  // export type LinearSRGBColorSpace = 'srgb-linear'
  //glb模型为了亮度恢复 使用srgb格式 所以颜色也使用同样格式 使其颜色模式一致
  color.setRGB(params.color.r, params.color.g, params.color.b, 'srgb-linear')

  const pointLight = new THREE.PointLight(color, params.intensity, params.distance, params.decay)
  parseBaseParams(params, pointLight)
  return pointLight
}

const parseObject3D = (params: IBaseProps) => {
  const object = new THREE.Object3D()
  parseBaseParams(params, object)
  return object
}

const parseChildren = (object3D: THREE.Object3D, children: IBaseProps[]) => {
  if (!children.length) return
  const objectList: THREE.Object3D[] = []
  for (const child of children) {
    const { type } = child
    if (type === 'Mesh') {
      objectList.push(parseMesh(child as IMeshParams))
    } else if (type === 'LineSegments') {
      objectList.push(parseLineSegments(child as IMeshParams))
    } else if (type === 'Group') {
      objectList.push(parseGroup(child))
    } else if (type === 'PointLight') {
      objectList.push(parsePointLight(child as IPointLight))
    } else if (type === 'Object3D') {
      objectList.push(parseObject3D(child))
    } else {
      throw new Error('出现了未处理的类型：' + type)
    }
  }

  object3D.add(...objectList)
}
/**
 * 生成动画
 */
const genAnimations = (object3D: THREE.Object3D, sceneAnimations: IGroupParams['sceneAnimations']) => {
  if (!sceneAnimations) return
  const animations: THREE.AnimationClip[] = []

  for (const animation of sceneAnimations!) {
    const clip = new THREE.AnimationClip(animation.name, animation.duration, [], animation.blendMode)

    for (const { name, times, values } of animation.tracks) {
      const nreTrack = new THREE.QuaternionKeyframeTrack(name, times as any, values as any)
      clip.tracks.push(nreTrack)
    }

    animations.push(clip)
  }

  object3D.animations = animations
}

/**
 * 解析传入的模型参数生成有效的three.js物体
 */
export const parseModel = (params: IGroupParams) => {
  const model = parseGroup(params)
  // model.position.x += 10
  genAnimations(model, params.sceneAnimations)
  // console.log('解析完:', model)

  return model
}

```

## 渲染优化

### 1.drawcall

> draw call 是指向图形处理器发出的绘制命令。每次调用 draw call，都会向 GPU 发送一组顶点和一组纹理，然后 GPU 根据这些数据绘制出一个三维物体。在绘制复杂的场景时，需要发出大量的 draw call，这可能会对性能产生负面影响

- 减少材质的数量：每个材质都需要单独的 draw call，因此减少材质的数量可以减少 draw call 的数量。

- 使用纹理图集：将多个纹理合并成一个纹理图集可以减少 draw call 的数量。

- 合并网格：如果多个网格具有相同的材质和纹理，则可以将它们合并成一个网格，以减少 draw call 的数量。

- 减少灯光的数量：每个灯光都需要单独的 draw call，因此减少灯光的数量可以减少 draw call 的数量。

- 减少透明度物体的数量：透明度物体需要进行混合和排序，这会导致更多的 draw call。因此，减少透明度物体的数量可以减少 draw call 的数量。

- 使用 LOD（层级细节）：使用 LOD 可以根据距离自动调整物体的细节级别。这可以减少细节不必要的物体的 draw call 数量。

- 使用批处理：批处理是将多个物体合并为一个 draw call 的技术。这可以大大减少 draw call 的数量，提高性能。

- 使用 GPU 实例化：GPU 实例化是在 GPU 上绘制多个相同的物体的一种技术，可以通过单个 draw call 来绘制多个实例，从而减少 draw call 的数量。

### 2.帧数优化

> 帧数（FPS）是衡量性能的重要指标。通常，较高的帧数意味着更流畅的体验和更好的游戏感觉。

## 内存优化

- 减少场景中的多边形数量：减少场景中的多边形数量可以降低内存使用量和渲染时间。可以使用多边形化工具来将复杂的几何体转换为简单的几何体，从而减少多边形数量。

- 使用纹理合集：使用纹理合集可以将多个纹理合并为一个，从而减少内存使用量。这可以通过使用纹理集来实现。

- 优化纹理大小：使用适当大小的纹理可以减少内存使用量。如果纹理大小过大，可以使用压缩技术将其压缩为较小的文件。

- 释放不需要的资源：在场景中使用的资源可以随着时间释放。可以根据需要在场景中加载和卸载资源，以避免浪费内存。

- 优化脚本：如果脚本在场景中消耗大量内存，则可以优化它们以减少内存使用量。可以尝试使用更少的变量、更少的递归和更好的内存管理技术。

- 基于 LOD 级别减少模型的细节：当模型距离相机越远时，可以逐步减少其细节级别，从而减少内存使用量。

- 使用模型复用：对于多个具有相似几何体的模型，可以使用模型复用，这样只需要存储一份几何体数据，可以在多个模型中共享。

- 禁用不必要的特性：如果某些特性不必要，则可以禁用它们以减少内存使用量。例如，可以禁用阴影、反射和抗锯齿等效果。

### 1.内存释放

```js
onBeforeUnmount(() => {
  try {
    scene.clear()
    renderer.dispose()
    group.remove(buildingModel)
    group.remove(buildingModelWire)
    scene.remove(group)
    scene.remove.apply(scene, scene.children)
    renderer.forceContextLoss()
    renderer.content = null
    cancelAnimationFrame(animationID.value)
    const gl = renderer.domElement.getContext('Model')
    gl && gl.getExtension('WEBGL_lose_context').loseContext()
  } catch (e) {
    console.log(e)
  }
})
```
