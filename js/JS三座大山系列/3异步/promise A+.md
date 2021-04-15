## 实现 Promise A+ 规范。
> 关于 promise 的基础知识和经典面试题，可以看看[面试 | JS 异步编程经典面试题](https://juejin.cn/post/6950785975693869069)

### 一、Promise 基础用法实现。
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
> Promise 实例中需要传入一个立即执行的函数 `executor`，`executor` 函数中还有两个传入的函数`resolve()`，`reject()` 参数。且 `resolve()`，`reject()`中还可以传入一个参数作为返回值。

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
module.exports = {myPromise: Promise}
```
* `resolve()/reject()/then()` 方法行为分析
> 1. `resolve()/reject()` 的执行是异步的，且两者执行后 `Promise` 状态发生改变，`.then()`方法才立即执行。且 `rejected()`中要处理异步报错的行为
> 2. `.then()`方法中可以接受两个回调函数，分别对应执行 `fulfilled/rejected` 状态。
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
__我们来测试一下上面代码__
[打印结果](./img/promiseA+.jpg)
> 能成功打印出我们想要的结果，但是 `promise` 中还能抛出除了 `reject` 函数的错误，明显上面的代码没有做到，下一步引入`try/catch`
``` js
new Promise((re, reject) => {
    throw new Error('23')
}).catch( err => {
    console.log(err)
})
//Error: 23
//   at <anonymous>:2:11
//  at new Promise (<anonymous>)
``` 

### 二、Promise.reject() 管控 executor() 中的报错
* rejected() 异步
> `rejected()` 能够处理 `Promise` 中的异常报错，且获取错误信息。
``` js
try {
    executor(resolve, reject)
} catch(e) {
    reject(e)
}
```

### 三、Promise.then() 的链式调用。
__图解`.then()`行为__
> 1. `.then()` 可以链式调用，原因是每一个`.then()` 的返回值都是一个 `新的 promise 实例`，对于`promise` 的 api 使用原理可以看 [面试 | JS 异步编程经典面试题](https://juejin.cn/post/6950785975693869069)
> 2. **且链式的 `.then()` 是可以接收上一个 `.then()` 中的返回值的。**
> 3. `resolve()/reject()` 返回值中`.then()`如果不处理，则传递到下一个`.then()`中接收。
``` js
Promise.resolve(23).then(null, err = {
    console.log(err)
    return err
}).then(res => {
    console.log(res)
    return res
}, err = {
    console.log(err)
    return err
}).then(res => {
    console.log(res)
})
```
__模拟实现链式调用`.then()`__
``` js
then(onfulfilled, onrejected) {
        // 如果传递的参数不是函数，也就是`.then()` 中不对`resolve()/reject()`的返回值做处理，我们就手动处理，让下一个`.then()` 可以接收的到返回值
        typeof onfulfilled !== 'function'? onfulfilled = res =>  res : null;
        typeof onrejected !== 'function'? onrejected = err => {throw new Error(err.massage)} : null

        // 返回一个新的 Promise 实例
        return new myPromise((resolve, reject) => { 
            // 每一个`.then()` 都接受的到 `resolve()/reject()` 的返回值。
            // 且`.then()`中两个回调函数可能报错所以我们再加一层匿名函数，同时捕捉错误。
            this.fulfilledContainer.push(() => { 
                try {
                    let value = onfulfilled(this.statusVal)
                    // 将上一个 `.then()` 中执行成功的结果返回给下一个`.then()`   
                    resolve(value)              
                } catch (e) {
                    reject(e)
                }

            })
            this.rejectedContainer.push(() => {
                this.rejectedContainer.push(() => { 
                    try {
                        let value = onrejected(this.statusVal)
                        resolve(value)              
                    } catch (e) {
                        reject(e)
                    }
    
                })
            })
        })
    // this.fulfilledContainer.push(onfulfilled)
    // this.rejectedContainer.push(onrejected)
}
```
> 我测试了一下好像行了，但是我们没有考虑到 `let value = onfulfilled(this.statusVal)` 这个值的执行结果可能不是一个新的 `Promise`，啊这，我们继续来修改一下上面的代码，
``` js
this.fulfilledContainer.push(() => { 
    try {
        let value = onfulfilled(this.statusVal)
        // 将上一个 `.then()` 中执行成功的结果返回给下一个`.then()`   
        // resolve()/reject() 需要等then调用完成后执行    
        // value 是当前的 Promise 实例则直接调用`.then()`
        value instanceof myPromise ? value.then(resolve, reject) : resolve(value)   
    } catch (e) {
        reject(e)
    }
}) 
```

### 四、promise.catch()
> 有了上面的 `.then()` 实现`.catch()` 就比较容易了。`.catch()` 就是`.then()`只传第二个参数的简写。
``` js
catch(onrejected){
    this.then(null, onrejected)
}
```

### 五、promise.all()
* 参数是一个数组，且参数中的元素都是 Promise 实例，如果不是就使用 `Promise.resolve()` 先转化成`Promise` 实例
* 每一个 `Promise` 实例都必须要成功才执行`.then()`，否则执行 `.catch()`。
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

