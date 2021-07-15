const option = {
    url: '',
    methods: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        name: '林一一',
        age: 18,
        person: {
            sex: 'man'
        }
    },
    arr: [12, 34]
}

let param = {
    url: 'https://www.baidu.com/',
    arr: [10, 23],
    headers: {
        'self': 'aa'
    },
    data: {
        person: {
            action: 'keep move~'
        }
    }
}

function merge(obj, targeObj) {
    if (obj.constructor !== Object || targeObj.constructor !== Object) {
        return
    }
    for (let key in targeObj) {
        if (obj[key].constructor === Object && targeObj[key].constructor === Object) {
            obj[key] = merge(obj[key], targeObj[key])
            continue
        }
        obj[key] = targeObj[key]
    }
    return obj
}
let res = merge(option, param)
console.log(res)



function debounce(callback, timeout) {
    let timer = null
    let context = this
    let res = null
    return function (...arg) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(context, ...arg)
        }, timeout)
    }
}
box.onclick = debounce(callback, timeout)

function throttle(callback, timeout) {
    var timer
    return function (...arg) {
        let context = this
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                callback.call(context, ...arg)
            }, timeout)
        }
    }
}
box.onmousemove = throttle(callback, timeout)




function Parent() {
    this.name = 'parent'
}

Parent.prototype.getParentName = function () {
    console.log('Parent')
}

function Child() {
    this.name = '一一'
    var name = '二二'
    Parent.call(this)
}

Child.prototype.__proto__ = Parent.prototype

Child.prototype.getChildName = function () {
    console.log('Child')
}

var c1 = new Child()
console.log(c1.getParentName)
Parent.prototype.getParentName = '林'
console.log(c1.getParentName)

// 发布订阅
class myEventBus {
    constructor(props) {
        this.events = {}
    }
    on(event, fn) {
        const events = this.events
        events[event] ? events[event].push(fn) : (events[event] = [fn])
    }
    emit(event, ...res) {
        this.events[event] && this.events[event].forEach(fn => {
            return fn.apply(this, res)
        })
    }
    remove(event, fn) {
        if (this.events[event]) {
            delete this.events[event]
        }
    }
}

[1, 1, 2, 3, 5, 8, 13]
// i = 1, res = 1 q = [1,1,2]
// 

function getF(count) {
    if (count <= 1) return 1
    let q = [1, 1]
    let i = count
    while (i>0) {
        let a = q[q.length - 2]
        let b = q[q.length - 1]
        q.push(a + b)
        i--
    }
    return q.indexOf(count) -1
}
console.log(getF(2))