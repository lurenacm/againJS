> 前言：this 是 JS 中一个特别重要的一个知识点，this 难吗？好像挺简单的。看完下面这一篇文章，还不会的话，你别来找我。手动狗头🐕。

## 思维导图
[this 思维导图](./img/thissiwei.png)

## this 的指向
* __执行函数前有 `'.'` 点操作符的话，函数体中的 `this` 就指向前面的对象，没有就指向 `window`，严格模式下指向 `undefined`。这句话特别的重要，请记住__
* 函数没有直接调用者 `this` 指向全局对象(浏览器中是window，node中是 global)。如匿名函数等
* 构造函数的 `this` 指向实例本身。
* 箭头函数本身没有`this`的，箭头函数的 `this` 指向最近的非箭头函数 `this`，找不到就指向 `window`，严格模式下指向 `undefined`。

>__再来看一下这句话：执行函数前有 `'.'` 点操作符的话，函数体中的 `this` 就指向前面的对象，没有就指向 `window`__

### 一、普通函数 this 的热身题
#### 热身题 1
``` js
var name = '林一一'
function fn(){
    var name = '林二二'
    return this.name
}
fn()    // 林一一
```
>执行函数 `fn()`，前面没有 `'.'` 点操作符吧，那么这里的 `this` 就指向 `window`。输出的就是全局下的 `name = '林一一'`。

__再来看一下这句话：执行函数前有 `'.'` 点操作符的话，函数体中的 `this` 就指向前面的对象，没有就指向 `window`__

#### 热身题 2
``` js
var name = '林二二'
var obj = {
    name: '林一一',
    fn: function () {
        return this.name
    }
}
console.log(obj.fn())   // '林一一'
var fo = obj.fn
console.log(fo())       // '林一一'     fo() ==> window.fo()
```
> `obj.fn()` 中函数 `fn()` 前面有 `'.'` 点操作符吧，那么这里的 `this` 就指向 `obj` 这个对象。再看执行函数 `fo()`，前面没有 `'.'` 点操作符吧，那么这里的 `this` 就指向 `window`。其实上面的函数 `fo() ==> window.fo()`，所以执行函数 `fo()` 前面也是可以看作是有 `'.'` 操作符的。

__再来看一下这句话：执行函数前有 `'.'` 点操作符的话，函数体中的 `this` 就指向前面的对象，没有就指向 `window`__
#### 热身题 3，修改一下热身题 2
``` js
var name = '林二二'
var obj = {
    name: '林一一',
    fn: function () {
        var name = '小三',
        return function(){
             return this.name
        }
    }
}
console.log(obj.fn()())   // 林二二
var fo = obj.fn()
console.log(fo())    // 林二二
```
> 热身3和热身2差不多，`obj.fn()()` 中 `obj.fn()`执行完后有一个函数(这里称为函数 `A`)返回，最后相当于执行函数 `A()`， `A()` 前面没有 `'.'` 点操作符吧，那么这里的 `this` 就指向 `window`，输出就是 `林二二` 了。上面的 `fo()` 函数同理。

### 二、函数没有直接调用者
__函数没有直接调用者 `this` 指向全局对象(浏览器中是window，node中是 global)。如匿名函数等__
#### 热身题 1
``` js
var name = '林一一';
!(function(){
   console.log(this.name)   // 林一一
})()
```
> 自执行函数没有直接的调用者输出的 `name = '林一一'`。

#### 热身题 2
``` js
var name = '林一一'
var obj = {
    name : '二二',
    callback: function(){
        console.log(this.name)
    }
}

setTimeout(obj.callback,1000)
/* 输出
*   林一一
*/
```
> 函数 `setTimeout`，`obj.callback(这只是一个引用地址)` 中并没有直接调用者，`this` 就指向 `window`。所以输出的 `name` 就是全局下的 `林一一`。

