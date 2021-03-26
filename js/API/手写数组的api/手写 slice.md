## 数组中的 `slice`
    - 作用：复制数组中指定位置的元素，返回复制元素组成的新数组。没有参数可以克隆数组即 `浅复制`，但是引用地址不同。
    - 参数：参数为两个(n, m)或一个或不写。不写参数相当于克隆一份原数组，克隆后的原数组和新数组不相等，地址不同。
    - 返回值：返回从下标 n 开始到下标 m 处(不包括m)组成的新数组
    - 原有数组：不改变

``` js
var a = [12, 23, 34, 100, 200, 300]
var b = a.slice(2,2)    // b ==> [34, 100, 200]，a ==> [12, 23, 34, 100, 200, 300]
var c = a.slice(2)      // c ==> [34, 100, 200, 300]
var d = a.slice()       // d ==> [12, 23, 34, 100, 200, 300]，但是 b!= a，
```
### 手写 slice 
``` js
Array.prototype.mySlice = function(startIndex=0, endIndex){
    let array = this
    let thisArray = []
    endIndex === undefined ? (endIndex=array.length) : null
    for(let i = startIndex; i< endIndex; i++){
        thisArray.push(array[i])
    }
    return thisArray
}
let arr = [1, 3, 5, 6, 7, 23]
let a = arr.mySlice()   // [1, 3, 5, 6, 7, 23]
```
> 测试过没啥问题，我们来稍微优化一下，直接使用 `this`。
``` js
Array.prototype.mySlice = function(startIndex=0, endIndex){
    let thisArray = []
    endIndex === undefined ? (endIndex=this.length) : null
    for(let i = startIndex; i< endIndex; i++){
        thisArray.push(this[i])
    }
    return thisArray
}
```



