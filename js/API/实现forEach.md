## forEach(callback, thisArg) 循环
> `callback` 函数每一轮循环都会执行一次，且还可以接收三个参数`(currentValue, index, array)`，`index, array` 也是可选的，`thisArg`(可选) 是回调函数的 `this` 指向。
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
> 结果准确无误。