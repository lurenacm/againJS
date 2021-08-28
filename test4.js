// // // function shuffle(arr) {
// // //   return function () {
// // //     var arg = arguments[0]
// // //     var res = []
// // //     var random = Math.floor(Math.random() * 10)
// // //     for (var j = 0; j <= arg; j++) {
// // //       for (var i = 0; i < arr.length; i++) {
// // //         arr[i] == random ? res.push(arr[i]) : null
// // //       }
// // //     }
// // //   }
// // //   return res
// // // }

// // function someFunction() {
// //   let a = 0;
// //   function fn () {
// //     return a++;
// //   }
// //   return fn
// // }


// // let f1 = someFunction(); //
// // let f2 = someFunction(); // 
// // console.log(f1()); // 0
// // console.log(f2()); // 0

// // let f = someFunction();
// // console.log(f()); // 0
// // console.log(f()); // 1


// // let arr = [1, 3, 6, 9, 5, 8, 13, 76, 23, 45, 21, 7]
// // function quickSort(arr) {
// //     if (arr.length <= 1) { return arr; }
// //     let left = []
// //     let right = []
// //     // 用第一项排序
// //     let pivot = arr[0]
// //     for (let index = 1; index < arr.length; index++) {
// //         pivot >= arr[index] ? left.push(arr[index]) : right.push(arr[index])
// //     }
// //     return [...quickSort(left), pivot, ...quickSort(right)] 
// // }
// // console.log(quickSort(arr))
// // [1,  3,  5,  6,  7, 8,  9, 13, 21, 23, 45, 76]


// // Function.prototype.bind2 = function (context) {
// //     var self = this;
// //     var args = Array.prototype.slice.call(arguments, 1);
// //     var fNOP = function () {};
// //     var fBound = function () {
// //         var bindArgs = Array.prototype.slice.call(arguments);
// //         return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
// //     }

// //     fNOP.prototype = this.prototype;
// //     fBound.prototype = new fNOP();
// //     return fBound;
// // }

// // // 第三版
// // Function.prototype.bind2 = function (context) {
// //     var self = this;
// //     var args = Array.prototype.slice.call(arguments, 1);

// //     var fBound = function () {
// //         var bindArgs = Array.prototype.slice.call(arguments);
// //         // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
// //         // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，
// //         // 实例会具有 habit 属性

// //         // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
// //         return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
// //     }

// //     // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
// //     fBound.prototype = this.prototype; // new 
// //     return fBound;
// // }


// // Function.prototype.myBind = function (context, ...arg) {
// //     context = context || window
// //     let _this = this

// //     let mF = function() {}
// //     function ctor(...otherArg) {
// //         //判断this的来源是不是 new 关键字的  this  instanceof  ctor 是 true，说明有实例返回，也就是有使用到 new 关键字。
// //         return _this.call(this instanceof mF ? this : context, ...arg.concat(otherArg))
// //     }

// //     mF.prototype = this.prototype
// //     ctor.prototype = new mF()
// //     return ctor
// // }


// // let obj = {
// //     age: 18
// // }
// // var age = 0

// // function fn() {
// //     console.log(this.age)
// // }

// // let f = fn.bind(obj)

// // console.log(new f)

// // let newF = fn.myBind(obj)
// // console.log(new newF)

// // // let f0 = fn.bind(obj)
// // // console.log('f0()', f0())


// // // let newFn =  fn.myBind(obj)
// // // console.log(newFn())

// // Function.prototype.myBind = function (context, ...arg) {
// //     context = context || window
// //     let _this = this
// //     function ctor(...otherArg) {
// //         return _this.call(this instanceof ctor ? this : context, ...arg.concat(otherArg))
// //     }
// //     ctor.prototype  = this.prototype
// //     return ctor
// // }


// class Scheduler {
//     count = 2
//     queue = []
//     run = []

//     add(task) {
//         this.queue.push(task)
//         return this.schedule()
//     }

//     schedule() {
//         if (this.run.length < this.count && this.queue.length) {
//             const task = this.queue.shift()
//             const promise = task().then(() => {
//                 this.run.splice(this.run.indexOf(promise), 1)
//             })
//             this.run.push(promise)
//             return promise
//         } else {
//             return Promise.race(this.run).then(() => this.schedule())
//         }
//     }
// }
// const scheduler = new Scheduler()

// const timeout = (time) => new Promise(resolve => {
//     setTimeout(resolve, time)
// })

// const addTask = (time, order) => {
//     scheduler.add(() => timeout(time)).then(() => console.log(order))
// }

// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')
// // output: 2 3 1 4
// // 一开始，1、2两个任务进入队列
// // 500ms时，2完成，输出2，任务3进队
// // 800ms时，3完成，输出3，任务4进队
// // 1000ms时，1完成，输出1
// // 1200ms时，4完成，输出4

let str = '["bilibili.com", "master@bilibili.com", "test.bilibili@bilibili.com", "test@bilibili.biliil.com", "test.bilibili.com", "test.bili@bili.com"]'
let arr = str.split('[')[1].split(']')[0].split(',')
let ans = []
for(let i= 0; i<arr.length; i++){
    arr[i].includes("@") ? null: ans.push(arr[i])
}
console.log(ans)