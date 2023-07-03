# Raycaster 3D 点击事件

> 文档地址：https://threejs.org/docs/?q=Raycaster#api/zh/core/Raycaster

> intersectObject: 检测射线和单个物体的相交

> intersectObjects: 检测射线和多个物体的相交

```js
const mouse = new THREE.Vector2(-10000000, -1000000);
let flag = false;
const raycaster = new THREE.Raycaster();

const onDocumentClick = (event) => {
  flag = true;
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

document.addEventListener('click', onDocumentClick, false);

const render = () => {
  if (scene.children[6]) {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(scene.children[6], true);
    if (intersects[0] && flag) {
      console.log('intersects', intersects[0]);
      if (intersects[0].object.parent.name === '左前门' || intersects[0].object.name === 'LFSprite') {
        if (LFDoor.flag) {
          LFDoor.rotateY(Math.sin(Math.PI / 2));
          LFDoor.flag = false;
        } else {
          LFDoor.rotateY(-Math.sin(Math.PI / 2));
          LFDoor.flag = true;
        }
      }
      flag = false;
    }
  }
}

requestAnimationFrame(render);
```