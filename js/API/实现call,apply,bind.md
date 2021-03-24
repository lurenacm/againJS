# call，apply，bind 都可以改变 this 的指向
##  `call` 格式 [function].call([this], [param]...)，一句话概括：`call()` 将函数的 `this` 指定到 `call()` 的第一个参数值和剩余参数指定的情况下调用某个函数或方法。

>原理：`[function]`.call([this])，执行 `call()` 会将函数 `[function]` 中的 `this` 绑定到第一个参数。而函数 `call()` 中的 `this` 是来源于 `[function]` 的，`[function]` 是在 `call()` 函数内部执行的，是 `call()` 通过操控 `this` 来执行函数 `[function]`，同时给 `[function]` 传递剩余的参数。

## 思考
### 热身题1
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

### 热身题 2
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

### 来一道 call 的面试题
``` js
function fn1(){
    console.log(1)
}

function fn2(){
    console.log(2)
}       

fn1.call(fn2)   //  1
fn1.call.call(fn2)  //  2
```
> `fn1.call(fn2)` 中执行函数 `call()` 将 `fn1` 中的 `this` 绑定到 `fn2`，最后在 `call`中使用 `this` 执行函数`fn1`，输出就是1；`fn1.call.call(fn2)`：等价于`A.call(fn2)`，`A` 就是 `fn1.call`函数。同样将 A 中 `this` 传递给`fn2`，此时A 中 `this` 就是`fn2`。`call` 调用 `this` 执行 `A (fn1.call)`，也就是执行 `fn2` 输出就是2。

> 上面的代码引用 `讶羽` 大佬的

## apply 和 call 基本一致
``` js
var obj = {
    name: '林一一',
    fn: function() {
        return this.name
    }
}

```
> apply 接收的参数是一个数组。

### 模拟实现内置的 call()，apply()方法。
>__下面是 `讶羽`__


### call 和 apply 区别
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

## bind

## 思考
### 1. 模拟实现内置的 bind() 方法。

### 2.  bind() 和 call()、apply() 的区别


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


## 参考
[JavaScript深入之call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

