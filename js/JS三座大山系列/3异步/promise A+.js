class Promise {
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

        let reject = err => {s
            let timer = setTimeout(() => {
                if (this.status !== 'pending') {
                    return
                }
                clearTimeout(timer)
                this.status = 'rejected'
                this.statusVal = err
                this.rejectedContainer.forEach(item => { // 执行成功状态下的函数，同时传递返回值
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

module.exports = Promise