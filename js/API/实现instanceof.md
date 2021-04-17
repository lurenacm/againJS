## instanceof
> 根据左侧实例的原型链上是否出现右侧的类型进行判断结果。即`实例.__proto__ === 类.prototype`，则是true 否则是 false。
``` js
function _instanceof(example, classP) {
    let proto = Object.getPrototypeOf(example),
        classPrototype = classP.prototype
    while (true) {
        if (proto === classPrototype) {
            return true
        }
        if (proto === null) {
            return false
        }
        proto = Object.getPrototypeOf(proto)
    }

_instanceof([], Array)  //true
_instanceof('', Array)  // false
_instanceof('', Object) // true
```