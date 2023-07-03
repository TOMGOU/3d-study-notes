# Math 数学相关

## 1.向量相关

### 基础知识

- 向量在图形学中的表示

> 向量可以用其次坐标来表示

A = $$\begin{bmatrix}
X\\
Y\\
\end{bmatrix}$$

> 向量的转置

$$ A^T $$ = $$\begin{bmatrix}
X&Y\\
\end{bmatrix}$$

> 向量长度的计算

$$||\vec A||$$ = $$\sqrt{X^2+Y^2}$$

- 向量相加（add）: 平行四边形法则或者三角形法则

### 向量的运算

#### a.向量点乘（dot）

$$\vec a$$ · $$\vec b$$ = $$||\vec a||||\vec b||cos\theta$$

> 向量点乘后得到的结果是一个数值

* for 2D

$$\vec a$$ · $$\vec b$$ = $$\begin{bmatrix}
x_a\\
y_a\\
\end{bmatrix}$$ · $$\begin{bmatrix}
x_b\\
y_b\\
\end{bmatrix}$$ = $$x_ax_b$$ + $$y_ay_b$$

* for 3D

$$\vec a$$ · $$\vec b$$ = $$\begin{bmatrix}
x_a\\
y_a\\
z_a\\
\end{bmatrix}$$ · $$\begin{bmatrix}
x_b\\
y_b\\
z_b\\
\end{bmatrix}$$ = $$x_ax_b$$ + $$y_ay_by$$ + $$z_az_b$$

> 几何意义: 

* 表征或计算两个向量之间的夹角：如果向量 a 和 b 是单位向量，$$cos\theta$$ = $$\vec a$$ · $$\vec b$$

* b 向量在 a 向量方向上的投影

> 向量点乘在图形学中的实际应用

* 计算两个向量的夹角：比如计算光照方向和物体表面之间的夹角

* 投影阴隐的计算

* 把一个向量分解为两个垂直方向上的向量

* 向量点乘的正负可以表示两个向量的方向是否接近：比如金属的高光反射，不接近就看不到反射的光。

> 向量点乘满足交化率结合律和分配率


#### b.向量叉乘（cross）

$$\vec a$$ x $$\vec b$$ = $$||\vec a||||\vec b||sin\theta$$

> 向量点乘后得到的结果是一个向量

* 数字大小

$$\vec a$$ x $$\vec b$$ = $$\begin{bmatrix}
y_az_b - y_bz_a\\
z_ax_b - x_az_b\\
x_ay_b - y_ax_b\\
\end{bmatrix}$$ = $$\begin{bmatrix}
0&-z_a&y_a\\
z_a&0&-x_a\\
-y_a&x_a&0\\
\end{bmatrix}$$$$\begin{bmatrix}
x_b\\
y_b\\
z_b\\
\end{bmatrix}$$

  - 行列式推导过程：https://blog.csdn.net/qq_36286039/article/details/124141634

* 方向：右手螺旋定则

$$\vec X$$ x $$\vec Y$$ = +$$\vec Z$$

$$\vec Y$$ x $$\vec X$$ = -$$\vec Z$$

> 几何意义

* 方向的意义：可以通过两个向量的叉乘，生成第三个垂直于a，b的法向量，从而构建X、Y、Z坐标系

* 数值的意义：在二维空间中，叉乘还有另外一个几何意义就是：aXb等于由向量a和向量b构成的平行四边形的面积。

> 向量点乘在图形学中的实际应用

* 判定左和右：比如判断向量 a 在向量 b 的左侧还是右侧

* 判定里和外：比如判断一个点是否在一个三角形的内部

* 面积计算：比如计算复杂几何体的表面积

> 向量点乘不满足交化率，但是满足结合律和分配率


## 2.矩阵相关

> 矩阵乘法口诀：左取行，右取列，相乘再相加，行列定位置。

> 向量点乘不满足交化率，但是满足结合律和分配率

### a.矩阵乘法合法性

A = $$\begin{bmatrix}
2&4\\
6&8\\
-2&-3\\
\end{bmatrix}$$

B = $$\begin{bmatrix}
2&4&6&1\\
6&4&1&3\\
\end{bmatrix}$$

我们能不能把它们相乘得到 AB 必须满足一个条件：A 矩阵的列数必须等于 B 矩阵的行数。

### b.矩阵的转置

- 行列转置

$$\begin{bmatrix}
2&4&1\\
6&5&3\\
\end{bmatrix}^T$$ = $$\begin{bmatrix}
2&6\\
4&5\\
1&3\\
\end{bmatrix}$$

- 特性

$$(AB)^T = B^TA^T$$

### c.矩阵在图形学中的实际应用

