# glsl 奇技淫巧

## 缩放

> 适用于水波纹，信号扩散等动效

### 代码举例

```glsl
uniform float u_time;
uniform sampler2D u_image;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec4 color = texture2D(u_image, (st - 0.5) * (1. - fract(u_time)) * 10.0 + 0.5);
	gl_FragColor = color;
}
```

### 简单说明：

* 无论是旋转还是缩放，都有一个中心点，在动画之前首先要将 st 平移到中心点（st - 0.5），动画之后再平移回来（+ 0.5）。

* 对于 texture2D(u_image, st)，st 是一个二维向量，st 乘以一个大于 1 的值，纹理贴图是在缩小；反之放大。

* 对于连续往返的动画，可以使用：abs(sin(u_time))；对于不连续的单向动画，可以使用：fract(u_time)。

## 旋转

> 适用于雷达扫描，特殊标注等动效

### 代码举例

```glsl
uniform float u_time;
uniform sampler2D u_image;

vec2 rotateMat = mat2(
  cos(u_time), -sin(u_time),
  sin(u_time), cos(u_time)
);

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 newSt = rotateMat * (st - 0.5) + 0.5;
  vec4 color = texture2D(u_image, newSt);
	gl_FragColor = color;
}
```

### 简单说明：

* 无论是旋转还是缩放，都有一个中心点，在动画之前首先要将 st 平移到中心点（st - 0.5），动画之后再平移回来（+ 0.5）。

* 旋转动画的核心就是这个旋转矩阵
