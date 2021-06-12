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

let obj = {name:'林一一', age:18}
let handel = {
    has: function(obj, proKey){
        if(proKey === 'age') return false
        return proKey in obj
    }
}

let proxy = new Proxy(obj, handel)

console.log('name' in proxy)
console.log('age' in proxy)

[1].reduce()