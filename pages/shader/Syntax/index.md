# shader

## glsl 语法

### 三种限定符（uniform，attribute 和 varying）

- `uniform`(一致变量)：外部程序传递给（vertex 和 fragment）shader 的变量，不能被 shader 程序修改。

- `attribute`(属性变量)：只能在vertex shader中使用的变量，一般用attribute变量来表示一些顶点的数据，如：顶点坐标，法线，纹理坐标，顶点颜色等。

- `varying`(易变变量)：vertex和fragment shader之间做数据传递用的。一般vertex shader修改varying变量的值，然后fragment shader使用该varying变量的值。因此varying变量在vertex和fragment shader二者之间的声明必须是一致的。

### 预处理命令

- `#define`：宏定义，在编译处理阶段起作用。

- `#ifdef`：判断一个宏定义是否存在，如果存在，在编译预处理的时候，保留 #ifdef 和 #endif 两个关键字之间的代码。

- `#if`：判断条件是否成立，如果成立，在编译预处理后会保留通过 #if 和 #endif 两个关键字之间的代码，否在不保留。

- `#include`：引入另一个着色器文件，在编译预处理后替换。


### 变量类型

- 标量
  * float: 浮点数
  * int: 整数
  * unit: 无符号整数
  * bool: 布尔值

- 矢量
  * vec3: 包含3个浮点数的矢量
  * ivec3: 包含3个整数的矢量
  * uvec3: 包含3个无符号整数的矢量
  * bvec3: 包含3个布尔值的矢量

- 矩阵
  * mat2: 2*2 的浮点数矩阵
  * mat3: 3*3 的浮点数矩阵
  * mat4: 4*4 的浮点数矩阵

- 取样器

  > 纹理查找需要指定一个纹理或者纹理单元，GLSL不关心纹理单元的底层实现，因此它提供了
  一个简单而不透明的句柄来封装需要查找的对象。这些句柄被称为"取样器(SAMPLERS)"。

  * sampler3D：访问三维纹理
  * samplerCube：访问立方贴图纹理
  * sampler2DRect：访问二维矩形纹理
  * sampler2DRectShadow：访问带对比的二维矩形深度纹理
  * sampler2DArrayShadow：访问二维深度纹理数组
  * samplerBuffer：访问纹理缓存
  * isampler3D：访问整型三维纹理
  * usampler3D：访问无符号整型三维纹理


- 结构

  > GLSL提供了类似于C 的用户定义结构。

  ```glsl
  struct light {
    vec3 position;
    vec3 color;
  }

  ```

- 数组

  > GLSL可以创建任何类型的数组。

  * 创建的是一个包含 10 个 vec4 类型的数组：vec4 points[10]; 

  * 创建的是一个位置大小的 int 类型的数组：int num[]; 