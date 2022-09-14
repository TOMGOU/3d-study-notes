# Audio

> 对于音频播放，可以借助于 html5 来实现，但是要创建 audio 标签，比较麻烦。可以直接使用 three 提供的 audio 模块。

## API

- new THREE.AudioListener() -> 创建一个音频监听器。

- new THREE.AudioLoader() -> 创建一个音频加载器，用于加载音频文件。

- new THREE.Audio(listener) -> 创建一个音频对象，并且将其绑定到监听器，设置音量。

## 例子

```js
import * as THREE from 'three';

const listener = new THREE.AudioListener();
const openAudio = new THREE.Audio(listener);
const closeAudio = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('./audio/open.wav', (buffer) => {
  openAudio.setBuffer(buffer);
  openAudio.setVolume(1);
});

audioLoader.load('./audio/close2.wav', (buffer) => {
  closeAudio.setBuffer(buffer);
  closeAudio.setVolume(1);
});

const displayOpenAudio = () => {
  openAudio.play();
};
const displayCloseAudio = () => {
  closeAudio.play();
};

export {
  openAudio,
  closeAudio,
  displayOpenAudio,
  displayCloseAudio,
};

```