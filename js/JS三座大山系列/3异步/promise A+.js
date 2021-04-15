class myPromise {
    constructor(executor) {
        this.status = 'pending' // 记录状态的变化
        this.statusVal = undefined // 记录 resolve()/reject() 的返回值。
        this.fulfilledContainer = [] // 使用数组，记录执行成功状态下的方法
        this.rejectedContainer = [] // 使用数组，记录执行失败状态下的方法

        let resolve = res => {
            let timer = setTimeout(() => { //  使用定时器管控`resolve/rejected`是异步执行
                if (this.status !== 'pending') {
                    return
                }
                clearTimeout(timer)
                this.status = 'fulfilled'
                this.statusVal = res
                this.fulfilledContainer.forEach(item => { // 将`.then`方法中成功状态下的函数执行。
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
                    item('Error', this.statusVal)
                })
            }, 0)
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onfulfilled, onrejected) {
        typeof onfulfilled !== 'function' ? onfulfilled = res => res : null;
        typeof onrejected !== 'function' ? onrejected = err => {
            throw new Error(err.massage)
        } : null
        // 返回一个新的 Promise 实例
        return new myPromise((resolve, reject) => {
            // 每一个`.then()` 都接受的到 `resolve()/reject()` 的返回值。
            // 且`.then()`中两个回调函数可能报错所以我们再加一层匿名函数，同时捕捉错误。
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

            this.rejectedContainer.push(() => {
                this.rejectedContainer.push(() => {
                    try {
                        let value = onrejected(this.statusVal)
                        value instanceof myPromise ? value.then(resolve, reject) : resolve(value)
                    } catch (e) {
                        reject(e)
                    }

                })
            })
        })
        // this.fulfilledContainer.push(onfulfilled)
        // this.rejectedContainer.push(onrejected)
    }

    catch (onrejected) {
        this.then(null, onrejected)
    }

    static all(promiseAry = []) {
        // 循环遍历每一个 Promise 实例，确定执行的结果
        new myPromise((resolve, reject) => {
            for (let index = 0; index < promiseAry.length; index++) {
                // 确保每一个都执行，且执行的顺序和返回值的顺序一致。
                // count 统计 promise 实例的执行个数，res 存储成功的结果。
                let count = 0, res = [];
                promiseAry[index].then(val => {
                    count ++ ;
                    res[i] = val;
                    count === promiseAry.length ? resolve(res) : null
                }, reject)
           }
        })
    }
}

// module.exports = myPromise

// let p = new myPromise((resolve, reject) => {
//     resolve(10)
// }).then(res => {
//     console.log(res)
//     throw new Error('@')
//     return res + 10
// }, err => {
//     console.log(err)
//     return err + 1
// })

// p.then(res => {
//     console.log(res)
// }, err => {
//     console.log(err)
// })

let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
myPromise.all([p1, p2]).then(res => {
    console.log(res)
})