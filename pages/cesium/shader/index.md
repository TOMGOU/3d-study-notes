# Cesium 中的自定义着色器代码

> Cesium 中有三个地方可以直接编写着色器代码：
  * entities 自定义材质
  * primitive 自定义材质
  * primitive 自定义外观

## entities 自定义材质

```js
  const viewer = new Cesium.Viewer('container', {
    animation: false,
    baseLayerPicker: false,
    // geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    timeline: false,
    navigationHelpButton: false,
    antialias: true,
  })

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none"

  // 添加实体
  class CustomMaterialPropery {
    constructor() {
      this.definitionChanged = new Cesium.Event();
      Cesium.Material._materialCache.addMaterial("CustomMaterial", {
        fabric: {
          type: "CustomMaterial",
          uniforms: {
            uTime: 0,
          },
          source: `
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
              // 生成默认的基础材质
              czm_material material = czm_getDefaultMaterial(materialInput);
              material.diffuse = vec3(materialInput.st, uTime);
              material.alpha = 0.5;
              return material;
            }
          `,
        },
      });

      this.params = {
        uTime: 0,
      };
      gsap.to(this.params, {
        uTime: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });
    }
    getType() {
      // 返回材质类型
      return "CustomMaterial";
    }
    getValue(time, result) {
      result.uTime = this.params.uTime;
      // 返回材质值
      return result;
    }
  }

  let material = new CustomMaterialPropery();

  const rectangle = viewer.entities.add({
    id: "entityRect",
    rectangle: {
      coordinates: Cesium.Rectangle.fromDegrees(
        // 西边的经度
        100,
        // 南边维度
        20,
        // 东边经度
        120,
        // 北边维度
        30
      ),
      // 设置entity材质，MaterialProperty
      // material: Cesium.Color.BLUE.withAlpha(0.5),
      // height: 3000,
      material,
    },
  });
```

## primitive 自定义材质

```js
  const viewer = new Cesium.Viewer('container', {
    animation: false,
    baseLayerPicker: false,
    // geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    timeline: false,
    navigationHelpButton: false,
    antialias: true,
  })

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none"

  // 添加 primitive
  // 01-创建几何体
  let rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      121,
      // 南边维度
      20,
      // 东边经度
      122,
      // 北边维度
      30
    ),
    // 距离表面高度
    height: 0,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  });

  // 02-创建几何体实例
  let instance = new Cesium.GeometryInstance({
    id: "redRect",
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.RED.withAlpha(0.5)
      ),
    },
  });

  let material = new Cesium.Material({
    fabric: {
      uniforms: {
        uTime: 0,
      },
      source: `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
          // 生成默认的基础材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          // material.diffuse = vec3(materialInput.st+uTime, 0.0);
          float strength = mod((materialInput.st.y - uTime) * 2.0, 1.0);
          material.diffuse = vec3(strength, 0.0, 0.0);
          return material;
        }
      `,
    },
  });

  // 03-外观
  let appearance = new Cesium.EllipsoidSurfaceAppearance({
    material,
    aboveGround: false,
    translucent: true,
  });
  appearance.uniforms = {
    uTime: 0,
  };

  gsap.to(appearance.uniforms, {
    uTime: 1,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "linear",
  });

  // 04-图元
  let primitive = new Cesium.Primitive({
    geometryInstances: [instance],
    appearance: appearance,
    show: true,
  });

  // 05-添加到viewer
  viewer.scene.primitives.add(primitive);
```

## primitive 自定义外观

```js
const viewer = new Cesium.Viewer('container', {
    animation: false,
    baseLayerPicker: false,
    // geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    timeline: false,
    navigationHelpButton: false,
    antialias: true,
  })

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = "none"

  // 添加 primitive
  // 01-创建几何体
  let rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
      // 西边的经度
      121,
      // 南边维度
      20,
      // 东边经度
      122,
      // 北边维度
      30
    ),
    // 距离表面高度
    height: 0,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  });

  // 02-创建几何体实例
  let instance = new Cesium.GeometryInstance({
    id: "redRect",
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.RED.withAlpha(0.5)
      ),
    },
  });

  // 03-外观
  let appearance = new Cesium.EllipsoidSurfaceAppearance({
    aboveGround: false,
    translucent: true,
    fragmentShaderSource: `
      in vec3 v_positionMC;
      in vec3 v_positionEC;
      in vec2 v_st;
      uniform float uTime;

      void main() {
        czm_materialInput materialInput;
        out_FragColor = vec4(v_st, 0.5, 1.0);
      }
    `,
  });
  appearance.uniforms = {
    uTime: 0,
  };

  gsap.to(appearance.uniforms, {
    uTime: 1,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "linear",
  });

  // 04-图元
  let primitive = new Cesium.Primitive({
    geometryInstances: [instance],
    appearance: appearance,
    show: true,
  });

  // 05-添加到viewer
  viewer.scene.primitives.add(primitive);
```
