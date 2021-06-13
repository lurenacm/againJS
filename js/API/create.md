### Object.create()
> es5 中可以实现继承的一种方式，可以继承构造函数原型上的属性
* `Object.create()` 方法创建一个新对象，使用现有的对象来提供新创建的对象的 `__proto__`
* 用法
``` js
let obj = {
    age: 18
}

let o = Object.create(obj)
console.log(o.__proto__ === obj) // true
```

### 模拟实现 Object.create()
``` js

```



