// 防抖
function debounce(fn, timeout) {
    let timer = null
    return function (...args) {
        // 通过 this 获取调用el元素对象
        let _this = this
        // 再次点击时，取消上一次的执行函数，重新开始。
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(_this, ...args)
        }, timeout)
    }
}

function debounce(callback, timeout) {
    let timer = null
    return function (...arg) {
        clearTimeout(timer)
        let _this = this
        timer = setTimeout(() => {
            callback.apply(_this, arg)
        }, timeout)
    }
}

//节流 throttle
function throttle(fn, timeout) {
    let timer = null
    return function (...args) {
        let _this = this
        // 上一个没有执行结束，下一个不能执行
        if (timer) return
        timer = setTimeout(() => {
            fn.call(_this, ...args)
            // 执行后清除，给下一个执行
            timer = null
        }, timeout)
    }
}

function throttle(callback, timeout) {
    let timer = null
    return function (...arg) {
        if (timer) return
        let _this = this
        timer = setTimeout(() => {
            callback.apply(_this, arg)
            timer = null
        }, timeout)
    }
}



// // new 操作符
// function _new(ctor, ...params) {
//     // 创建一个堆内存地址，继承原型上的共有属性
//     let obj = {}
//     obj.__proto__ = ctor.prototype

//     // 确定 this 指向堆内存地址，同时使用 call 将构造函数的私有属性指向到 obj 实例中，实现私有属性继承
//     let res = ctor.call(obj, ...params)

//     // 返回创建的实例，考虑到构造函数本身执行后返回值是对象的话会覆盖返回的实例，需要先判断
//     if(res !== null && typeof res === 'object') return res
//     return obj
// }


function _new(ctor, ...arg) {
    let obj = {}

    obj.__proto__ = ctor.prototype

    let res = ctor.call(obj, ...arg)

    if (typeof res == 'object' && res !== null) return res

    return obj
}




// instanceof
// function _instanceOf(obj, Pro) {
//     let example = Object.getPrototypeOf(obj)
//     let ProPrototype = Pro.prototype
//     while (true) {
//         if (example === ProPrototype) {
//             return true
//         }
//         if (example === null) {
//             return false
//         }
//         example = Object.getPrototypeOf(obj)
//     }
// }
// console.log(_instanceOf())

function _instanceof(obj, cla) {
    let pro = Object.getPrototypeOf(obj);
    let claProto = cla.prototype
    while (pro) {
        if (pro == claProto) {
            return true
        }
        if (pro == null) {
            return false
        }
        pro = Object.getPrototypeOf(pro)
    }
}

function _instanceof(obj, cla) {
    let objPro = Object.getPrototypeOf(obj)
    let claPro = cla.prototype
    while (objPro) {
        if (objPro == claPro) {
            return true
        }
        if (objPro == null) {
            return false
        }
        objPro = Object.getPrototypeOf(objPro)
    }
}


// 深拷贝
let obj = {
    name: 'lin',
    a: {
        s: 1
    },
    arr: [1, 3, 4],
}

// function deepClone(obj, cache = new Set()) {
//     if (cache.has(obj)) return obj
//     cache.add(obj)
//     if (obj == undefined) return obj

//     if (obj instanceof Date) return new Date(obj)

//     if (obj instanceof RegExp) return new RegExp(obj)

//     if (typeof obj !== "object") return obj
//     // 数组或对象等
//     let cloneObj = new obj.constructor
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             cloneObj[key] = deepClone(obj[key], cache)
//         }
//     }
//     return cloneObj
// }

// deepClone(obj)

function deepClone(obj, cache = new Set()) {
    if (cache.has(obj)) return

    cache.add(obj)

    if (typeof obj == null) return obj

    if (obj instanceof Date) return new Date(obj)

    if (obj instanceof RegExp) return new RegExp(obj)

    if (typeof obj !== 'object') return obj

    let cloneObj = new obj.constructor

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(bj[key], cache)
        }
    }
    return cloneObj
}



