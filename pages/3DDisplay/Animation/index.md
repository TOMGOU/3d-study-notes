# Animation

> **tween.js** is a powerful tool for creating interactive animations.

## 动画：旋转 + 平移 + 缩放

### 旋转: rotate

```js
// method
Mesh.rotateY(-Math.sin(Math.PI / 2));

// attribute
Mesh.rotation.y = -Math.sin(Math.PI / 2);

```

### 平移: translate

```js
// method
Mesh.translateY(100);

// attribute
Mesh.position.y += 100;

```

### 缩放: scale

```js
// method
Mesh.scaleY(1.5);

// attribute
Mesh.scale.y = 1.5;

```

## tween.js

> 文档地址：https://github.com/tweenjs/es6-tween/blob/HEAD/API.md  

> 这个 npm 包已经停止维护了，但很好用。

```js
import { Tween, Easing } from 'es6-tween';

let tween = null
const rotateY = (value) => {
  // LFDoor 是需要旋转的 3D 对象
  tween = new Tween(LFDoor.rotation)
    .to({ y: value }, 300)
    .easing(Easing.Exponential.In)
    .delay(100 * Math.random())
    .start();
};

const render = () => {
  if (scene.children[6]) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(scene.children[6], true);
    if (intersects[0] && flag) {
      if (intersects[0].object.parent.name === '左前门' || intersects[0].object.name === 'LFSprite') {
        if (LFDoor.flag) {
          // LFDoor.rotateY(Math.sin(Math.PI / 2));
          // LFDoor.rotation.y = 0;
          rotateY(0);
          LFDoor.flag = false;
        } else {
          // LFDoor.rotateY(-Math.sin(Math.PI / 2));
          // LFDoor.rotation.y = -Math.sin(Math.PI / 2);
          rotateY(-Math.sin(Math.PI / 2));
          LFDoor.flag = true;
        }
      }
      flag = false;
    }
  }

  if (tween) tween.update();

  scene.rotateY(0.0005);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

```
