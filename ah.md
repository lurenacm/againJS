>__大家好，我是林一一，这是一篇比较 JS 中三类循环的原理和性能的文章，希望能给你带来点帮助 😁__
## 性能比较
## for 循环和 while 循环的性能对比
``` js
let arr = new Array(999999).fill(1)

console.time('forTime')
for(let i = 0; i< arr.length; i++){}
console.timeEnd('forTime')

console.time('whileTime')
let i = 0
while(i< arr.length){
    i ++ 
}
console.timeEnd('whileTime')
/* 输出
* forTime: 4.864990234375 ms
* whileTime: 8.35107421875 ms
*/
```
* 使用 `let` 声明下的循环，由于 `for` 中块级作用域的影响，内存得到释放，运行的运行的速度会更快一些。
* 使用 `var` 声明时因为`for while` 的循环都不存在块级作用域的影响，两者运行的速度基本一致。

## forEach(callback, thisArg) 循环数组
> `callback` 函数每一轮循环都会执行一次，且还可以接收三个参数`(currentValue, index, array)`，`index, array` 也是可选的，`thisArg`(可选) 是回调函数的 `this` 指向。
* 遍历可枚举的属性
``` js
let arr = new Array(999999).fill(1)
console.time('forEachTime')
arr.forEach(item =>{} )
console.timeEnd('forEachTime')
// forEachTime: 25.3291015625 ms
```
* 函数式编程的 `forEach` 性能消耗要更大一些。

### 思考：在 forEach 中使用 return 能中断循环吗？
``` js
[1,2,4,5].forEach((item, index) => {
    console.log(item, index)
    return
})
// 1 0
// 2 1
// 4 2
// 5 3
```
> 从上面看出 forEach 中使用 return 是不能跳出循环的。
**那么如何中断 forEach 的循环**、
* 可以使用 try catch
* 或使用其他循环来代替，比如 用 every 和some 替代 forEach，every 中内部返回 false是跳出，some 中内部是 true 时 跳出



