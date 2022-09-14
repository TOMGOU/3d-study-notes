# MaterialReset

> 由于不同的 3D 制作软件渲染的效果有细微的差异，一般需要对材质属性进行重新设置。

## metalness

- 材质与金属的相似度。
- 非金属材质，如木材或石材，使用0.0，金属使用1.0，通常没有中间值。 
- 默认值为0.0。0.0到1.0之间的值可用于生锈金属的外观。

## roughness

- 材质的粗糙程度。
- 0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。

## envMapIntensity

- 通过乘以环境贴图的颜色来缩放环境贴图的效果。

## transmission

- 透光率（或者说透光性），范围从0.0到1.0。默认值是0.0。
- 很薄的透明或者半透明的塑料、玻璃材质即便在几乎完全透明的情况下仍旧会保留反射的光线，透光性属性用于这种类型的材质。
- 当透光率不为 0 的时候, opacity 透明度应设置为 1.
- MeshPhysicalMaterial 特有。

## 例子

```js
import * as THREE from 'three';

const SetCarMaterial = (carModel) => {
  const textureCube = new THREE.CubeTextureLoader()
    .setPath('./skybox/')
    .load(['li.jpg', 'xin.jpg', 'chu.jpg', 'xing.jpg', 'top.jpg', 'bottom.jpg']);
  textureCube.encoding = THREE.sRGBEncoding;
  carModel.traverse((object) => {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 4) === '高光金属') {
        object.material = new THREE.MeshStandardMaterial({
          color: object.material.color,
          metalness: 1.0,
          roughness: 0.2,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 2) === '外壳') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: object.material.color,
          clearcoat: 1,
          clearcoatRoughness: 0.01,
          metalness: 1.0,
          roughness: 0.5,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 2) === '玻璃') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.0,
          roughness: 0,
          transparent: true,
          transmission: 0.99,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 3) === '后视镜') {
        object.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.0,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 2) === '轮胎') {
        object.material.color.set(0x000000);
        object.material.normalScale.set(2, 2);
        object.material.metalness = 0.0;
        object.material.roughness = 0.6;
      } else if (object.name.slice(0, 3) === '前灯罩') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.0,
          roughness: 0,
          transmission: 0.9,
          transparent: true,
        });
      } else if (object.name.slice(0, 4) === '尾灯灯罩') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0xff0000,
          metalness: 0.0,
          roughness: 0,
          transmission: 0.5,
          transparent: true,
        });
      } else if (object.name.slice(0, 5) === '尾灯第二层') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0x440000,
          metalness: 0.0,
          roughness: 0,
          transmission: 0.5,
          transparent: true,
        });
      } else if (object.name.slice(0, 4) === '尾灯发光') {
        object.material = new THREE.MeshLambertMaterial({
          color: 0x660000,
        });
      } else if (object.name.slice(0, 5) === '尾灯第三层') {
        object.material = new THREE.MeshLambertMaterial({
          color: 0x19190000,
        });
      } else if (object.name.slice(0, 2) === '塑料') {
        object.material = new THREE.MeshPhysicalMaterial({
          color: 0x010101,
          metalness: 0.0,
          roughness: 0.8,
        });
      }
      carModel.getObjectByName('天窗黑玻璃').material = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.0,
        roughness: 0,
        envMapIntensity: 1.0,
        transmission: 0.5,
        transparent: true,
      });
      carModel.getObjectByName('车座').material = new THREE.MeshPhysicalMaterial({
        color: 0x020202,
        metalness: 0.0,
        roughness: 0.6,
      });
      object.material.envMap = textureCube;
    }
  });
};

export default SetCarMaterial;

```
