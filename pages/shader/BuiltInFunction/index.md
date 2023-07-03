# shader

## glsl 内置函数

> 官网文档地址：https://shaderific.com/glsl.html

### 1. 三角函数

> 这类主要是和角度相关的函数

函数        |   描述
-------    | ----------
sin(x)     | 正弦函数
cos(x)     | 余弦函数
tan(x)     | 正切函数
asin(x)    | 反正弦函数
acos(x)    | 反余弦函数
atan(x)    | 反正切函数
acot(x)    | 反余切函数
radians(x) | 角度转换为弧度
degrees(x) | 弧度转换为角度


### 2. 数学函数

> 这类主要是对指数对数幂函数的操作

函数          |    描述
-------       | -----------
pow(x,y)      |  x的y次方。如果x小于0，结果是未定义的。同样，如果x=0并且y<=0,结果也是未定义的。
exp(x)        |  e的x次方
log(x)        |  计算满足x等于e的y次方的y的值。如果x的值小于0，结果是未定义的。
exp2(x)       |  exp2(x)	计算2的x次方
log2(x)       |  计算满足x等于2的y次方的y的值。如果x的值小于0，结果是未定义的。
sqrt(x)       |  计算x的开方。如果x小于0，结果是未定义的。
inversesqrt(x)|  计算x的开方之一的值，如果x小于等于0，结果是未定义的。

### 3. 常用函数

> 常用函数，和js中的内置函数很像，必须掌握

函数                        |    描述
-------                     | -----------
abs(x)                      |   返回x的绝对值
sign(x)                     |   如果x>0，返回1.0；如果x=0，返回0，如果x<0，返回-1.0
floor(x)                    |   返回小于等于x的最大整数值
ceil(x)                     |   返回大于等于x的最小整数值
fract(x)                    |   返回x-floor(x)，即返回x的小数部分
mod(x, y)                   |   返回x和y的模
min(x, y)                   |   返回x和y的值较小的那个值
max(x, y)                   |   返回x和y的值较大的那个值
clamp(x, minVal, maxVal)    |   将x值钳于minVal和maxVal之间，意思就是当x`<`minVal时返回minVal，当x`>`maxVal时返回maxVal，当x在minVal和maxVal之间时，返回x
mix(x, y, a)                |   返回线性混合的x和y，如：x*(1−a)+y*a
step(edge, x)               |   step(edge, x)	如果x < edge，返回0.0，否则返回1.0
smoothstep(edge0, edge1, x) |   如果x <= edge0，返回0.0 ；如果x >= edge1 返回1.0；如果edge0 < x < edge1，则执行0~1之间的平滑埃尔米特差值。如果edge0 >= edge1，结果是未定义的。

### 4. 几何函数

> 这类主要是与长度、距离、向量等相关的函数

函数                    |    描述
-------                | -----------
length(x)	             |   返回向量x的长度
distance(p0,p1)	       |   计算向量p0，p1之间的距离
dot	                   |   向量x，y之间的点积
cross(x, y)	           |   向量x，y之间的叉积
normalize(x)	         |   标准化向量，返回一个方向和x相同但长度为1的向量
faceforward(N, I, Nref)|   如果Nref和I的点积小于0，返回N；否则，返回-N；
reflect(I, N)	         |   返回反射向量
refract(I, N, eta)	   |   返回折射向量

### 5. 矩阵函数

函数                    |    描述
-------                | -----------
matrixCompMult(A, B)   |  逐元素乘法

### 6. 向量函数

函数                    |    描述
-------                | -----------
lessThan(a, b)         |  $$\vec a$$ 与 $$\vec b$$ 逐元素小于
lessThanEqual(a, b)    |  $$\vec a$$ 与 $$\vec b$$ 逐元素小于等于
greaterThan(a, b)      |  $$\vec a$$ 与 $$\vec b$$ 逐元素大于
greaterThanEqual(a, b) |  $$\vec a$$ 与 $$\vec b$$ 逐元素大于等于
equal(a, b)            |  $$\vec a$$ 与 $$\vec b$$ 逐元素相等
notEqual(a, b)         |  $$\vec a$$ 与 $$\vec b$$ 逐元素不等于
any(a)                 |  $$\vec a$$ 任一元素为true，则为true
all(a)                 |  $$\vec a$$ 所有元素为true 则为true
not(a)                 |  $$\vec a$$ 逐元素取补


### 7. 纹理函数

函数                    |    描述
-------                | -----------
texture2D(texture, uv) |  在二维纹理(texture)中按照 uv 坐标获取纹素
