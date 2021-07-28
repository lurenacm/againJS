// 发布
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

// 节流 throttle
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


// new 操作符
function _new(ctor, ...args) {
    let obj = {}

    obj.__proto__ = ctor.prototype

    let res = ctor.call(obj, ...args)

    if (res !== null && typeof res == "object") {
        return res
    }

    return obj
}


// instanceof
function _instanceOf(obj, Pro) {
    let example = Object.getPrototypeOf(obj)
    let ProPrototype = Pro.prototype
    while (true) {
        if (example === ProPrototype) {
            return true
        }
        if (example === null) {
            return false
        }
        example = Object.getPrototypeOf(obj)
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

function deepClone(obj, cache = new Set()) {
    if (cache.has(obj)) return obj
    cache.add(obj)
    if (obj == undefined) return obj

    if (obj instanceof Date) return new Date(obj)

    if (obj instanceof RegExp) return new RegExp(obj)

    if (typeof obj !== "object") return obj
    let cloneObj = new obj.constructor
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache)
        }
    }
    return cloneObj
}

deepClone(obj)