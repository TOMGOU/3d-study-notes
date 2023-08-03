# 变换

> 图形学中的变换主要包含：视图变换（View Transformation）和投影变换（Projection Transformation）

  * 视图变换是指从世界坐标系到相机坐标系的变换过程。视图变换是为了模拟相机在三维空间中的位置和方向，并决定了观察者在场景中看到的视图。通过视图变换，可以实现相机的移动、旋转和缩放等操作，以改变观察者的视角和观察到的场景。

  * 投影变换是指将相机坐标系中的三维点投影到二维屏幕空间的过程。投影变换可以使用正交投影或透视投影来实现。

  * 区别：视图变换主要关注相机位置和方向的变换，以及观察者的视角；而投影变换主要关注将三维点从相机坐标系投影到二维屏幕坐标系的过程，考虑透视效果和投影方式的影响。

## 齐次坐标（Homogeneous Coordinates）

> 齐次坐标没那么复杂，通过引入额外的维度（w-coordinate），让平移也能像旋转和缩放一样写成 `3 x 3` 的矩阵。

  * 笛卡尔坐标系中，平移不是线性变换，不能写入矩阵中：

  $$\begin{bmatrix}
  x_a\\
  y_a\\
  \end{bmatrix}$$ = $$\begin{bmatrix}
  a & b\\
  c & d\\
  \end{bmatrix}$$ · $$\begin{bmatrix}
  x\\
  y\\
  \end{bmatrix}$$ + $$\begin{bmatrix}
  t_x\\
  t_y\\
  \end{bmatrix}$$

  * 使用其次坐标：

  $$\begin{bmatrix}
  x_a\\
  y_a\\
  1\\
  \end{bmatrix}$$ = $$\begin{bmatrix}
  a & b & t_x\\
  c & d & t_y\\
  0 & 0 & 1\\
  \end{bmatrix}$$ · $$\begin{bmatrix}
  x\\
  y\\
  1\\
  \end{bmatrix}$$

> w 为1时，表示点；w 为0时，表示向量:

  * 2D point = $$\begin{bmatrix}
  x\\
  y\\
  1\\
  \end{bmatrix}$$

  * 2D vector = $$\begin{bmatrix}
  x\\
  y\\
  0\\
  \end{bmatrix}$$

> 在齐次坐标中，对 w 坐标的理解：

  * vector + vector = vector
  * point – point = vector
  * point + vector = point
  * point + point = ?? （取中点）

## 2D 变换矩阵（2D Transformation Matrices）

> 2D 变换矩阵中，平移和旋转都很简单，不好推导的是旋转矩阵

R(α) = $$\begin{bmatrix}
cosα & -sinα & 0\\
sinα & cosα & 0\\
0 & 0 & 1\\
\end{bmatrix}$$

> 组合变换（S1：缩放；T2：平移；R3：旋转），类似 `js` 中的 `compose` 函数。

R3(T2(S1(X))) = R3 · T2 · S1 · $$\begin{bmatrix}
x\\
y\\
1\\
\end{bmatrix}$$

## 视图变换（View Transformation）

> 视图变换只涉及到平移和旋转：

  1. 将相机的位置旋转到坐标原点；

  2. 将相机向上的方向旋转到 Y 方向；

  3. 将相机看向的方向旋转到 -Z 方向；

> 如果相机的位置默认就在坐标原点，向上方向为 Y 方向，并且看向的方向是 -Z 方向，那么视图矩阵就是一个单位矩阵。

## 投影变换（Projection Transformation）

> 投影变换是指将相机坐标系中的三维点投影到二维屏幕空间的过程

![z-buffer code](../../../imgs/projection.png)

### 正交投影（Orthographic Projection）

> 正交投影只涉及到平移和缩放：

  1. 将中心平移到坐标原点；

  2. 缩放到标准立方体(canonical cube)：[-1, 1]^3

### 透视投影（Perspective Projection）

> 在正交投影的基础上，再乘以一个新的矩阵，从而实现近大远小的效果，这个矩阵推导有点复杂。

## `THREE.JS` 中的视图矩阵和投影矩阵

> 在 `THREE.JS` 中，视图矩阵和投影矩阵都被封装到 `camera` 中。

```js
const viewMatrix = camera.matrixWorldInverse;
const projectionMatrix = camera.projectionMatrix;

console.log('View Matrix:', viewMatrix);
console.log('Projection Matrix:', projectionMatrix);
```
