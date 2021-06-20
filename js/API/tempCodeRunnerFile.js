function Dog(name) {
    this.name = name
}

Dog.prototype.bark = function() {
    console.log('wang wang')
}

Dog.prototype.sayName = function() {
    console.log('my name is ' + this.name)
}

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

let sanmao = _new(Dog, '三毛')
sanmao.bark();  // => 'wang wang'
sanmao.sayName(); // => 'my name is 三毛'
console.log(sanmao instanceof Dog)  // true