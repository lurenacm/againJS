function deepClone(obj){
    if(obj == undefined) return 
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(typeof obj !== "object") return obj
    let cloneObj = new obj.constructor
    for (const key in obj) {
        if (!cloneObj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj
}
let obj = {name:'lin', a:{s:1}, arr:[1,3,4]}
console.log(deepClone(obj))