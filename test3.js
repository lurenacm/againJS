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
        let _this = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(_this, ...arg)
        }, timeout)
    }
}




// 节流 throttle
// function throttle(fn, timeout) {
//     let timer = null
//     return function (...args) {
//         let _this = this
//         // 上一个没有执行结束，下一个不能执行
//         if (timer) return
//         timer = setTimeout(() => {
//             fn.call(_this, ...args)
//             // 执行后清除，给下一个执行
//             timer = null
//         }, timeout)
//     }
// }


function throttle(callback, timeout) {
    let timer = null
    return function (...arg) {
        let _this = this
        if (timer) return
        timer = setTimeout(() => {
            callback.call(_this, ...arg)
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

    if (typeof obj === null) return obj

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



// 
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

// 
Promise.myAll = function (promiseArr) {
    return new Promise((resolve, reject) => {
        let ans = []
        let index = 0
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i].then(res => {
                ans[i] = res
                index++
                index === promiseArr.length?
            })
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
    constructor(){
        this.event = {}
    }

    on(callback, type){
        if(!this.event[type]){
            this.event[type] = [callback]
        }else{
            this.event[type].push(callback)
        }
    }

    off(type, callBack){
        if(!this.event[type]) return
        this.event[type] = this.event[type].filter(item => {
            item !== callBack
        })
    }

    once(type, callBack){
        
    }

    emit(type, ...arg){
        this.event[type] && this.event[type].map(callBack => {
            callBack.call(this, ...arg)
        })
    }
}


// axios
axios.get('url', {
    param:{}
}).then(res => res);


axios.post('apiURL',{
    user: '林一一',
    age: 18
}).then( res=>{
console.log(res);
})
.catch( error=>{
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
    if(xhr.readyState == 4 && xhr.status == 200){   // readyState: ajax 状态，status：http 请求状态
        console.log(xhr.responseText);   //响应主体
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


