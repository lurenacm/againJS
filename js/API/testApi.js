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
function deepClone(obj){
    if(obj == undefined) return
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(typeof obj !== "object") return
    let typeObj = new obj.constructor
    console.log('typeObj', typeObj, obj)
    if(typeObj === "{}" || typeObj === "[]"){
        console.log('typeObj', typeObj, obj)

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                typeObj[key] = deepClone(obj[key]);
            }
        }
    }
    return typeObj
}
let obj = {name:'lin', a:{s:1}, arr:[1,3,4]}
deepClone(obj)
// console.log(deepClone(obj))