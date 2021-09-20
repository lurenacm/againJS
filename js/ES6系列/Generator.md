## Generator 生成器对象
> Generator 生成器对象由一个 generator 函数返回的。
* Generator 本身就是基于 iterator 迭代器规范实现的管理异步编程的。允许函数在执行过程中暂停和调用时恢复执行。
``` js
function* fn(){
   console.log(1)
}
console.log(typeof fn()) // object
```
> `fn()` 函数执行后返回一个 `generator` 对象。但是函数内部的逻辑没有被执行，所以 `console.log(1)` 中 1 没有被打印。

> 小 Tip：生成器并不是新的概念，早在其他语言已近有 `yield` 的关键字了。例如 `C#`

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
* 每执行一次 `yield` 函数都会暂停一次，生成器函数会使用 `yield` 将生成器对象的 `value` 值返回。
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


### 生成器 Generator 就是一个 迭代器
* 通过实现 `symbol.iterator` 和 `next` 可以实现创建自定义的迭代器。


## async 和 await
> async 和 await 就是 Generator 的语法糖
``` js
function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function() {
  
    // 先调用generator函数 生成迭代器
    // 对应 var gen = testG()
    const gen = generatorFunc.apply(this, arguments)

    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
    
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let generatorResult
        
        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult

        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value)
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resove的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next() 
            //
            //      // 此时done为true了 整个promise被resolve了 
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step("next", val)
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            function onReject(err) {
              step("throw", err)
            },
          )
        }
      }
      step("next")
    })
  }
}
```




## 参考
[深入浅出 ES6（三）：生成器 Generators](https://www.infoq.cn/article/es6-in-depth-generators/)