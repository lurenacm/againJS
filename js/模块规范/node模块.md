# commonJS
## 概念
> node 本身是基于 commonJS 开发的，CommonJS 的是模块化设计思想同 AMD,CMD，es6 module 都是模块化设计思想。最常用的是现在的 CommonJS 和 es6 Module。

* 重要特点1：CommonJS 导入的变量是一个值的拷贝，拷贝的会被缓存，不会影响原模块值的变化。ES6 中的导入是对一个值的引用，不会缓存值。
* 重要特点2：CommonJS 是运行时加载的，ES6 模块是编译的时候就加载了
* 重要特点3：CommonJS 的 `require()`导入是同步的，ES6 模块是 `import` 异步导入的。所以在服务端一般可以使用 CommonJS 模块，资源放在内存中，服务端的加载速度比较快。浏览器端可以使用`ES6 module` 使用异步的加载方式。
``` js
// a.js
let c = 12;
function fn(c) {
    console.log(c)
}
```

``` js
// b.js
let c = 30;
function fn() {
    console.log(c)
}
```
* commonJS规定每一个 js 文件就是一个模块，每一个模块的变量方法属性等都是私有的。比如有 `a.js/ b.js` 文件下面称为 `A模块，B 模块`，两个文件内都有一各相同名的变量 `c`，那么 `c` 在这两个模块中都是相互独立的，互不干扰的。
* `A模块，B 模块` 之间的相互调用需要使用到 `module` 模块
  - 导出 `module.exports`，`exports`，两者指向的都是同一个对象，`exports` 是一个commonJS提供的一个内置对象，既然是对象那么对象的操控方式同样使用上面的两个对象。
  - 导出 `require`，`require` 也是 CommonJS 提供的一个内置的函数。且 `require` 有自己的导入查找规则，导入的文件后缀 `.js` 可以省略。
__导出示例__
``` js
// a.js 导出
let c = 12;
function fn(c) {
    console.log(c)
}
// 将 fn 导出且导出的名字变成 fo
exports.fo = fn

// 或者使用
module.exports.fo = fn

// 或
// module.exports = {
//     fo : fn 
// }
```
__导入示例__
``` js
// b.js
let obj = require('./a')
let c = 30;
function fn() {
    console.log(c)
}
```
> 此时的 `fo` 是一个对象，因为 `exports` 导出的就是一个对象


### 细说 `module.exports/exports` 
* 一个文件内可以有多个导出，但是导出操作只会执行一次，而且是同步的，不会等模块内的异步队列是否执行完成。
* 原模块导出的变量和方法属性不会和导入模块的变量属性发生冲突
* 导出的 `module.exports/exports` 指向的堆内存是同一个，但是以 `module.exports` 导出的堆内存为准，如 `module.exports` 堆内存地址改变的话，`exports` 接无法导出内容。也就是说`exports`的导出方式只有一种那就是 `exports.`

#### 1. 举一个小栗子
``` js
// b.js
let obj = require('./a')
let c = 30;
function fn() {
    console.log(c)
}
console.log(obj.fo())   // 12
```
> 上面栗子中输出的 `c` 是原模块 A (`a.js`) 中的变量 `c，12`，不是30，因为导出的函数是模块 A 中函数，函数中的变量也来源于模块 A 中的。

#### 思考 exports 可以导出结果吗？
``` js
function fn() {
    console.log('林一一')
}

function fo() {
    console.log('二二')
}

function f2() {
    console.log('三三')
}

exports = {fn: fn} // 这里能否导出 fn ?
module.exports = {
    fn: fn
}

module.exports.fo = fo

exports.f2 = f2 // 这里能导出结果吗？
```
> 虽然 `exports` 也可以导出内容且和 `module.exports` 指向导出的堆内存是同一个，但是 `require` 导入的是 `module.exports` 堆内存中的属性，上面的 `exports={fn: fn}` 已经指向了一个新的堆内存，和 `module.exports` 指向的堆内存地址不一致，所以无法导出结果。如果或略 `exports = {fn: fn}` 后面的 `exports.f2 = f2 ` 也还是无法导出结果，是因为上一步的 `module.exports = {fn: fn}` 重新指向了一个新的堆内存地址，所以后面的`exports`还是无法导出结果。


### 细说 `require` 导入
* `require` 导入模块时，模块中的代码会自上而下的执行，模块中 `module.exports` 导出才执行。
* `require` 导入的堆内存地址是导出 拷贝 `module.exports` 对应的堆内存地址。
* `require` 导入是一个同步操作。
* `require` 导入有自己的规则，导入自定义的模块需要加入路径，例如 `require('./xx')`；如果导入的模块没有路径，例如 `require('xxx')`，`require` 首先会从当前文件的 `node_module` 中查找如果没有就找 `node` 中提供的内置模块，还是没有就直接报错。

## CommonJS 模块的特点
1. 所有模块都会运行在模块的原作用域的，不会影响到全局的作用域。因为每一个模块都是私有的。
2. 所有模块都可以多次引用，但是只在第一次引用的时候运行，而运行后的结果就被缓存下来的，下一次引用时，不会再运行模块而是直接从缓存中获取结果，如果还想模块再次运行，就需要将缓存的结果清除掉。
3. 模块加载的顺序，按照其出现在代码的顺序。
4. CommonJS 规范加载模块是同步的，也就是说，只有模块加载完成，才可以执行下面的代码。
5. CommonJS 的导入的动态的，ES6 module 的导入是静态的。


## commonJS 中的两个路径
* `__dirname`：获取到的是当前模块的绝对路径，例如`C:\Users\dell\Desktop\JAVA\helloJAVA`
* `__filename`：相当于`__dirname` + 当前模块的名称，例如`C:\Users\dell\Desktop\JAVA\helloJAVA\hello.java`



# es module
> es 提供的模块化导入导出依赖 `import from` 和 `export/module.export`


## export 导出
> export 是一个对象
* export 可以导出多个变量，也可以使用 `export default param` 导出一个变量，`export default` 在一个文件内只能使用一次。使用 `export default` 导出的变量，导入可以直接获取不需要解构赋值。
* 
``` js
// a.js
export let a = 1
export let b = 2
// 等价于
// export {a, b}


// b.js
export default c = 1

// c.js
import cData from 'b.js
import {a, b} from 'a.js
```


## import from
> import from 引入文件
* **ES module 重要特点：import 导入的变量是只读的，导入的变量不能重新赋值，可以给对象添加属性，但是不能重盖原有的地址值**。 
* import 导入可以使用解构赋值，也可以将所有的属性都导入到一个对象中，例如` import * as obj from 'a.js'`
* import 具备声明功能，也就是说定义的解构赋值的不可以再用 `let/const` 重新声明。
* import 具备预解析，声明的变量可以提升到文件的顶部
* import命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载
``` js
console.log(str)  // 能直接打印出 str 的值。
import {str, str1} from 'a.js'
let str1 = 1     // error。
```



## 参考
[前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.cn/post/6844903576309858318)

[ES6 模块与 CommonJS 模块的差异](https://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)