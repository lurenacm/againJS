## new 构造函数
> new 构造函数执行相当于普通函数执行。
``` js
function Person() {
    this.name = '林一一'
}
new Person()
```

### new Person() 过程中发生了什么
* new 为构造函数创建了一个堆内存也就是实例对象
* 执行构造函数，将构造函数的 this 指向这个堆内存地址(实例对象)
* 将创建好的实例对象返回
> 需要注意的是，在构造函数中使用 return 没有意义。return 一个基本类型不会阻碍实例的返回，但是 return 一个 object 会覆盖返回的实例。更详细的内容请看 [面试| JS 原型和原型链](https://juejin.cn/post/6938590449674223624#heading-6)


### (阿里)面试题，实现一个 _new()，得到预期的结果
``` js
function Dog(name) {
    this.name = name
}

Dog.prototype.bark = function() {
    console.log('wang wang')
}

Dog.prototype.sayName = function() {
    console.log('my name is ' + this.name)
}

function _new() {
    // code
}

let sanmao = _new(Dog, '三毛')
sanmao.bark();  // => 'wang wang'
sanmao.sayName(); // => 'my name is 三毛'
console.log(sanmao instanceof Dog)  // true
```
> 分析：分析这道题其实就是实现 new 的过程。按照上面 new 构造函数中发生的过程可以实现如下
``` js
function _new(ctor, ...params) {
    // 创建一个堆内存地址，继承原型上的共有属性
    let obj = {}
    obj.__proto__ = ctor.prototype

    // 确定 this 指向堆内存地址，同时使用 call 将构造函数的私有属性指向到 obj 实例中，实现私有属性继承
    let res = ctor.call(obj, ...params)

    // 返回创建的实例，考虑到构造函数本身执行后返回值是对象的话会覆盖返回的实例，需要先判断
    if(res !== null && typeof res === 'object') return res
    return obj
}
```
> 执行结果输出无误。上面的模拟实现 new 过程中使用了组合继承 `call+原型继承`，可以参考[]()




