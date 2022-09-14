# threeJS 基础知识

- 形状：Geometry
- 材质：Material
- 模型：Geometries = new THREE.Mesh(geometry, material)
- 光源：Light
- 场景：Scene: Scene.add(Light) Scene.add(Geometries)
- 相机：Camera
- 渲染器：renderer: renderer.render(scene, camera) => document.body.appendChild(renderer.domElement)
- 扩展控件：Controls: OrbitControls + Controls
- 加载器：Loaders

## 主要流程

![主要流程](../../imgs/T_process.png)
