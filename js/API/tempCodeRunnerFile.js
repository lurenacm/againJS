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