# Proxy 代理
> ES5 中的definedProperty 用于重定向对象属性的`get/set`方法，ES6 中 Proxy 代理提供了更多的代理方法比如 `in, delete` 等

## new Proxy(targe, handel)
[MDN Proxy 详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
> targe 和 handel 都是对象，targe 是拦截的目标对象也就是 `Proxy` 要代理的对象/数组，也可以是一个函数，handel 是处理拦截目标对象之定的方案。
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
proxy[name] = '林一一'
console.log(proxy[name])
```
> `set(obj, prop, value)` 里面可以接收三个参数这样的话，利用这个特性我们也可以监控到数组中下标的变化和数组长度的变化，这就是 `Vue3.0` 中抛弃 `definedProperty` 选择 `Proxy`的原因之一。需要注意的是对数组进行操作时数组的`key`可能会出现某些问题，可以使用`Reflect.set(targe, key, value)/get(targe, key)`方法给数组设置和返回值。
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
* Proxy中 `apply(targe, thisArg, args)` 的拦截函数的调用，所以 `Proxy` 中的 `targe` 代理的是一个函数，`thisArg` 是被调用的上下文对象，`args` 是实参的集合
``` js
function sum(a, b){
    return a + b
}

let handle = {
    apply: function(targe, thisArg, args) {
        console.log(targe, thisArg, args)
        return args[0] +args[1]
    }
}

let proxy = new Proxy(sum, handle)
proxy(1, 2) // 3
```


## 参考
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply)



