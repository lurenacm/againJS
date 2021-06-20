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
* 将构造函数的 this 指向这个堆内存地址(实例对象)
* 将创建好的实例对象返回
> 需要注意的是在构造函数中使用 return 没有意义。构造函数中的 return 会被剥夺。更详细的内容请看 [面试| JS 原型和原型链](https://juejin.cn/post/6938590449674223624#heading-6)


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
    // return new arguments[0](arguments[1])
}

let sanmao = _new(Dog, '三毛')
sanmao.bark();  // => 'wang wang'
sanmao.sayName(); // => 'my name is 三毛'
console.log(sanmao instanceof Dog)  // true
```
> 分析：分析这道题其实就是实现 new 的过程。按照上面 new 构造函数中发生的过程可以实现如下

``` js


```