- 矩阵乘以向量：向量必须是一个列向量，实际就是我们的变换。

- 矩阵乘法结合律：比如视图矩阵乘以投影矩阵。

### d.矩阵变换

- 平移

$$\begin{bmatrix}
1&0&0&t_x\\
0&1&0&t_y\\
0&0&1&t_z\\
0&0&0&1\\
\end{bmatrix}$$
*
$$\begin{bmatrix}
x\\
y\\
z\\
1\\
\end{bmatrix}$$
=
$$\begin{bmatrix}
x+t_x\\
y+t_y\\
z+t_z\\
1\\
\end{bmatrix}$$

- 缩放

$$\begin{bmatrix}
s_x&0&0&0\\
0&s_y&0&0\\
0&0&s_z&0\\
0&0&0&1\\
\end{bmatrix}$$
*
$$\begin{bmatrix}
x\\
y\\
z\\
1\\
\end{bmatrix}$$
=
$$\begin{bmatrix}
s_x·x\\
s_y·y\\
s_z·z\\
1\\
\end{bmatrix}$$

- 旋转

> <font color=#ff00ff size=12 face="黑体">绕x轴旋转α度对应的旋转矩阵Rx</font>

$$\begin{bmatrix}
1&0&0&0\\
0&cosα&-sinα&0\\
0&sinα&cosα&0\\
0&0&0&1\\
\end{bmatrix}$$
*
$$\begin{bmatrix}
x\\
y\\
z\\
1\\
\end{bmatrix}$$
=
$$\begin{bmatrix}
x\\
cosα*y-sinα*z\\
sinα*y+cosα*z\\
1\\
\end{bmatrix}$$

> <font color=#ff00ff size=12 face="黑体">绕y轴旋转α度对应的旋转矩阵Ry</font>

$$\begin{bmatrix}
cosα&0&-sinα&0\\
0&1&0&0\\
sinα&0&cosα&0\\
0&0&0&1\\
\end{bmatrix}$$
*
$$\begin{bmatrix}
x\\
y\\
z\\
1\\
\end{bmatrix}$$
=
$$\begin{bmatrix}
cosα*x+sinα*z\\
y\\
-sinα*x+cosα*z\\
1\\
\end{bmatrix}$$

> <font color=#ff00ff size=12 face="黑体">绕z轴旋转α度对应的旋转矩阵Rz</font>

$$\begin{bmatrix}
cosα&-sinα&0&0\\
sinα&cosα&0&0\\
0&0&1&0\\
0&0&0&1\\
\end{bmatrix}$$
*
$$\begin{bmatrix}
x\\
y\\
z\\
1\\
\end{bmatrix}$$
=
$$\begin{bmatrix}
cosα*x-sinα*y\\
sinα*x+cosα*y\\
z\\
1\\
\end{bmatrix}$$

## 3.欧拉对象 Euler、四元数 Quaternion 和旋转矩阵

> 欧拉对象、四元数和旋转矩阵都是用来表达对象的旋转信息。欧拉对象和四元数存在的意义：为了给旋转变换做插值。

> https://threejs.org/docs/#api/zh/math/Euler

> https://threejs.org/docs/#api/zh/math/Quaternion

```js
// Euler( x : Float, y : Float, z : Float, order : String )
// x - (optional) 用弧度表示x轴旋转量。 默认值是 0。
// y - (optional) 用弧度表示y轴旋转量。 默认值是 0。
// z - (optional) 用弧度表示z轴旋转量。 默认值是 0。
// order - (optional) 表示旋转顺序的字符串，默认为'XYZ'（必须是大写）。

const Euler = new THREE.Euler( Math.PI/4, 0, Math.PI/2, 'XYZ');
Euler.x = Math.PI/4;
Euler.y = Math.PI/2;
Euler.z = Math.PI/4;
Euler.order = 'YZX'

// 绕单位向量Vector3(x, y, z) 表示的轴旋转 θ 度
// k = sinθ/2
// q = ( xk , yk , z*k, cosθ/2)

// 【下面的例子是：将点(0, 0, 1)绕 Y 轴旋转 90 度，得到新的坐标(1, 0, 0)】

const quaternion = new THREE.Quaternion();
// 旋转轴 new THREE.Vector3(0, 1, 0)
// 旋转角度 Math.PI / 2
const angle = Math.PI / 2
quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle)
console.log('查看四元数结构', quaternion);
const k = Math.sin(angle / 2)
console.log('查看数组', [0 * k , 1 * k , 0 * k, Math.cos(angle / 2)]);
const vector = new THREE.Vector3( 0, 0, 1 );
const newVector = vector.clone().applyQuaternion( quaternion );
console.log('旋转后的新坐标', newVector)

```
