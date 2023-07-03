# 中文字体

> three.js 加载中文字体比较麻烦，需要选对字体库

## Facetype

> converts a font to a typeface.json font: http://gero3.github.io/facetype.js/

> 找字体：https://www.zfont.cn/

## 用法

```js
  const loaderFont = new THREE.FontLoader()
  const font = loaderFont.load(
    // resource URL
    '/self/fonts/pingfang_semibold.typeface.json',
    // onLoad callback
    (font) => {
      const fontMaterial = new THREE.MeshPhongMaterial({
        color: '#33ff33',
        specular: '0xffffff',
        shininess: 30,
        emissive: 0xff0000
      })
      // const fontMaterial = new THREE.MeshPhysicalMaterial({
      //   color: '#33ff33',
      //   metalness: 1.0,
      //   roughness: 0.5,
      //   envMapIntensity: 1.0,
      //   emissive: 0x33ff33
      // })
      const text = new THREE.TextBufferGeometry('儿童输液放射科', {
        font: font,
        size: 14,
        height: 2,
        curveSegments: 12,
        bevelThickness: 10,
        bevelSize: 8,
        bevelEnabled: false
      })
      text.center()
      text.scale(5, 5, 5)
      // text.rotateX(-Math.PI / 5)
      // text.rotateY(Math.PI / 4)
      let textFont = new THREE.Mesh(text, fontMaterial)
      scene.add(textFont)
    }
  )
```
