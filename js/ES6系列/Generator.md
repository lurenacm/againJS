## Generator 生成器对象
> Generator 生成器对象由一个 generator 函数返回的。
* Generator 本身就是基于 iterator 迭代器规范实现的管理异步编程的。
``` js
function* fn(){
   console.log(1)
}
console.log(typeof fn()) // object
```
> `fn()` 函数执行后返回一个 `generator` 对象。但是函数内部的逻辑没有被执行，所以 `console.log(1)` 中 1 没有被打印。


### 普通函数和 Generator 函数的区别
``` js
function* func(){}
console.dir(func.__proto__) // GeneratorFunction.prototype

function fun(){}
console.dir(fun.__proto__)  // Function.prototype
```
* Generator 函数的原型链指向 GeneratorFunction.prototype。普通函数的指向 Function.prototype
* 不能使用 new 关键字来得到实例，而是直接调用 generator 函数即可
* 但是 generator 函数在全局环境下中的 this 还是指向 `window`，而不是指向实例
``` js
function* func(){
   console.log(this) // window
}
new func()
// Uncaught TypeError: fbc is not a constructor

// itor 就是实例
let itor = func()   
console.log(itor.__proto__ === func.prototype) // true
console.log(({}).toSing.call(itor)) // "[object Generator]" 
```
> 需要注意的是，上面的 itor 实例的结果不是 object 类型，而是 Generator。同时`let itor = func()`并不会执行 func 函数。



### 生成器函数中 yield 和方法
#### yield 
* 每执行一次 `yield` 函数都会暂停一次
* `yield` 的执行需要依赖 `.next()` 调用，返回的结果是一个符合迭代器规范的对象，对象内有`value, done`分别表示返回的结果值和遍历是否完成，false 表示未遍历结束，true 表示遍历结束则函数执行结束。
``` js
function* func(){
   console.log('A')
   let x = yield 1

   console.log(x) // undefined
   console.log('B')
   yield 2

   console.log('C')
   return 3
}
let itor = func()

itor.next() //  {value: 1, done: false}
itor.next() //  {value: 2, done: false}
itor.next() //  {value: 3, done: true}
```
> itor 是 Generator 的实例所以具备下面的方法，`yield` 的返回值不会被变量 x 接收到。

#### next 
* next，按照迭代器规范遍历对象，`.next()` 可以无限调用，但是没有 `yield 或 return` 则 value 为 undefined。
* next 中传值是给上一个 `yield` 的接收变量传递的，比如下面的 `count`。
``` js
function* func(){
   let count = yield 1
   console.log(count)
}

let itor = func()

itor.next() //  {value: 1, done: false}
itor.next(10) // 10  {value: undefined, done: true}
```
* return，结束遍历。
* throw，向外抛出异常。


#### 思考题
1. 求输出结果
``` js
function* fn1(){
   yield 2
   yield 3
}

function* fn2(){
   yield 1
   yield fn1()
   yield* fn1()
}


let itor = fn2()
console.log(itor.next())   // {value: 1, done:false}
console.log(itor.next())   // {value: fn1 {<suspended>}, done:false}
console.log(itor.next())   // {value: 2, done: false}
console.log(itor.next())   // {value: 3, done: false}
console.log(itor.next())   // {value: undefined, done: true}
```
> `yield* fn1()` 将 `fn1()` 中返回的生成器对象依次执行了。



## async 和 await
> async 和 await 就是 Generator 的语法糖




