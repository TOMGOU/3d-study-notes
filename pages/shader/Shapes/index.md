# Shapes

> 主要记录常用的形状写法：方形，圆形和三角形。

> 片元着色器书写的时候，需要注意的两点：1. 浮点数记得加小数点；2. 分号不能少。

## Rectangle

### multiple

> 使用 uv 坐标的 x 和 y 分别与 特定的值进行 step 比较，然后让比较的结果相乘，利用 0 乘以任何值都为 0 的特性，把四边都变成黑色，中间的白色部分就形成了一个方形。

> 1.0 - st 计算的是上边和右边，因为 uv 的坐标原点在左下方。

> step(0.4, st) 可以改成 step(vec2(0.4, 0.3), st)，就能画长方形了。

```glsl
vec2 st = gl_FragCoord.xy / u_resolution.xy;

// bottom-left
vec2 bl = step(0.4, st);
float pct = bl.x * bl.y;

// top-right
vec2 tr = step(0.4, 1.0 - st);
pct *= tr.x * tr.y;

vec3 color = vec3(pct);

gl_FragColor = vec4(color, 1.);
```

### abs + max

> uv 坐标的 x 和 y 分别减去 0.5，将原点移动到中间（-0.5 to 0.5），然后分别求绝对值，再取最大值，得到的结果与固定数值进行 step 比较，小于固定数值的部分显示黑色，其余部分显示白色。

> max 直接拿最大值进行比较，避免了分别比较还要相乘的算法，更高效。

> uv 坐标的 x 和 y 分别减去 0.5, 将原点移动到中间，然后分别求绝对值，一次性计算四边，只能画正方形。

```glsl
vec2 st = gl_FragCoord.xy / u_resolution.xy;
float pct = step(0.1, max(abs(st.x - 0.5), abs(st.y - 0.5)));
vec3 color = vec3(pct);
gl_FragColor =vec4(color, 1.);
```

### 结合两种写法的优点

```glsl
vec2 st = gl_FragCoord.xy / u_resolution.xy;
vec2 uv = st - 0.5;
vec2 pct = step(abs(uv), vec2(0.2, 0.3));
float strength = 1. - pct.x * pct.y;
vec3 color = vec3(strength);
gl_FragColor =vec4(color, 1.);
```

## Circle

### distance

> 利用 distance 计算不同两点的距离（像素坐标和画布中心的距离）。length（）函数内部只不过是用平方根(sqrt())计算斜边的方程。

> 就计算效率而言，sqrt()函数，以及所有依赖它的运算，都耗时耗力。

```glsl
vec2 st = gl_FragCoord.xy / u_resolution.xy;

float r = distance(st, vec2(0.5));
float c = 1.0 - step(0.5, r);

vec3 color = vec3(c, 0.5, 0.5);

gl_FragColor = vec4(color, 1.0);
```

### dot

> dot() 点乘是另外一种用来高效计算圆形距离场的方式。

> 本质：distance = sqrt((x-a)² + (y-b)²) => (x-a)² + (y-b)² <= r²，其中 dot(dist, dist) = (x-a)² + (y-b)²

```glsl
vec2 st = gl_FragCoord.xy / u_resolution.xy;

vec2 dist = st - 0.5;
float r = 1. - step(0.5 * 0.5, dot(dist, dist));

vec3 color = vec3(r, 0.1, 0.1);

gl_FragColor = vec4(color, 1.0);
```

### polar

```glsl
uniform vec2 u_resolution;
uniform float u_time;

vec2 cartesianToPolar(vec2 cartesian) {
  float radius = length(cartesian);
  float angle = atan(cartesian.y, cartesian.x);
  return vec2(radius, angle);
}


void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 center = vec2(0.5, 0.5);  // 圆心位置
  float radius = 0.4;  // 圆的半径

  // 将笛卡尔坐标转换为极坐标
  vec2 polar = cartesianToPolar(st - center);

  // 判断当前像素是否在圆内
  float insideCircle = step(polar.x, radius);

  // 设置圆的颜色
  vec3 color = vec3(1.0, 0.0, 0.0);  // 红色

  // 根据像素是否在圆内来确定最终颜色
  vec4 finalColor = vec4(color * insideCircle, 1.0);

  gl_FragColor = finalColor;
}
```

## triangle

```glsl
```