### 三、构造函数中的 this 
__来读一下这句话：构造函数的 `this` 指向实例本身__
>关于构造函数的 `this` 为什么指向实例是浏览器指定的，详情看 `new` 这个过程发生了什么 [面试 | 你不得不懂得 JS 原型和原型链](https://juejin.cn/post/6938590449674223624#heading-6)
#### 热身题 1
``` js
function Fn(){
    var n = 0
    this.name = '林一一'
    this.age = 18
    this.getName = function(){
        return this.name
    }
}

Fn.prototype.getAge = function(){
    return this.age
}

Fn.x = '林二二'

var f = new Fn()
console.log(f.name)     // 林一一
console.log(f.getName())     // 林一一
console.log(f.getAge())        // 18
console.log(f.n)    // undefined
console.log(f.x)    // undefined
```
> 上面的 `Fn` 经过 `new`后就是一个构造函数，`this` 就指向实例 `f`。所以上面的1，2输出都是`林一一`。`f.getAge()` 是实例 `f` 调用了`getAge` 输出就是 18，问：实例 `f` 中并没有属性 `getAge` 是怎么输出 18的，`f.x` 输出又为什么是 `undefined` ？答：这是原型链的查找机制，属性 `x` 不是在原型 `prototype` 上的就不是实例的属性，可以读一下这篇文章 [面试 | 你不得不懂得 JS 原型和原型链](https://juejin.cn/post/6938590449674223624)；问：为什么`f.n` 输出的是 `undefined`。因为变量 `n` 是构造函数的私有变量和 `new` 创建的实例没有关系。

### 四、箭头函数
* __箭头函数本身没有 `this`，箭头函数的`this`继承上下文的，里面的 `this`会指向当前最近的非箭头函数的 `this`，找不到就是 `window` (严格模式是undefined)__
* __箭头函数的 `this` 始终指向函数定义时的 `this`，而非执行时__
#### 热身题 1
``` js
var name = '林一一'
var obj = {
    name: '二二',
    a: () => {
        console.log(this.name)
    }
}
obj.a()

/* 输出
*   '林一一'
*/
```
> 箭头函数的 `this`，找不到非箭头函数的 `this` 就直接指向 `window`。

#### 热身题 2
``` js
var name = '林一一'
var obj = {
    name: '二二',
    fn: function() {
        return () => {
            console.log(this.name)
        }
    }
}
obj.fn()()

/* 输出
*   '二二'
*/
```
> 很明显箭头函数的 `this` 来自函数 `fn`，对象 `obj` 调用了函数 `fn`，所以 `fn` 的 `this` 指向 `obj`，输出结果就是 `二二`。

### 五、call，apply，bind 改变 this 的指向
__提示：所有的函数都是基于 `Function` 这个基类来创建的，同样拥有 `Function` 原型上面的方法__
* `call`，接受`this`的对象，和一组列表。`apply` 和 `call` 一样，唯一不同的是 `apply` 接受的是一个包含多个参数的数组。`bind` 同样也是改变函数的 `this` 指向，只不过 `bind` 执行后会返回一个新的函数，新函数中参数来源于剩余的参数
#### 热身题
``` js
var name = '林一一'
var age = 18
function fn(){
   return this.name
}

function p(){
    return {
        age: this.age,
        arg: arguments
    }
}

let obj = {
    name: '二二',
    age: 18
}

let o = {
    name: '三三'
}

fn()    // '林一一'
fn.call(obj)    // '二二'
fn.call(o)  //  '三三'
p.call(obj, 12, 23, 45, 67) // {age: 18, arg: Arguments(4)}

fn.apply(obj)    // "二二"
p.apply(obj, [1, 2, 3, 4, 5])    // {age: 18, arg: Arguments(5)}

fn.bind(obj)()  // "二二"
p.bind(obj, 12, 23, 34)()   // {age: 18, arg: Arguments(3)}
```
> 以上就是 `call`,  `apply`, `bind`, 关于 `this` 的内容，这里不介绍三者的写法，如果介绍可以写另一篇文章了。对这三者不熟悉的可以找其他资料看看。

## 思考题
### 1. 笔试题 this 指向问题
``` js
var name = '林一一'
var obj = {
    name: '林二二',
    show: function (){
        console.log(this.name)
    },
    wait: function () {
        var fn = this.show
        fn()
    }
}
obj.wait()  //  林一一
```
> `obj.wait()` 中，执行函数 `wait()` 前面有 `'.'` 点操作符吧，那么这里的 `this` 就指向 `obj` 这个对象，所以`this.show ==> obj.show`。再看执行函数 `fn()` 前面没有 `'.'` 点操作符吧，那么这里的 `this` 就指向 `window`，输出就是 `林一一`。

### 2. 和闭包有关的 this 指向问题
``` js
var n = 2 // -> 4 -> 8
var obj = {
    n: 3,    // 6
    fn: (function(n){
        n*=2
        this.n+=2    // window 下的 n 变成 4
        var n = 5    // 这一步不会再重新声明，因为已经参数赋值，就不会再声明而是直接赋值 n = 5
        console.log("window.n", window.n)
        return function (m) {
            console.log("n:", n, "m", m)    // n:5  m:3  这里的 n 向上查找是 5   // 
            this.n*=2    // fn(3): 2 * 4 =8  //  obj.fn(3): 2 * 3 = 6 
            console.log(m + (++n))    // 3 + (++5) ++n 导致上级作用域的n变成了6    // 3 + (++6)
        } 
    })(n)
}

var fn = obj.fn;
fn(3)    // 9
obj.fn(3)    // 10
console.log(n, obj.n)    // 8 6
/* 输出
* 9
* 10
* 8  6
/
```