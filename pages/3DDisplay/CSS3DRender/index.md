# CSS3DRender 标注

> 在 3D 标注中，我们可以使用 CSS3DRenderer 来渲染 3D 标注。

```html
<div class="mark">
  <div class="des">
    <div class="title">刀片电池</div>
    <div class="text">单体电池长96mm、宽9mm、高1.35mm</div>
    <div class="text">可循环充放电3000次以上，续航600公里</div>
  </div>
</div>
```

```js
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// 创建标注：将普通 html 转换为 3D 标注
const mark1 = document.getElementsByClassName('mark')[0];
mark1.style.visibility = 'visible';
const label1 = new CSS3DObject(mark1);
mark1.style.pointerEvents = 'none';
label1.position.copy(LFSprite.position);
label1.scale.set(0.5, 0.5, 1.0);
label1.position.set(0, 0, 0);
label1.position.x -= 220;
label1.position.y += 50;
label1.rotateY(-Math.PI / 2);
model.add(label1);

// 渲染 3D 标注
const labelRenderer = new CSS3DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.left = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);
```