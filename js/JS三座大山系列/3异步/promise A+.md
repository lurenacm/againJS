## 实现 Promise A+ 规范。
> 关于 promise 的基础知识和经典面试题，可以看看[面试 | 你不得不懂的 JS 异步编程 | Promise 篇]()

### 一、Promise 基础用法分析。
``` js
let promise = new Promise((resolve, reject) => {
    resolve(100)
    // reject(200)
}).then((res) => {

},(err) => {

})
```
* 状态分析
> Promise 有三个状态，分别是：`pending`，`fulfilled`, `rejected` 
* 参数分析
> Promise 实例中需要传入一个立即执行的函数`executor`，`executor` 函数中还有两个传入的函数`resolve()`，`reject()`参数。且`resolve()`，`reject()`中还可以传入一个参数。

__根据上面的分析实现如下__
``` js
class Promise {
    constructor(executor){
        this.status = 'pending' // 记录状态的变化
        this.statusVal = undefined  // 记录 resolve()/reject() 的返回值。

        let resolve = res => {
            if(this.status !== 'pending'){
                return
            }
            this.status = 'fulfilled'
            this.statusVal = res
        }

        let reject = err => {
            if(this.status !== 'pending'){
                return
            }
            this.status = 'rejected'
            this.statusVal = err
        }
        executor(resolve, reject)
    }
}
```

### 二、Promise.then() 的链式调用。
``` js
promise.then(() => {},() => {})
    .then(() => {}, () => {})
    .then()
    .then()
```
* 方法行为分析
 
__图解方法行为__

> 1. `resolve()/reject()`的执行是异步的，且两者执行后 `Promise` 状态发生改变，`.then()`方法才立即执行。且`rejected()`中要处理异步报错的行为
> 2. `.then()`方法中可以接受两个回调函数，分别对应执行 `fulfilled/rejected` 状态。
> 3. `.then()` 可以链式调用，**且链式的 `.then()` 是一起执行的。**
``` js
class Promise {
    constructor(executor) {
        this.status = 'pending' // 记录状态的变化
        this.statusVal = undefined // 记录 resolve()/reject() 的返回值。
        this.fulfilledContainer = [] // 使用数组，记录执行成功状态下的方法
        this.rejectedContainer = [] // 使用数组，记录执行失败状态下的方法

        let resolve = res => {
            let timer = setTimeout(() => { //  使用定时器管控`resolve/rejected`异步执行
                if (this.status !== 'pending') {
                    return
                }
                clearTimeout(timer)
                this.status = 'fulfilled'
                this.statusVal = res
                this.fulfilledContainer.forEach(item => {  // 执行成功状态下的函数，同时传递返回值
                    item(this.statusVal)
                })
            }, 0)
        }

        let reject = err => {
            let timer = setTimeout(() => {
                if (this.status !== 'pending') {
                    return
                }
                clearTimeout(timer)
                this.status = 'rejected'
                this.statusVal = err
                this.rejectedContainer.forEach(item => { 
                    item(this.statusVal)
                })
            }, 0)
        }
        executor(resolve, reject)
    }

    then(onfulfilled, onrejected) {
        this.fulfilledContainer.push(onfulfilled)
        this.rejectedContainer.push(onrejected)
    }
}
```

### 管控 Promise.reject() 中的报错
* rejected()
> `rejected()` 能够处理 `Promise` 中的异常报错，且获取错误信息。
``` js

```


# 面试题
### 某跳动面试题 | 模拟实现一个 Promise.finally
``` js
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    );
};
```

### 设计并实现 Promise.race()
``` js
Promise._race = promises => new Promise((resolve, reject) => {
    promises.forEach(promise => {
        promise.then(resolve, reject)
    })
})
Promise.myrace = function (iterator) {
    return new Promise((resolve, reject) => {
        try {
            let it = iterator[Symbol.iterator]();
            while (true) {
                let res = it.next();
                console.log(res);
                if (res.done) break;
                if (res.value instanceof Promise) {
                    res.value.then(resolve, reject);
                } else {
                    resolve(res.value)
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
```

