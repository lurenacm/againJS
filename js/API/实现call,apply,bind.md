---
theme: juejin
---
# 思维导图
> __大家好，我是林一一。下面的这一篇是关于 JS 中 call，apply，bind 原理和模拟实现和场景的面试题文章，一起开始阅读吧。🧐__

![callandapplyandbind.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/881761ff3fad4a96adf36caf2c7931ea~tplv-k3u1fbpfcp-watermark.image)

# call，apply，bind 都可以改变 this 的指向
>__关于this 指向问题可以看看这篇 [面试 | 你不得不懂的 JS this 指向](https://juejin.cn/post/6942697803709677582)__
##  一、call 格式 [function].call([this], [param]...)，一句话概括：`call()` 将函数的 `this` 指定到 `call()` 的第一个参数值和剩余参数指定的情况下调用某个函数或方法。

>原理：`[function]`.call([this])，执行 `call()` 会将函数 `[function]` 中的 `this` 绑定到第一个参数。而函数 `call()` 中的 `this` 是来源于 `[function]` 的，`[function]` 是在 `call()` 函数内部执行的，是 `call()` 通过操控 `this` 来执行函数 `[function]`，同时给 `[function]` 传递剩余的参数。

## 思考
### 1. 热身题1
``` js
function fn(a, b) {
    console.log(this, a, b)
}

var obj = {
    name: '林一一'
}

fn.call(obj, 20, 23)   // {name: "林一一"} 20 23

fn.call(20, 23) // Number {20} 23 undefined

fn.call()   //Window {0: global, window: …} undefined undefined     | 严格模式下为 undefined

fn.call(null)   //Window {0: global, window: …} undefined undefined       | 严格模式下为 null

fn.call(undefined)  //Window {0: global, window: …} undefined undefined     | 严格模式下为 undefined
```
> `fn`调用了`call`，`fn` 的 `this` 指向 `obj`，最后 `fn` 被执行；`this` 指向的值都是引用类型，在非严格模式下，不传参数或传递 `null/undefined`，`this` 都指向 `window`。传递的是原始值，原始值会被包装。严格模式下，`call` 的一个参数是谁就指向谁

### 2. 热身题 2
``` js
var obj1 = {
    a: 10,
    fn: function(x) {
        console.log(this.a + x)
    }
}

var obj2 = {
    a : 20,
    fn: function(x) {
        console.log(this.a - x)
    }
}

obj1.fn.call(obj2, 20) //40
```
> 稍微变量一下，原理不变`obj1.fn` 中 `fn`的 `this` 指向到 `obj2`，最后还是执行 `obj1.fn` 中的函数。


## 二、apply 和 call 基本一致
__`两者唯一不同的是：apply 的除了一个this指向的参数外，第二个参数是数组[arg1, arg2...]，call的第二参数是列表(arg1, arg2...)`__
``` js
var name = '二二'
var obj = {
    name: '林一一',
    fn: function() {
        return `${this.name + [...arguments]}`
    }
}
obj.fn.apply(window, [12, 23, 34, 56])    // "二二12,23,34,56"
```
> apply 第二个参数接收的是数组

## 面试题
### 1. 模拟实现内置的 call()，apply()方法。
* call 的模拟实现
> 模拟实现 `call` 需要明白 `call` 的原理，1. `this` 的指向改变，`call` 函数中执行调用的函数。
>__下面代码参考来自 [`讶羽`](https://github.com/mqyqingfeng/Blog/issues/11)大佬的__
``` js
Function.prototype.myCall = function (context, ...args){
    context = context || window
    // 这里的 this 是指向 fn 的，通过 this 就可以获取 fn，context 是我们的 obj，可以直接给 obj 添加一个函数属性
    context.fn = this
    delete context.fn(...args)
    return
}

var name = '二二'
var obj = {
    name: '林一一',
}

function fn() {
    console.log(this.name, ...arguments)
}

fn.myCall(null)
fn.myCall(obj, 12, 23, 45, 567)
```
> 上面的模拟 `call` 其实并没有考虑基本类型的情况，原生的 call 函数也可以处理基本类型比如上面的热身1 `fn.call(20, 23)` 输出并不会报错。但是这里的 `myCall` 会直接报错，提供一个更加全面模拟 `call` 有兴趣的可以看看 [彻底搞懂闭包，柯里化，手写代码，金九银十不再丢分！](https://juejin.cn/post/6864378349512065038#heading-16)

* apply 的模拟实现
``` js
Function.prototype.myApply = function (context, args){
    context = context || window
    context.fn = this
    delete context.fn(args)
    return
}
```
> 类似上面的模拟 `call` 写法

### 2. call 和 apply 区别
> `call` 方法的语法和作用与 `apply` 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。
``` js
var name = '二二'
var obj = {
    name: '林一一'
}

function fn(){
    console.log(this.name, ...arguments)
}

fn.apply(obj, [12, 34, 45, 56]) //fn(12, 23, 45, 56) 林一一   12 34 45 56
```
> 要注意的是，剩余的数组参数会以单个参数的形式传递给函数，`fn.apply(obj, [12, 34, 45, 56])  ==> fn(12, 23, 45, 56)`。

## 三、bind
>引用MDN的话： `bind()` 方法会创建一个新函数。当这个新函数被调用时，`bind()` 的第一个参数将作为它运行时的 `this`，之后的一序列参数将会在传递的实参前传入作为它的参数。
* 返回一个新函数，这个新函数执行时的 `this` 才指定到 `bind` 的第一个参数
* `bind` 的剩余参数，传递给新的函数
* 返回后的新函数是自我调用的
### 小思考
###  1. 上面说的这个新函数是啥？
> 其实这个新函数就是调用 `bind` 的函数，`bind` 调用后会将调用 `bind` 的函数拷贝一份返回。

__一个小栗子__
``` js
var name = '二二'
var obj = {
    name: '林一一'
}

function fn(){
    return `${this.name} ` + [...arguments]
}

let f = fn.bind(obj, 12, 23, 45, 67, 90)
f() // "林一一 12,23,45,67,90"
```
> 上面的新函数就是 `f()`，`f()` 就是 `bind` 拷贝函数 `fn`后返回的。

### 2. bind 是怎么实现拷贝 fn 的？
> 简单地说：通过 `this` 的获取，再 `return` 回这个`this`获取的函数，参考 `call`。

## 面试题
### 1. bind() 和 call()、apply() 的区别
> 通过 `apply` 和 `call` 改变函数的 `this` 指向，他们两个函数的第一个参数都是一样的表示要
> 改变指向的那个对象，第二个参数，`apply` 是数组，而 `call` 则是 `arg1,arg2...` 这种形式。通
> 过 `bind` 改变 `this` 作用域会返回一个新的函数，这个函数不会马上执行

### 2. 模拟实现内置的 bind() 方法。
__下面的代码来自 [`JavaScript深入之bind的模拟实现`](https://github.com/mqyqingfeng/Blog/issues/12)__
``` js
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```
> 模拟实现 api，最重要的是思维过程，这是copy不了的。

## 思考题
### 1. 求数组中的最大值和最小值
 - >__使用 Math 的 max/min 求最大最小值__
    ``` js
    let arr = [12, 45, 65, 3, 23, 11, 76, 8, 9, 56, 70]
    let max = Math.max(...arr)  // 76
    let min = Math.min(...arr)  // 3
    ```

 - >__使用数组 sort 方法求最大最小值__
    ``` js
    let arr = [12, 45, 65, 3, 23, 11, 76, 8, 9, 56, 70]
    let list = arr.sort(function(a, b) {
        return b - a
    })
    let max = list[0]   // 76
    let min = list[list.length - 1] // 3
    ```
 - >__使用 apply 求数组最大值最小值__
    ``` js
    let arr = [12, 45, 65, 3, 23, 11, 76, 8, 9, 56, 70]
    let max = Math.max.apply(null, arr) // 76
    let min = Math.max.apply(null, arr) // 3
    ```
### 2. 如何判断一个数组
> `Object.prototype.toString.call()`，`instanceof`。特别要注意 **typeof 不可以判断数组类型**
``` js
let arr = []
Object.prototype.toString.call(arr)
```

### 3.Object.prototype.toString.call() 为什么可以用来判断类型
> 因为 `Object.prototype.toString() 方法会返回对象的类型字符串`，输出 `"[object Object]"` 其中第二个 `Object` 是传入参数的构造函数。所以使用 `call` 就可以指定任意的值和结合 `toString` 将组成的构造函数类型返回来判断类型。同样道理换成 `apply/bind` 同样也可以判断
``` js
Object.prototype.toString.call('str')   // "[object String]"
Object.prototype.toString.call(123)   // "[object Number]"
Object.prototype.toString.call({})      //  "[object Object]"
Object.prototype.toString.call([])      //  "[object Array]"

Object.prototype.toString.apply({})      //  "[object Object]"
Object.prototype.toString.apply([])      //  "[object Array]"

var f = Object.prototype.toString.bind({})
f()     //  "[object Object]"
var fn = Object.prototype.toString.bind([])
fn()   //  "[object Array]"
```

### 4.使用 call() 实现将类数组转化成数组
> 使用 `call()，[].slice / Array.prototype.slice()`
``` js
let array = [12, 23, 45, 65, 32]
function fn(array){
    var args = [].slice.call(arguments)
    return args[0]
}
fn(array)   // [12, 23, 45, 65, 32]
```
> 上面利用 `call` 改变了 `slice` 的 `this` 指向 `arguments` 来遍历输出。

## 参考
[JavaScript深入之call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

[JavaScript深入之bind的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)

[MDN bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## 结束
>__感谢阅读到这里，如果这篇文章能对你有一点启发或帮助，欢迎 [star](https://github.com/lurenacm/againJS/issues), 我是林一一，下次见。__

