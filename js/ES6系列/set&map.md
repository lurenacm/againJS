## set 和 map 两种存储结构

### set 集合
> set 集合是一个对象 object，没有顺序，没有下标。存放的元素都是唯一的，不可以重复，利用这个特性可以做数组的去重操作。
* `new Set()` 的返回值是一个对象具备 `Symbol.iterator` 可以被展开运算符 `...` 展开。
* `.add()`向集合中添加元素
* `.delete()`删除集合中的某一个元素
* 集合是一个对象，所以集合也可以被遍历，`.values(), entry(), .keys()`
``` js

```
#### 交集，并集，差集。
> 实现上面的三个函数之前都需要先去重
* 并集实现
``` js
let arr1 = [1,2,3,4,1,2,3]
let arr2 = [1, 4, 3, 5 ,2, 5, 2]
function union(arr1, arr2){
    let s = [...new Set([...arr1, ...arr2])]
    return s
}
union(arr1, arr2)   // [ 1, 2, 3, 4, 5 ]
```
* 并集实现
``` js
let arr1 = [1,2,3,4,1,2,3]
let arr2 = [1, 4, 3, 5 ,2, 5, 2]

function intersection(arr1, arr2) {
    return [...new Set(arr1)].filter(item => {
        return new Set(arr2).has(item)
    })
}
console.log(intersection(arr1, arr2))
```
* 差集
> 差集需要看是谁减谁，减去公共部分留下的就是差集，比如 `[1, 2, 3,5 ] -[1, 2, 3, 6] => [5]`
``` js
let arr1 = [1,2,3,4,1,2,3]
let arr2 = [1, 4, 3, 5 ,2, 5, 2]

function diff(arr1, arr2) {
    return [...new Set(arr1)].filter(item => {
        return !new Set(arr2).has(item)
    })
}
console.log(diff(arr1, arr2))
```

### map 
> map 和 set 的区别在于 map 具备属性`key`
* map 和 set 一样属性不可以重复
* map 的 key 可以是一个对象`obj`，如果`obj`被删除了，`map` 中 `obj` 的空间还是会存在。
* `weakMap` 中key 必须是一个对象类型。
``` js
let m = new Map()
m.set('name', '1')
m.set('name', 0)
console.log(m)  // Map(1) { 'name' => 0 }
```

### weakMap
> `weakMap` 是弱链接
* `weakMap` 内部的 key 和 value 之间没有引用关系，`map`存在引用关系
* `weakMap` 内部的内存可以被销毁，`map` 中的内存不可以被销毁