function deepClone(obj, cache = new Set()) {
    if (cache.has(obj)) return
    cache.add(obj)

    if (typeof obj == null) return obj
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Date) return new Date(obj)
    if (typeof obj !== 'object') return obj
    let cloneObj = new obj.constructor
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache)
        }
    }
    return cloneObj
}

function deepClone(obj, cache = new Set()) {
    if (cache.has(obj)) return
    cache.add(obj)

    if (typeof obj == null) return obj
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Date) return new Date(obj)
    if (typeof obj !== 'object') return obj
    let cloneObj = new obj.constructor
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache)
        }
    }
    return cloneObj
}

// Function.prototype.myCall = function (context, ...args) {
//     context = context || window
//     // 这里的 this 是指向 fn 的，通过 this 就可以获取 fn，context 是我们的 obj，可以直接给 obj 添加一个函数属性
//     context.fn = this
//     delete context.fn(...args)
//     return
// }


Function.prototype.myCall = function (context, ...arg) {
    context = context || window
    context.fn = this

    context.fn(...arg)
    delete context.fn
    return
}



Function.prototype.myApply = function (context, args) {
    context = context || window
    context.fn = this
    delete context.fn(args)
    return
}



Function.prototype.myBind = function myBind(context, ...arg) {
    var _this = this // 获取调用 myBind 的函数主体
    return (...otherArg) => { // 返回的新函数，是调用 myBind 函数的拷贝
        _this.call(context, ...arg.concat(...otherArg)) // 利用 apply 原理，改变 this 指向，同时执行返回的新函数。
    }
}


Function.prototype.myBind = function (context, ...arg) {
    context = context || window
    let _this = this
    return (...otherArg) => {
        _this.call(context, ...otherArg.concat(...arg))
    }
}



// 
Promise.myAll = function (promiseArr) {
    return new Promise((resolve, reject) => {
        let ans = []
        let index = 0
        for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(res => {
                ans[i] = res
                index++
                index === promiseArr.length ? resolve(ans) : null
            }).catch(err => reject(err))
        }
    })
}

Promise.all = function (promiseArr) {
    return new Promise((resole, reject) => {
        let ans = []
        let count = 0
        for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(res => {
                ans.push(res)
                count++
                count === ans.length ? resole(ans) : null
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


class EventEmitter {
    constructor() {
        this.event = {}
    }

    on(callback, type) {
        if (!this.event[type]) {
            this.event[type] = [callback]
        } else {
            this.event[type].push(callback)
        }
    }

    off(type, callBack) {
        if (!this.event[type]) return
        this.event[type] = this.event[type].filter(item => {
            item !== callBack
        })
    }

    once(type, callBack) {

    }

    emit(type, ...arg) {
        this.event[type] && this.event[type].map(callBack => {
            callBack.call(this, ...arg)
        })
    }
}


// axios
axios.get('url', {
    param: {}
}).then(res => res);


axios.post('apiURL', {
        user: '林一一',
        age: 18
    }).then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error)
    })

// ajax
// 1. 创建 XMLHttpRequest 实例
let xhr = XMLHttpRequest()
// 2. 打开和服务器的连接
xhr.open('get', 'URL', true) // 默认 true 异步， false 同步
// 3.发送
xhr.send()
// 4. 接收变化。
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) { // readyState: ajax 状态，status：http 请求状态
        console.log(xhr.responseText); //响应主体
    }
}


let arr = [1, 2, 3, 2, 1, 4, 3, 1, 45]
let res = arr.map(item => {
    return item
})



function myMap(callback) {

}


let userList = [{
        name: 'jack',
        age: 19
    },
    {
        name: 'yuh',
        age: 20
    },
    {
        name: 'lmi',
        age: 20
    },
]

// 输出
let userList1 = [{
        name: 'jack',
        age: 19,
        index: 0
    },
    {
        name: 'yuh',
        age: 20,
        index: 1
    },
    {
        name: 'lmi',
        age: 20,
        index: 2
    },
]

userList.map()


