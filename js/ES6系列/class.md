## class 
> es6 中的 class 就是基于 es5 的 `function` 实现的。相当于构造函数
``` js
function Age(age) {
    this.age = age
}

let age = new Age()
```
> 构造函数中使用 `this` 会被写入到实例上面。
* class 中创建的类不能被给当作是函数调用
* 在类中没有使用 `static` 定义的方法属于共有的方法比如`say()`
``` js
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    say(){
        console.log(this.name)
    }
}
let person = new Person('a', 12)
person.say()
```
* es6 规范中规定单独调用原型上的方法 `this` 是不存在的为 `undefined`。
``` js
let say = person.say
say()   // undefined
```
> 单独使用了类中的`say()`方法，没有实例调用，`this` 是不存在的。

* 类 class 中的所有非静态方法都会被添加到 this 中，实例就可以拿到
``` js
class Example{
    constructor(){
    }
    getName(){}
    getAge(){}
    static postDate(){}
}
new Example()   // ['getName', 'getAge']
```
* static 静态的方法不会被添加到 this 中。这是类的私有属性

* 派生类(子类)中不像基类的构造函数中初始的 this 绑定。在派生类的构造函数中需要调用 `super`，才可以生成一个 this 的绑定。在静态方法中 this 指向的就是类本身。



### ES5 和ES6 中类的差别
* ES5 中通过一个构造函数，来实现类，ES6 中通过 class 来实现类，class 是ES6 中新增的一个关键字，其实是一个语法糖，本质上还是ES5中的function。
* ES6 中 class 的类无法进行变量提升。
* class 可以包含静态方法，实例方法
* class 中的静态方法只能由父类来使用，子类不能直接使用
* class 中的继承通过 `extend` 实现，通过 babel 编译后的 extend 使用的是寄生组合继承的方式 .call 和 create() 方法。
* 



[ES6复习](https://juejin.cn/post/6844903726201700365#heading-0)



