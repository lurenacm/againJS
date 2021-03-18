> 前言：this 是 JS 中一个特别重要的一个知识点，this 难吗？好像挺简单的。看完下面这一篇文章，还不会的话，你别来找我。手动狗头🐕。

## this 的指向
* __执行函数前有 `'.'` 点操作符的话，函数体中的 `this` 就指向前面的对象，没有就指向 `window`，严格模式下指向 `undefined`。这句话特别的重要，请记住__
* 匿名自执行函数函数的 `this` 指向 `window`。
* 构造函数的 `this` 指向实例本身。
* 箭头函数的 `this` 指向外部的作用域。

>__再来看一下这句话：执行函数前有 `'.'` 点操作符的话，函数体中的 `this` 就指向前面的对象，没有就指向 `window`__

## 普通函数 this 的热身题
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

#### 热身题 4，有点小坑
__再来看一下这句话：执行函数前有 `'.'` 点操作符的话，函数体中的 `this` 就指向前面的对象，没有就指向 `window`__
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
> 
#### 热身5，还是有点小坑
``` js
function Foo() {
    getName = function (){
        console.log(1)
    }
    return this
}

Foo.getName = function () {
    console.log(2)
}

function getName() {
    console.log(5)
}
```

## 自执行函数
#### 热身题
``` js

```

## 构造函数 this 的热身题
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