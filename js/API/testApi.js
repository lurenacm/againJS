// function isObj(checkType) {
//     let type = {}.toString.call(checkType).split(' ')[1].split(']')[0].toLowerCase();
//     return type === 'object' ? true : false
// }

// const option = {
//     url: '',
//     methods: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data: {
//         name: '林一一',
//         age: 18,
//         person: {
//             sex: 'man'
//         }
//     },
//     arr: [12, 34]
// }
// let param = {
//     url: 'https://www.baidu.com/',
//     arr: [10, 23],
//     headers: {
//         'self': 'aa'
//     },
//     data: {
//         person: {
//             action: 'keep move~'
//         }
//     }
// }

// function merge(option, param = {}) {
//     for (const key in param) {
//         let paramKey = isObj(param[key]);
//         let optionKey = isObj(option[key])
//         if (optionKey && paramKey) {
//             option[key] = merge(option[key], param[key])
//             continue
//         }
//         option[key] = param[key]
//     }
//     return option
// }

// let res = merge(option, param)
// console.log('res', res)


// 深拷贝
function deepClone(obj) {
    if (obj == undefined) return
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== "object") return
    let typeObj = new obj.constructor
    console.log('typeObj', typeObj, obj)
    if (typeObj === "{}" || typeObj === "[]") {
        console.log('typeObj', typeObj, obj)

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                typeObj[key] = deepClone(obj[key]);
            }
        }
    }
    return typeObj
}
let obj = {
    name: 'lin',
    a: {
        s: 1
    },
    arr: [1, 3, 4]
}
deepClone(obj)
// console.log(deepClone(obj))

let arr1 = [1, 2, 3, 4, 1, 2, 3, 9]
let arr2 = [1, 4, 3, 5, 2, 5, 2]

function diff(arr1, arr2) {
    let res = [...new Set(arr1)].filter(item => {
        return !new Set(arr2).has(item)
    })
    return res
}
console.log(diff(arr1, arr2))

let m = new Map()
m.set('name', '1')
m.set('name', 0)
console.log(m)


function deepClone(obj, cache = new Set()) {
    // 判断之前是否已经循环过 cloneObj，防止再次缓存
    if (cache.has(obj)) return obj
    cache.add(obj)
    if (obj == undefined) return
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (typeof obj !== "object") return obj
    let cloneObj = new obj.constructor
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache);
        }
    }
    return cloneObj
}
let obj = {
    name: 'lin',
    a: {
        s: 1
    },
    arr: [1, 3, 4],
}
obj.c = obj
console.log(deepClone(obj))

let obj = {
    name: '林一一',
    age: 18
}
let handel = {
    has: function (obj, proKey) {
        if (proKey === 'age') return false
        return proKey in obj
    }
}

let proxy = new Proxy(obj, handel)

console.log('name' in proxy)
console.log('age' in proxy)



Array.prototype.myReduce = function (callback, initVal) {
    for (let index = 0; index < this.length; index++) {
        if (initVal) {
            callback(pre = initVal, cur = this[index], index, this)
        } else {
            callback(pre = this[index], cur = this[index + 1], index, this)
        }
    }
}

let arr = [1, 2]
let a = arr.reduce((pre, cur, index, arr) => {
    // console.log(pre, cur, index, arr)
    return pre + cur
}, 0)


class Person{
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    say(){
        console.log(this)
    }
}
let person = new Person('a', 12)
let say = person.say
say()



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



