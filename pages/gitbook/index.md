### gitbook使用步骤
##### Step-1: 创建github仓库
##### Step-2: 克隆github仓库

```
git clone git@github.com:TOMGOU/3d-study-notes.git
```
##### Step-3: 进入项目并初始化

```
// npm初始化
npm init -y

// gitbook初始化
gitbook init
```
##### Step-4: 创建自动化发布shell脚本git.sh

```
cd _book
git init
git add .
git commit -m 'update'
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
cd ../
```
**用户名：USERNAME = TOMGOU**

**仓库名：REPO = work-summary**

##### Step-5: 修改package.json

```
"scripts": {
    "gh-pages": "./git.sh"
},
```
##### Step-6: 本地编辑

```
gitbook init (新增文件夹的时候，需要初始化)
gitbook serve
```
##### Step-7: github发布

```
npm run gh-pages
```
**页面地址：https://tomgou.github.io/work-summary/**

##### Step-8: gitbook plugin【添加文件：book.json，gitbook install】

```json
{
  "title" : "3d学习笔记",
  "author" : "tomgou",
  "description" : "3d学习笔记",
  "language" : "zh-hans",
  "plugins": [
    "mathjax-pro",
    "github",
    "hide-element",
    "chapter-fold",
    "splitter",
    "-lunr", 
    "-search", 
    "search-pro",
    "copy-code-button",
    "back-to-top-button",
    "tbfed-pagefooter",
    "popup"
  ],
  "pluginsConfig": {
    // "mathjax-pro":{
    //   "version": "2.7.5"
    // },
    "github": {
      "url": "https://tomgou.github.io/3d-study-notes/"
    },
    "hide-element": {
      "elements": [".gitbook-link"]
    },
    "tbfed-pagefooter": {
      "copyright":"Copyright &copy tomgou 2022",
      "modify_label": "该文章修订时间：",
      "modify_format": "YYYY-MM-DD HH:mm:ss"
    }
  }
}
```

> mathjax 官方不再支持
 
- <font color=#00ff00 size=12 face="黑体">mathjax: npm i mathjax@2.7.6（2.7.7版本有bug）</font>

- <font color=#00ff00 size=12 face="黑体">mathjax-pro: npm i gitbook-plugin-mathjax-pro</font>

- https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference

- https://blog.csdn.net/ajacker/article/details/80301378

**页面地址：https://tomgou.github.io/algorithm-study/**

### 这样使用gitbook的好处
- 不暴露源码（只要不push主分支
- 及时预览：gitbook serve
- 及时发布：npm run gh-pages