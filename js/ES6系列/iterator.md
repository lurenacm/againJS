## Iterator 迭代器
> iterator 迭代器是一个规范，是一个接口，任务数据结构只要拥有迭代器规范的，都可以执行遍历的操作。
* 在浏览器中并没有 iterator 这个类的。
* 每一个 iterator 都有一个 `next()` 方法用于遍历数据结构的成员
* iterator 还具备一个对象 `{done:boolean, value:xxx}`。done表示是否遍历完成，value 表示返回的值


### 具备 Iterator 接口迭代器的数据结构
* Array、String、Map、Set、generator对象 等具备 `Symbol.iterator` 接口
* js 中的对象不具备 Symbol.iterator 接口
* for of 只能遍历具备 `Symbol.iterator` 接口的数据解构
``` js
let arr = [1,2,3,4]
for(let item of arr){
    console.log(item)   // 1,2,3,4
}


let str = 'linYY'
for(let item of str){
    console.log(item) // l,i,n,Y,Y
}


let obj = {
    name:'linYY'
}
for(let item of obj){
    console.log(item)   
}
//  obj is not iterable
```
> for of 的内部是按照 `iterator.next` 遍历的。
#### 思考，怎么让对象也可以被 for of 遍历
> 对象没有 `Symbol.iterator` 接口，所以给对象添加上即可。但需要注意的是下需要是 `0,1,2,3...` 开始和具备 `length` 属性
``` js
let obj ={
    0:'林一一',
    1: 18,
    length:2,
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
for(let item of obj){
    console.log(item)
}
```

#### 解剖一下 `Symbol.iterator` 迭代器
* `Symbol.iterator` 其实是一个函数，模拟实现一下就知道，下标是 `0,1,2,3...` 开始和具备 `length` 属性的才可使用`for of`
``` js
class Iterator {
    constructor(assemble) {
        this.assemble = assemble
        this.index = 0
    }

    next() {
        var {assemble, index} = this
        if(index > assemble.length-1) {
            return {
                done:true,
                value: undefined
            }
        }
        return {
            done:false,
            value:assemble[this.index++]
        }
    }
}

let iter = new Iterator([1,2,3])
console.log(iter.next())    // { done: false, value: 1 }
console.log(iter.next())    // { done: false, value: 2 }
console.log(iter.next())    // { done: false, value: 3 }
console.log(iter.next())    // { done: true, value: undefined }
```
* 所以上面的对象也可以这么使用
``` js
var obj = {
    0: '林一一',
    1: 18,
    length: 2,
    // [Symbol.iterator]:Array.prototype[Symbol.iterator]
    [Symbol.iterator]: function () {
        let index = 0;
        let self = this
        return {
            next() {
                if (index > self.length - 1) {
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
}
```

