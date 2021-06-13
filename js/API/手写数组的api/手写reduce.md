* `reduce` 收敛 (高频使用)
  - 作用：`reduce` 方法为数组中的每个元素执行一次 `callback` 函数，数组中的每一个元素汇总为单个返回值。
  - 参数：`reduce(callback(preVal, currentValue, index, array), initialValue)`，`element` 表示当前数组的一项，数组中的每一个元素都调用一次 `callback`，`initialValue` 表示回调函数的第一个参数，不传第一个值就是数组的第一个元素，不能为空。
  - 返回值：返回一个执行后的汇总值。
  - 原数组：不变
``` js
// 数组求和
let arr1 = [1,2,3]
let r = arr1.reduce((pre, cur) => {
    return pre+cur
}, 0)
r // 6
```
> reduce 参数在数组求和中会将数组的第一项和第二项相加后重新给 `pre=3`， 此时的 `cur` 是 `3`，最后两者相机返回给`r`

``` js
// 对象求和
let objSum = [{a:1, count:2}, {a:2, count:3}, {a: 2, count: 3}].reduce((pre, cur) => {
    return pre.a * pre.count + cur.a * cur.count
})
```
> 在上面的求和中第一次运算的结果返回给 `pre=500`，但是下一次运算时 `500.a` 是肯定不存在的，所以需要给 `reduce` 添加第二个默认参数 0，让 `pre=0` 作为初始值，修改代码如下
``` js
let objSum = [{a:1, count:2}, {a:2, count:3}, {a: 2, count: 3}].reduce((pre, cur) => {
    return pre + cur.a * cur.count
}, 0)
```

### 编写 myReduce() 方法
>思路： 上面提到过，数组的每一项都会使用到`callback`回调函数，这里可以使用 for 循环实现，同时初始值`initVal`是给`callback`的第一个参数 `pre` 赋值，可传可以不传。 
``` js
Array.prototype.myReduce = function (callback, initVal) {
    for (let index = 0; index < this.length; index++) {
        if (initVal) {
            callback(pre = initVal, cur = this[index], index, this)
        } else {
            callback(pre = this[index], cur = this[index + 1], index, this)
        }
    }
}

let arr = [1, 2]
let a = arr.reduce((pre, cur, index, arr) => {
    // console.log(pre, cur, index, arr)
    return pre + cur
}, 0)
console.log(a) // 3
```
> 测试结果正确。

