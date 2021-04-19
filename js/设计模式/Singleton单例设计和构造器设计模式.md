# 设计模式
> 为什么需要使用设计模式：设计模式是一种编程思想，用来规范代码的编写。代码更加简洁，规范化，易维护，解构。

## 单例设计模式（Singleton Pattern）
* 定义：单例设计模式是一个单独的实例，来管理模块中的内容，实现模块之间的独立划分，但是模块之间也就而已相互的调用
>__确保一个类仅有一个实例，并提供一个访问它的全局访问点。__
>要点：一个类只能构造出唯一实例，而且有一个访问的方式

* 作用
>__把同一件事物的属性分组归类，存储在同一个堆内存中，避免了全局变量之间的冲突和污染__

* 示例
  ``` js
    var personA = {
        name: 'xxx'
        age: 'xx'
    }

    var personB = {
        name: 'xxx'
        age: 'xx'
    }
  ```
>__上面的 personA 和 personB 都是基于 object 这个内置对象创建的，两个单独的实例之间互不干扰，就是单例__

>在单例设计模式中，object 不仅仅是变量名还是命名空间 `namespace`。描述对象的属性放在放在命名空间中，命名空间之间互不干扰。

### 单例设计模式例子
> 创建两个模块可以使用闭包，也可以使用`class`
``` js
var singletonA = (function () {
    let data = []
    var a = 12

    function fn() {
        console.log(a)
    }

    function deleteData() {}

    // 使用 return 将模块中的方法暴露，提供唯一的访问方式
    return {
        init: function () {
            fn(),
            deleteData()
        }
    }
})()
// 可以控制方法的执行顺序。
singletonA.init()

var singletonB = (function () {
    let data = []
    var a = 1

    function fn(val) {
        data.push(val)
        console.log(data)
    }

    function getData() {
        // 
    }
    // 唯一的访问方式
    singletonA.fn()

    return {
        fn: fn
    }
})()

singletonB.fn(0)
singletonB.fn(1)  // [0, 1]
```
> 单例模式使用的是同一个堆内存中的内容，存在自己的缺点。每次使用 `singletonB.fn()` 都会向 `data` 都加入内容且原数据还在，某些任务场景下如果我们想拥有互不干扰的容器这样就没办法实现了。下面介绍`Constructor` 构造器模式。


## 二、Constructor 构造器设计模式
> 插件组件封装，
``` js
class moduleCont {
    constructor() {
        this.data = []
    }

    fn(val) {
        data.push(val)
        console.log(data)
    }
}

let a1 = new moduleCont()
let a2 = new moduleCont()
console.log(a1 === a2)
console.log(a2.fn === a1.fn)
console.log(a1.fn(10)) // [10]
console.log(a1.fn(20)) // [20]
```
> 这样不同的实例之间就互不干扰了。


[设计模式](https://www.cnblogs.com/tugenhua0707/p/5198407.html)
[2](https://www.cnblogs.com/imwtr/p/9451129.html)
[](https://refactoringguru.cn/design-patterns)