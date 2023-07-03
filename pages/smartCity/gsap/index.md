# gsap

> https://greensock.com/docs/v3/GSAP

> https://www.bilibili.com/read/cv16848512/

```js
import gsap from 'gsap'

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

export default gsapPromise
```