# Proxy 代理
> ES5 中的definedProperty 用于重定向对象属性的`get/set`方法，ES6 中 Proxy 代理提供了更多的代理方法比如 `in, delete` 等

## new Proxy(targe, handel)
[MDN Proxy 详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
> targe 和 handel 都是对象，targe 是拦截的目标对象也就是 `Proxy` 要代理的对象也可以是一个函数，handel 是处理拦截目标对象之定的方案。
* proxy 中的拦截方式有 13 种
* Proxy 中的 get/set 方法和 `definedProperty` 类似，都是对取值和设置值的拦截。
``` js
let obj = {}
let proxy = new Proxy(obj, {
    get: function(obj, prop){
        return obj[prop]
    }
    set: function(obj, prop, value){
        obj[prop] = value
    }
})
proxy.name = '林一一'
console.log(proxy.name)
```
* Proxy 中的 `has(target, propKey)` 针对`in`运算符，可以隐藏某些属性，不被 `in` 操作符发现，返回一个布尔值。
``` js
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
```
> 上面的 has 将`age`属性隐藏了
* Proxy 中的