### 模拟实现 forEach
``` js
Array.prototype.myForEach = function (callback, context) {
    let i = 0,
        than = this,
        len = this.length;
    context = context ? window : context;
    for (; i < len; i++) {
        typeof callback === 'function' ? callback.call(context, than[i], i, than) : null
    }
}

let arr = [0, 1, 5, 9]
arr.myForEach((item, index, arr) => {
    console.log(item, index, arr)
})

//0 0 (4) [0, 1, 5, 9]
// 1 1 (4) [0, 1, 5, 9]
```
> 结果准确无误。关于 this 指向或 call 的使用的可以看看 [JS this 指向](https://juejin.cn/post/6942697803709677582)  和  [call, apply, bind的模拟实现](https://juejin.cn/post/6945219696429891597)



## for in 循环
>`for in` 的循环性能循环很差。性能差的原因是因为：`for in` 会迭代对象原型链上一切 `可以枚举`的属性。
``` js
let arr = new Array(999999).fill(1)
console.time('forInTime')
for(let key in arr){}
console.timeEnd('forInTime')
// forInTime: 323.08984375 ms
```
* `for in` 循环主要用于对象
``` js
let obj = {
    name: '林一一',
    age: 18,
    0: 'number0',
    1: 'number1',
    [Symbol('a')]: 10
}

Object.prototype.fn = function(){}

for(let key in obj){
//    if(!obj.hasOwnProperty(key)) break 阻止获取原型链上的公有属性 fn
    console.log(key)
}
/* 输出
 0
 1
 name
 age
 fn
*/
```
* (缺点) `for in` 循环主要遍历数字优先，由小到大遍历
* (缺点) `for in` 无法遍历 `Symbol`属性（不可枚举）。
* (缺点) `for in` 会将公有(prototype) 中可枚举的属性也遍历了。可以使用 `hasOwnProperty`来阻止遍历公有属性。
### 思考
#### 1. 怎么获取 Symbol 属性
> 使用 `Object.getOwnPropertySymbols()`，获取所有 Symbol 属性。
``` js
let obj = {
    name: '林一一',
    age: 18,
    0: 'number0',
    1: 'number1',
    [Symbol('a')]:  10
}

Object.prototype.fn = function(){}

let arr = Object.keys(obj).concat(Object.getOwnPropertySymbols(obj))
console.log(arr)    //["0", "1", "name", "age", Symbol(a)]
```

## for of 循环
``` js
let arr = new Array(999999).fill(1)
console.time('forOfTime')
for(const value of arr){}
console.timeEnd('forOfTime')
// forOfTime: 33.513916015625 ms
```
> for of 循环的原理是`按照是否有迭代器规范来循环的`，所有带有 `Symbol.iterator` 的都是实现了迭代器规范，比如数组一部分类数组，`Set,Map...`，`对象没有实现 Symbol.iterator 规范`，所以不能使用`for of`循环。
* 使用 `for of` 循环，首先会先执行 `Symbol.iterator` 属性对应的函数且返回一个对象
* 对象内包含一个函数 `next()` 循环一次执行一次 `next()`，`next()` 中又返回一个对象
* 这个对象内包含两个值分别是 `done：代表循环是否结束，true 代表结束；value：代表每次返回的值`。
``` js
// Symbol.iterator 内部机制如下
let arr = [12, 23, 34]
arr[Symbol.iterator] = function () {
    let self = this,
        index = 0;
    return {
        next() {
            if(index > self.length-1){
                return {
                    done: true,
                    value: undefined
                }
            }
            return {
                done: false,
                value: self[index++]
            }
        }
    }
}
```
### 思考，如何让普通的类数组可以使用 for of 循环
> 类数组被需具备和数组类试的结果属性名从`0, 1, 2...`开始，且必须具备`length` 属性
``` js
let obj = {
    0: 12,
    1: '林一一',
    2: 'age18',
    length: 3
}
// 
obj[Symbol.iterator] = Array.prototype[Symbol.iterator]
for (const value of obj) {
    console.log(value)   
}
/* 属性
*   12
*   林一一
*   age18
*/
```
> 只需要给类数组对象添加`Symbol.iterator`接口规范就可以了。

## (附加)将argument实参集合变成真正的数组
__`arguments` 为什么不是数组？__
* `arguments` 是类数组(其实是一个对象)属性从0开始排，依次为0，1，2... 最后还有 `callee和length` 属性，`arguments` 的 `__proto__` 直接指向基类的 `object`，不具备数组的方法。
### 方式一 使用 call()，[].slice/Array.prototype.slice()
``` js
let array = [12, 23, 45, 65, 32]
function fn(array){
    var args = [].slice.call(arguments)
    return args[0]
}
fn(array)   // [12, 23, 45, 65, 32]
```
__上面的 `slice` 结合 `call` 为什么可以在改变 `this` 后可以将 `arguments` 转化成数组？我们来模拟手写实现一下 `slice`，就知道里面的原理了__
``` js
Array.prototype.mySlice = function(startIndex=0, endIndex){
    let array = this    // 通过 this 获取调用的数组
    let thisArray = []
    endIndex === undefined ? (endIndex = array.length) : null
    for(let i = startIndex; i< endIndex; i++){      // 通过 `length` 属性遍历
        thisArray.push(array[i])
    }
    return thisArray
}

// 测试一下没有问题
let arr = [1, 3, 5, 6, 7, 23]
let a 
a = arr.mySlice()   // [1, 3, 5, 6, 7, 23]
a = arr.mySlice(2, 6)   // [5, 6, 7, 23]
```
> 通过 `this` 获取调用 `mySlice` 的数组，再通过 `length` 属性遍历形成一个新的数组返回。所以改变`this` 指向 `arguments` 再通过 `arguments.length` 遍历返回一个新的数组，便实现了将类数组转化成数组了。

__**来思考一下字符串可以转化成数组吗？**__
``` js
let a = [].slice.call('stringToArray')
console.log(a)  // ["s", "t", "r", "i", "n", "g", "T", "o", "A", "r", "r", "a", "y"]
```
> 同样也是可以的，理由同上。至于字符串(值类型)为什么被 `this` 指定，可以来看看这篇文章 [面试 | call,apply,bind 的实现原理和面试题]()

### 方式二 使用 ES6 的扩展运算符 `...`
``` js
function fn(array){
    var args = [...arguments]
    return args
}
fn(12, 23, 45, 65, 32)   // [12, 23, 45, 65, 32]
```

### 方式三 Array.from()
``` js
function fn(array){
    return Array.from(arguments)
}
fn(12, 23, 45, 65, 32)   // [12, 23, 45, 65, 32]
```



