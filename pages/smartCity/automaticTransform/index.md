# 自动轮播动画

## 迭代器循环任务

```js
const task = [
  {
    type: 'target',
    x: -500,
    y: 0,
    z: 500,
    time: 1000
  },
  {
    type: 'scale',
    x: -500,
    y: 0,
    z: 500,
    time: 2000
  },
  {
    type: 'target',
    x: -500,
    y: 0,
    z: 500,
    time: 3000
  },
  {
    type: 'scale',
    x: -500,
    y: 0,
    z: 500,
    time: 4000
  }
]

function* generatorEach(arr) {
  for (let [index, value] of arr.entries()) {
    yield setTimeout(() => {
      console.log([index, value]);
      const { done } = each.next();
      if (done) {
        each = generatorEach(task);
        each.next();
      }
    }, value.time)
  }
}

let each = generatorEach(task);
each.next();
```

## 实际案例

```ts
import gsap from 'gsap'
import { camera } from './three'
import { controls } from './controls'
import { task } from '../config/task'
import { selectedValue } from './webWorker/index'

const task = [
  {
    type: 'gsap',
    target: controls.target,
    obj: {
      x: -600,
      y: 0,
      z: 500
    },
    duration: 4
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 20
    },
    duration: 3
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 1
    },
    duration: 4
  },
  {
    type: 'gsap',
    target: controls.target,
    obj: {
      x: 50,
      y: 0,
      z: 0
    },
    duration: 4
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 20
    },
    duration: 10
  },
  {
    type: 'rotate',
    duration: 30
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 1
    },
    duration: 10
  },
  {
    type: 'gsap',
    target: controls.target,
    obj: {
      x: 600,
      y: 0,
      z: 500
    },
    duration: 4
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 20
    },
    duration: 10
  },
  {
    type: 'rotate',
    duration: 30
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 1
    },
    duration: 10
  },
  {
    type: 'gsap',
    target: controls.target,
    obj: {
      x: 600,
      y: 0,
      z: -500
    },
    duration: 4
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 20
    },
    duration: 10
  },
  {
    type: 'rotate',
    duration: 30
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 1
    },
    duration: 10
  },
  {
    type: 'gsap',
    target: controls.target,
    obj: {
      x: -600,
      y: 0,
      z: -500
    },
    duration: 4
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 20
    },
    duration: 10
  },
  {
    type: 'rotate',
    duration: 30
  },
  {
    type: 'gsap',
    target: camera,
    obj: {
      zoom: 1
    },
    duration: 10
  }
]

const gsapPromise = (property: any, obj: any, duration: number) => {
  return new Promise((resolve, reject) => {
    gsap.to(property, {
      ...obj,
      duration,
      repeat: 0,
      yoyo: true,
      onComplete: () => {
        resolve(1)
      }
    })
  })
}

const rotatePromise = (duration: number) => {
  return new Promise((resolve, reject) => {
    controls.autoRotate = true
    const timer = setTimeout(() => {
      controls.autoRotate = false
      clearTimeout(timer)
      resolve(1)
    }, duration * 1000)
  })
}

const switchFloorPromise = (target: string) => {
  return new Promise((resolve, reject) => {
    selectedValue.value = target
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(1)
    }, 2000)
  })
}

let taskGenerator: any = null

function* generatorEach(arr: any[]) {
  for (const [index, value] of arr.entries()) {
    yield (async () => {
      const { type, target, obj, duration } = value
      if (type === 'switch') {
        await switchFloorPromise(target)
      } else if (type === 'gsap') {
        await gsapPromise(target, obj, duration)
      } else if (type === 'rotate') {
        await rotatePromise(duration)
      }
      const { done } = taskGenerator.next()
      if (done) {
        taskGenerator = generatorEach(task)
        taskGenerator.next()
      }
    })()
  }
}

const animation = async () => {
  gsap.globalTimeline.play()
  controls.autoRotate = false
  taskGenerator = generatorEach(task)
  taskGenerator.next()
}

const rest = () => {
  controls.autoRotate = false
  gsap.globalTimeline.pause()
}

export { animation, rest }
```
