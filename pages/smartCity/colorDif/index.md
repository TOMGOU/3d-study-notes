# 深度排序问题

> 两个半透明的物体交织在一起的时候，由于深度排序问题，不同的角度看到的颜色差异较大。

## 解决方案一：使用不透明材质

> 不透明材质不具有透明度，只显示自身颜色，而不受背景颜色的影响。要使用不透明材质，可以将材质的 `transparent` 属性设置为 false。

```js
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: false
});
```

## 解决方案二：将背景颜色设置为与物体颜色相同的颜色

> 将背景颜色设置为与物体颜色相同的颜色，可以使物体的颜色看起来像是“挖空”了背景颜色，从而达到只显示物体颜色的效果。

```js
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xff0000, 1);
```

## 解决方案三：使用深度测试

> 深度测试可以确保只有物体前面的像素才会被渲染，从而使物体的颜色看起来像是“遮挡”了背景颜色。要使用深度测试，可以将材质的 `depthTest` 属性设置为 true，同时设置 `depthWrite` 属性为 true。

```js
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  depthTest: true,
  depthWrite: true
});
```

- 特别注意：此方案会形成黑色的背景块，需要使用方案四中的 `alphaTest` 属性来解决这个问题。

## 解决方案四：使用 `alphaTest` 属性，控制渲染时丢弃透明度低于特定值的像素。


```js
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  alphaTest: 0.01,
  depthTest: true,
  depthWrite: true
});
```

## 原理解析

### 三个关键属性的解析：

- `depthTest`: 深度测试属性。深度测试会根据场景中物体的距离来确定哪个物体在前面哪个物体在后面。开启深度测试可以避免绘制被遮挡的像素，从而提高渲染性能。当 depthTest 属性为 true 时，将使用 OpenGL 深度测试（即 z-buffering）算法来决定像素的可见性。

- `depthWrite`: 深度写入属性。深度写入会将像素的深度信息写入深度缓冲区，以便进行深度测试。当 `depthWrite` 属性为 false 时，将禁止写入深度缓冲区，这意味着所有的像素都将被视为在场景中最靠近摄像机的物体，并且可能会覆盖其他物体。一般情况下，深度写入应该启用（即 `depthWrite` 设为 true）。

- `alphaTest`: alpha 测试属性。alpha 测试会根据像素的 alpha 值来判断像素是否可见。当 `alphaTest` 属性大于等于 0 且小于 1 时，将使用 alpha 测试算法来决定像素的可见性。例如，当 `alphaTest` 属性为 0.5 时，只有像素的 alpha 值大于等于 0.5 时才会被视为可见像素，否则会被视为不可见像素。这个属性可以用于解决透明物体的渲染问题，例如在渲染玻璃、水面等透明物体时，可以将 `alphaTest` 属性设置为透明度阈值，以避免渲染过度的像素。

材质的 `depthTest` 属性为 true，表示开启深度测试。`depthWrite` 属性也为 true，表示允许写入深度缓冲区。`alphaTest` 属性为 0.2，表示只有像素的 alpha 值大于等于 0.2 时才会被视为可见像素，这样可以避免过度渲染半透明的像素。

### 现象一：黑色背景块

> { depthTest: true, depthWrite: true }，有黑色背景块，半透明的像素被过度渲染。

### 现象二：色差明显

> { depthTest: true, depthWrite: false }，禁止将像素的深度信息写入深度缓冲区，导致渲染引擎无法识别哪个半透明物体离相机近。