# KeyboardControl 控制物体的移动

> three.js example 中的 KeyboardControl 代码

```js
const keyboardControls = (function () {
  const keys = {
    SP: 32, W: 87, A: 65, S: 83, D: 68, UP: 38, LT: 37, DN: 40, RT: 39,
  };

  const keysPressed = {};

  (function (watchedKeyCodes) {
    const handler = function (down) {
      return function (e) {
        const index = watchedKeyCodes.indexOf(e.keyCode);
        if (index >= 0) {
          keysPressed[watchedKeyCodes[index]] = down;
          e.preventDefault();
        }
      };
    };
    window.addEventListener('keydown', handler(true), false);
    window.addEventListener('keyup', handler(false), false);
  }([
    keys.SP, keys.W, keys.A, keys.S, keys.D, keys.UP, keys.LT, keys.DN, keys.RT,
  ]));

  const forward = new THREE.Vector3();
  const sideways = new THREE.Vector3();
  let i = 0; let
    j = 0;
  return function () {
    // 观看
    if (keysPressed[keys.UP]) {
      i += 1;
      camera.lookAt(new THREE.Vector3(0, 30 + i, j));
    }
    if (keysPressed[keys.DN]) {
      i -= 1;
      camera.lookAt(new THREE.Vector3(0, 30 + i, j));
    }
    if (keysPressed[keys.LT]) {
      j += 10;
      camera.lookAt(new THREE.Vector3(0, 30 + i, j));
    }
    if (keysPressed[keys.RT]) {
      j -= 10;
      camera.lookAt(new THREE.Vector3(0, 30 + i, j));
    }

    // 移动
    if (keysPressed[keys.D]) {
      camera.translateX(10);
    }
    if (keysPressed[keys.A]) {
      camera.translateX(-10);
    }

    if (keysPressed[keys.W]) {
      camera.translateZ(-1);
    }
    if (keysPressed[keys.S]) {
      camera.translateZ(1);
    }
  };
}());

const render = () => {
  keyboardControls();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();

```
