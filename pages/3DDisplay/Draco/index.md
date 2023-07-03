# Draco 压缩

> 由于 3D 模型文件一般比较大，所以需要通过 Draco 压缩，以减少网络传输的大小。

## 方案一：gltf-pipeline

- npm 地址：https://www.npmjs.com/package/gltf-pipeline

```js
// 压缩 gltf 文件
npm i -g gltf-pipeline
gltf-pipeline -i car.gltf -o copy.gltf -d

// 解压 gltf 文件
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
// 此处需要 'three/js/libs/draco/gltf/' 下的两个文件：draco_decoder.wasm + draco_wasm_wrapper.js
dracoLoader.setDecoderPath('./draco/');
loader.setDRACOLoader(dracoLoader);
loader.load('./gltf/copy.gltf', () => {...});

```

## 方案二：google/draco

- github 地址：https://github.com/google/draco

~~~~~js
// 克隆仓库
git clone git@github.com:google/draco.git

// 创建新文件夹 build
mkdir build && cd build

// 执行编译
cmake ../

// 执行 make
make

// 压缩文件
./draco_encoder -i car.gltf -o copy.gltf

~~~~~

## Draco 的作用

- Draco 在当前的VR、AR生态下，基本上没有直接使用的价值，想用它必须理解原理并修改源码。

- Draco 里面有比较好的mesh压缩方案，有利于游戏引擎公司基于该代码优化自己的模型设计。

- Draco 所能压缩的只是3D模型文件中的一部分，而3D相关的资源大头（图片）还是一个老大难的问题。
