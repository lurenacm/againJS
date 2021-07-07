## ES5 中数组常用的遍历方法
* `fill`
    - 作用：用一个固定值填充一个数组
    - 参数：三个参数，`fill(value[, start[, end]])`，`value`(必填)：表示填入的固定值，`star, end` 表示数组的下标，不包括 `end` 的下标。
    - 返回值：返回一个填充后的新数组
    - 原有数组：改变
    ``` js
        var a = [1, 12, 34, 56, 78]
        var b = a.fill(0, 0, 3) //  [0, 0, 0, 56, 78]
    ```

* `filter` 高频
  - 作用：遍历数组，根据条件是 `true` 的话就留下，false 就剔除。
  - 参数：`filter(callback(element, index, array), thisArg)`，`element` 表示当前处理的一项，数组中的每一个元素都调用一次 `callback`，`thisArg` 表示回调函数的`this` 指向。
  - 返回值：返回一个满足条件的新数组
  - 原数组：不变
  ``` js
    var a = [1, 12, 34, 56, 78]
    let newArr =  a.filter((element)=> {
        return element < 34 === true ? false : true
    })
    console.log(newArr) // [34, 56, 78]
  ```

* `map` 高频
  - 作用：循环数组中的每一个元素，每一个元素都执行一遍回调函数，执行后将新元素返回
  - 参数：`map(callback(element, index, array), thisArg)`，`element` 表示当前处理的一项，数组中的每一个元素都调用一次 `callback`，`thisArg` 表示回调函数的`this` 指向。
  - 返回值：返回一个执行后的新数组
  - 原数组：不变
    ``` js
        const arr = [0, 2, 4, 6, 8,10]
        let newArr =  arr.map(value => {
            return ++value
        })
        console.log(newArr) // [0, 2, 4, 6, 8, 10]
    ```
* `some` 
  - 作用：循环数组中的每一个元素，每一个元素都执行一遍测试（回调）函数，只要有一项通过就会返回`true`，所有元素都没有通过测试函数的才返回 `false`。
  - 参数：`some(callback(element, index, array), thisArg)`，`element` 表示当前处理的一项，数组中的每一个元素都调用一次 `callback`，`thisArg` 表示回调函数的`this` 指向。
  - 返回值：返回一个执行后 `boolean`。
  - 原数组：不变
    ``` js
        let arr = [12,23,45,43,23]
        let res = arr.some(item => item%2 !==0)
        console.log(res)    // true
    ```
* `every`
  - 作用：`every` 方法为数组中的每个元素执行一次 `callback` 函数，知道找到一个让回调函数返回值是 `false` 的元素，否则最后结果返回`true` 循环结束
  - 参数：`every(callback(element, index, array), thisArg)`，`element` 表示当前处理的一项，数组中的每一个元素都调用一次 `callback`，`thisArg` 表示回调函数的`this` 指向。
  - 返回值：返回一个执行后 `boolean`。
  - 原数组：不变
    ``` js
    function isBigEnough(element, index, array) {
        return element >= 10;
    }
    [12, 5, 8, 130, 44].every(isBigEnough);   // false
    [12, 54, 18, 130, 44].every(isBigEnough); // true
    ```
* `reduce`
  - 作用：




