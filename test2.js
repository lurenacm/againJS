// let arr = [6, 3, 1, 9, 5, 8, 13, 76, 23, 45, 21, 7]

// function insertSort(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         while(arr[i] < arr[i-1]){
//             [arr[i], arr[i-1]] = [arr[i-1], arr[i]]
//             i--
//         }
//     }
//     return arr
// }

// console.log(insertSort(arr)) 
// //[1, 3, 5, 6, 7, 8, 9, 13, 21, 23, 45, 76]

var longestCommonSubsequence = function (text1, text2) {
    let q = []
    for (let index = 0; index < text1.length; index++) {
        text2.includes(text1[index]) ? q.push(text1[index]) : null
    }
    console.log(q)
    return q.length
};

let res = longestCommonSubsequence('abcdefg', 'abdeg12edhyim')
console.log(res)


Promise.myAll = function (promiseArr) {
    return new Promise((resolve, reject) => {
        const ans = [];
        let index = 0;
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i]
                .then(res => {
                    ans[i] = res;
                    index++;
                    if (index === promiseArr.length) {
                        resolve(ans);
                    }
                })
                .catch(err => reject(err));
        }
    })
}


Promise.myAll = function (promiseArr) {
    return new Promise((resolve, reject) => {
        let ans = []
        let index = 0
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(res => {
                ans[i] = res;
                index++;
                if (index === promiseArr.length) {
                    resolve(ans)
                }
            }).catch(err => reject(err))
        }
    })
}

Promise.race = function (promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(p => {
            // 如果不是Promise实例需要转化为Promise实例
            Promise.resolve(p).then(
                val => resolve(val),
                err => reject(err),
            )
        })
    })
}

// 1. 返回一个 promise 实例，2.需要参数的所有promise执行成功才结束，返回值是一个数组，3. 失败直接返回结果
Promise.myAll = function (promiseArr) {
    return new Promise((resolve, reject) => {
        let ans = []
        let index = 0
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(res => {
                ans[i] = res
                index++
                if (promiseArr.length === index) {
                    resolve(ans)
                }
            }).catch(err => reject(err))
        }
    })
}


Promise.myAll = function (promiseArr) {
    return new Promise((resolve, reject) => {
        let i = 0
        let ans = []
        for (let index = 0; index < promiseArr.length; index++) {
            promiseArr[index].then(res => {
                ans[i] = res
                i++
                if (i === promiseArr.length) {
                    resolve(ans)
                }
            }).cache(err => resolve(err))
        }
    })
}


Promise.myRace = function (promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(p => {
            Promise.resolve(p).then(
                val => resolve(val),
                err => reject(err)
            )
        })
    })
}


class EventEmitter {
    constructor() {
        this.cache = {}
    }
    on(name, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }
    off(name, fn) {
        let tasks = this.cache[name]
        if (tasks) {
            const index = tasks.findIndex(f => f === fn || f.callback === fn)
            if (index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }
    emit(name, once = false, ...args) {
        if (this.cache[name]) {
            // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
            let tasks = this.cache[name].slice()
            for (let fn of tasks) {
                fn(...args)
            }
            if (once) {
                delete this.cache[name]
            }
        }
    }
}

// 测试
let eventBus = new EventEmitter()
let fn1 = function (name, age) {
    console.log(`${name} ${age}`)
}
let fn2 = function (name, age) {
    console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
// '布兰 12'
// 'hello, 布兰 12'

class EventEmitter {
    constructor() {
        this.events = {};
    }
    // 实现订阅
    on(type, callBack) {
        if (!this.events[type]) {
            this.events[type] = [callBack];
        } else {
            this.events[type].push(callBack);
        }
    }
    // 删除订阅
    off(type, callBack) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter((item) => {
            return item !== callBack;
        });
    }
    // 只执行一次订阅事件
    once(type, callBack) {
        function fn() {
            callBack();
            this.off(type, fn);
        }
        this.on(type, fn);
    }
    // 触发事件
    emit(type, ...rest) {
        this.events[type] &&
            this.events[type].forEach((fn) => fn.apply(this, rest));
    }
}

// 使用如下
// const event = new EventEmitter();

// const handle = (...rest) => {
//   console.log(rest);
// };

// event.on("click", handle);

// event.emit("click", 1, 2, 3, 4);

// event.off("click", handle);

// event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
// event.emit("dbClick");
// event.emit("dbClick");

class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(type, fn) {
        if (!this.events[type]) {
            this.events[type] = [fn]
        } else {
            this.events[type].push(fn)
        }
    }

    off(type, fn) {
        if (!this.events[type]) return
       this.events[type] = this.events[type].filter(e => {
            return e !== fn
        })
    }

    emit(type, ...args) {
        this.events[type] && this.events[type].forEach(e => e.call(this, ...args))
    }
}

