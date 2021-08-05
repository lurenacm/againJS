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

let str = '5 1 2 3 4 5'
let arr = str.split(" ").map(item => {
    return parseInt(item)
})
// console.log(arr)
if (arr[0] !== 0) {
    let sum = 0
    for (let i = 1; i <= arr[0]; i++) {
        console.log(arr[i])
        sum = sum + arr[i]
    }
    console.log(sum)
}








let data = [{
        id: 3,
        val: '3',
        parentId: 1
    },
    {
        id: 2,
        val: '2',
        parentId: 0
    },
    {
        id: 5,
        val: '5',
        parentId: 2
    },
    {
        id: 6,
        val: '6',
        parentId: 2
    },
    {
        id: 4,
        val: '4',
        parentId: 1
    },
    {
        id: 1,
        val: '1',
        parentId: 0
    },
]

function treeish(arr, parent) {
    if (!parent) {
        parent = {
            id: 0,
            val: '0'
        };
    }



    let children =arr.filter(obj =>
        obj.parentId ===parent.id
        );

    children =convert(children)

    parent.
    children =
        children;




    if (
        children.length !==
        0) {




        children.
        forEach(
            child =>
            treeish(
                arr,
                child));




    }




    return
    parent;




}




function
convert(
    children) {




    return
    children.
    map(
        child => {




            delete
            child.
            parentId;




            child.
            children = [];




            return
            child;




        });




}




console.
info(
    treeish(
        data));