while (str = readline()) {
    let arr = str.split(" ").map(item => {
        return parseInt(item)
    })

    // 结束运行
    break
}


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

    on(type, callback) {
        if (!this.events[type]) {
            this.events[type] = [callback]
        } else {
            this.events[type].push(callback)
        }
    }

    // 删除订阅
    off(type, callBack) {
        if (!this.events[type]) return;
        this.events[type] = this.events[type].filter((item) => {
            return item !== callBack;
        });
    }

    off(type, callback){
        if(!this.events[type]) return;
        this.events[type] = this.events[type].filter(item => {
            item !== callback
        })
    }


    // 只订阅一次事件
    once(type, callBack) {
        function fn() {
            callBack();
            this.off(type, fn);
        }
        this.on(type, fn);
    }

    once(type, callback){
        function fn(){
            callback();
            this.off(type, fn)
        }
        this.on(type, fn)
    }

    // 触发事件
    emit(type, ...rest) {
        this.events[type] &&
            this.events[type].forEach((fn) => fn.apply(this, rest));
    }

    emit(type, ...rest){
        this.events[type] && this.events[type].forEach(callback => callback.apply(this, rest))
    }
}

// 使用如下
const event = new EventEmitter();

const handle = (...rest) => {
    console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
    console.log(123456);
});

class EventEmitter {
    constructor() {
        this.event = {}
    }

    on(type, callback) {
        if (!this.event[type]) {
            this.event[type] = [callback]
        } else {
            this.event[type].push(callback)
        }
    }

    off(type, callback) {
        if (!this.event[type]) return
        this.event[type] = this.event[type].filter(item => {
            return item !== callback
        })
    }

    once(type, callback) {
        function fn() {
            callback()
            this.off(type, fn)
        }
        this.on(type, fn)
    }


    emit(type, ...arg) {
        this.event[type] && this.event[type].map(callback => callback.call(this, ...arg))
    }
}

function floorOrder(root) {
    let queue = []
    queue.push(root)
    while (queue.length) {
        let q = queue.shift()
        console.log(q.val)
        if (q.left) {
            queue.push(q.left)
        }

        if (q.right) {
            queue.push(q.right)
        }
    }
}


function floorOrder(root) {
    if (!root) {
        return false
    } //若根节点为空，则停止
    let queue = [] //初始化队列
    queue.push(root) //根节点入队
    while (queue.length) { //若队列不为空，循环体继续
        let p = queue.shift() //取队首结点赋给p，注意，出队后现在队列长度已减小1了
        console.log(p.val)
        if (p.left) { //若p的左节点不为空，则入队
            queue.push(p.left)
        }
        if (p.right) { //若p的右节点不为空，则入队
            queue.push(p.right)
        }
    }
}

class Scheduler {
    concurrency = 2
    running = 0
    queue = []

    add(task) {
        return new Promise(resolve => {
            this.queue.push({
                taskGenerator: task,
                resolve
            })
            this.schedule()
        })
    }

    schedule() {
        while (this.queue.length > 0 && this.running < this.concurrency) {
            const curTask = this.queue.shift()
            this.running += 1
            curTask.taskGenerator().then(result => {
                this.running -= 1
                curTask.resolve(result)
                this.schedule()
            })
        }
    }
}


// 完善代码中Scheduler类，使得以下程序能正确输出
class Scheduler {
    constructor() {
        let res = []
    }
    add(promiseCreator) {}
}
const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4


new Promise((resolve, reject) => {
    console.log('B');
    resolve(); // 1
}).then(() => { // 第一个 then 
    console.log('C')
    new Promise((resolve, reject) => {
        resolve() // 2 
    }).then(() => {
        console.log('D')
    }).then(() => { // 3
        console.log('E')
    })
}).then(() => { // 第二个 then 加入
    console.log('F')
});

// 1 处 resolve(); 是一个微任务先进去队列，由于后面没有同步代码，所以 resolve() 先执行，此时队列为空
// 第一个 then  先执行 输出 C 。
// 2处 resolve() 也是一个微任务放入到微任务队列中 。第一个 then 执行结束，加入第二 then 到队列中
// 队列中的 resolve() 执行时 输出 D，3 处的 then 是异步的加入到队列中，
// 执行 第二个 then 的代码输出 F，最后执行队列中的最后一个 then 输出 E


// B G C F  D  E A
// B G C D  F  E A