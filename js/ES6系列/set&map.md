## set 和 map 两种数据结构

### set 集合数据结构
> set 集合是一个没有重复元素的集合，是一个对象 object。且没有下标，没有 `.length` 属性不是类数组
* `Set()` 本身是一个构造函数。可以使用 数组这样的数据解构来创建一个 set 集合的数据结构
``` js
let set = new Set()
typeof set  // "object"
```
* `Set()` 构造函数的参数必须是一个具备 iterator 接口的参数，比如字符串、数组
``` js
let set = new Set('abcdegf')
console.log(set)
// Set(7) {"a", "b", "c", "d", "e", …}

let set = new Set([1,2,3,4,5,6,7,1])
console.log(set)
// Set(7) {1, 2, 3, 4, 5, …}
```




### set 基本用法
* Set 集合不具备.length 属性，但是具备 `.size` 也可以放回集合元素的数量
* `.has(val)` 判断集合中是否有 val 这个值，有就 true，没有就false
* `.add(val)`向集合中添加元素
* `.delete(val)` 删除集合中的某一个元素
* `clear()` 删除集合中的所有元素
* 集合是一个对象，所以集合也可以被遍历，`.values(), entry(), .keys()`
* 同时 Set 实例的集合具备`Symbol.iterator` 接口所以可以被` for of` 循环遍历
* `new Set()` 的返回值是一个对象具备 `Symbol.iterator` 可以被展开运算符 `...` 展开。
``` js
let s = new Set()
[1,2,3,2,1,2,3,4,5].forEach(item => s.add(item))

for(const key of s){
    console.log(key)
}
// 1,2,3,4,5
```

### Set 集合结构中 键就是值，值就是键
* Set 的集合中存储的方式是一种 值值 结构存储的，没有下标是一个对象。
``` js
let set = new Set()
[1,2,3,4,'a', 'b', 'c', 'd'].forEach({
    set.add(item)
})

set.forEach((value, index) => {
    console.log(index, value)
})

// 1 1
// 2 2
// 3 3
// 4 4
// a a
// b b
// c c
// d d
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
* 交集实现
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


### Map 字典的数据解构
> map 和 set 的区别在于 map 具备属性 `key`，是一种键值的数据结构存储，主要用于存储数据的。
* map 也是一个对象，和传统的 Object 对象也是一个键值对的 hash 结构，但是差别在于传统意义上的 object 对象的键只能是一个字符串或symbol，但是 map 对象的键不止可以是一个字符串，还可以是一个 对象。
* map 是一种更加完善的 hash 结构。
``` js
let m = new Map()
let obj = {name:'林一一'}
m.set(obj, '二二')
console.log(m)
```

### Map 与数组的关系
* Map 构造函数的参数可以传入一个二维的数组，[[key, value], [key, value]]
``` js
let m1 = new Map([['name', '林一一'], ['age', 18]])
// Map(2) {"name" => "林一一", "age" => 18}

Array.from(m1)
// [['name', '林一一'], ['age', 18]]
```




### map 的常用方法
* size 返回字典元素的个数，字典中元素也不可以重复
* `set(key, val)` 设置键值对
* `get(key)` 根据键名查找 value 值
* `has(key)` 判断 key 是否存在
* `delete(key)` 删除某一个键
* `clear()` 清除所有的值
``` js
let map = new Map()
map.set('name', '林一一')
map.set('age', 18)
```
[map](./others/img/map.jpg)

### map 的遍历方法
> msp 和对象一样具备通用的遍历方法
* keys(), values(), forEach()




* map 和 set 一样属性不可以重复
* map 的 key 可以是一个对象 `obj`，如果 `obj` 被删除了，`map` 中 `obj` 的空间还是会存在。
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





