## instanceof
> 根据左侧实例的原型链上是否出现右侧的类型进行判断结果。即`实例.__proto__ === 类.prototype`，则是true 否则是 false。
``` js
function _instanceof(example, classP) {
    let example = Object.getPrototypeOf(example),
        classP = classP.prototype
    while (true) {
        if (example === classP) {
            return true
        }
        if (example === null) {
            return false
        }
        example = Object.getPrototypeOf(example)
    }
}
```