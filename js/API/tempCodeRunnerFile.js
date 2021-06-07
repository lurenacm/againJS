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