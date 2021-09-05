// // // // // // // function shuffle(arr) {
// // // // // // //   return function () {
// // // // // // //     var arg = arguments[0]
// // // // // // //     var res = []
// // // // // // //     var random = Math.floor(Math.random() * 10)
// // // // // // //     for (var j = 0; j <= arg; j++) {
// // // // // // //       for (var i = 0; i < arr.length; i++) {
// // // // // // //         arr[i] == random ? res.push(arr[i]) : null
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }
// // // // // // //   return res
// // // // // // // }

// // // // // // function someFunction() {
// // // // // //   let a = 0;
// // // // // //   function fn () {
// // // // // //     return a++;
// // // // // //   }
// // // // // //   return fn
// // // // // // }


// // // // // // let f1 = someFunction(); //
// // // // // // let f2 = someFunction(); // 
// // // // // // console.log(f1()); // 0
// // // // // // console.log(f2()); // 0

// // // // // // let f = someFunction();
// // // // // // console.log(f()); // 0
// // // // // // console.log(f()); // 1


// // // // // // let arr = [1, 3, 6, 9, 5, 8, 13, 76, 23, 45, 21, 7]
// // // // // // function quickSort(arr) {
// // // // // //     if (arr.length <= 1) { return arr; }
// // // // // //     let left = []
// // // // // //     let right = []
// // // // // //     // 用第一项排序
// // // // // //     let pivot = arr[0]
// // // // // //     for (let index = 1; index < arr.length; index++) {
// // // // // //         pivot >= arr[index] ? left.push(arr[index]) : right.push(arr[index])
// // // // // //     }
// // // // // //     return [...quickSort(left), pivot, ...quickSort(right)] 
// // // // // // }
// // // // // // console.log(quickSort(arr))
// // // // // // [1,  3,  5,  6,  7, 8,  9, 13, 21, 23, 45, 76]


// // // // // // Function.prototype.bind2 = function (context) {
// // // // // //     var self = this;
// // // // // //     var args = Array.prototype.slice.call(arguments, 1);
// // // // // //     var fNOP = function () {};
// // // // // //     var fBound = function () {
// // // // // //         var bindArgs = Array.prototype.slice.call(arguments);
// // // // // //         return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
// // // // // //     }

// // // // // //     fNOP.prototype = this.prototype;
// // // // // //     fBound.prototype = new fNOP();
// // // // // //     return fBound;
// // // // // // }

// // // // // // // 第三版
// // // // // // Function.prototype.bind2 = function (context) {
// // // // // //     var self = this;
// // // // // //     var args = Array.prototype.slice.call(arguments, 1);

// // // // // //     var fBound = function () {
// // // // // //         var bindArgs = Array.prototype.slice.call(arguments);
// // // // // //         // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
// // // // // //         // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，
// // // // // //         // 实例会具有 habit 属性

// // // // // //         // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
// // // // // //         return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
// // // // // //     }

// // // // // //     // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
// // // // // //     fBound.prototype = this.prototype; // new 
// // // // // //     return fBound;
// // // // // // }


// // // // // // Function.prototype.myBind = function (context, ...arg) {
// // // // // //     context = context || window
// // // // // //     let _this = this

// // // // // //     let mF = function() {}
// // // // // //     function ctor(...otherArg) {
// // // // // //         //判断this的来源是不是 new 关键字的  this  instanceof  ctor 是 true，说明有实例返回，也就是有使用到 new 关键字。
// // // // // //         return _this.call(this instanceof mF ? this : context, ...arg.concat(otherArg))
// // // // // //     }

// // // // // //     mF.prototype = this.prototype
// // // // // //     ctor.prototype = new mF()
// // // // // //     return ctor
// // // // // // }


// // // // // // let obj = {
// // // // // //     age: 18
// // // // // // }
// // // // // // var age = 0

// // // // // // function fn() {
// // // // // //     console.log(this.age)
// // // // // // }

// // // // // // let f = fn.bind(obj)

// // // // // // console.log(new f)

// // // // // // let newF = fn.myBind(obj)
// // // // // // console.log(new newF)

// // // // // // // let f0 = fn.bind(obj)
// // // // // // // console.log('f0()', f0())


// // // // // // // let newFn =  fn.myBind(obj)
// // // // // // // console.log(newFn())

// // // // // // Function.prototype.myBind = function (context, ...arg) {
// // // // // //     context = context || window
// // // // // //     let _this = this
// // // // // //     function ctor(...otherArg) {
// // // // // //         return _this.call(this instanceof ctor ? this : context, ...arg.concat(otherArg))
// // // // // //     }
// // // // // //     ctor.prototype  = this.prototype
// // // // // //     return ctor
// // // // // // }


// // // // // class Scheduler {
// // // // //     count = 2
// // // // //     queue = []
// // // // //     run = []

// // // // //     add(task) {
// // // // //         this.queue.push(task)
// // // // //         return this.schedule()
// // // // //     }

// // // // //     schedule() {
// // // // //         if (this.run.length < this.count && this.queue.length) {
// // // // //             const task = this.queue.shift()
// // // // //             const promise = task().then(() => {
// // // // //                 this.run.splice(this.run.indexOf(promise), 1)
// // // // //             })
// // // // //             this.run.push(promise)
// // // // //             return promise
// // // // //         } else {
// // // // //             return Promise.race(this.run).then(() => this.schedule())
// // // // //         }
// // // // //     }
// // // // // }
// // // // // const scheduler = new Scheduler()

// // // // // const timeout = (time) => new Promise(resolve => {
// // // // //     setTimeout(resolve, time)
// // // // // })

// // // // // const addTask = (time, order) => {
// // // // //     scheduler.add(() => timeout(time)).then(() => console.log(order))
// // // // // }

// // // // // addTask(1000, '1')
// // // // // addTask(500, '2')
// // // // // addTask(300, '3')
// // // // // addTask(400, '4')
// // // // // // output: 2 3 1 4
// // // // // // 一开始，1、2两个任务进入队列
// // // // // // 500ms时，2完成，输出2，任务3进队
// // // // // // 800ms时，3完成，输出3，任务4进队
// // // // // // 1000ms时，1完成，输出1
// // // // // // 1200ms时，4完成，输出4

// // // // // let str = '["bilibili.com", "master@bilibili.com", "test.bilibili@bilibili.com", "test@bilibili.biliil.com", "test.bilibili.com", "test.bili@bili.com"]'
// // // // // let arr = str.split('[')[1].split(']')[0].split(',')
// // // // // let ans = []
// // // // // for(let i= 0; i<arr.length; i++){
// // // // //     arr[i].includes("@") ? null: ans.push(arr[i])
// // // // // }
// // // // // console.log(ans)


// // // // // 1、为什么想来有赞，对有赞了解什么
// // // // // 有赞是一家商家服务。有赞微商城、有赞零售、有赞教育、有赞美业、有赞小程序等SaaS软件产品，
// // // // // 帮商家网上开店、社交营销、直播卖货
// // // // // 我的小程序就是借用 有赞开源的小程序去做的。开源的项目很错。
// // // // // 是我理想的公司

// // // // // 2、为什么想来杭州
// // // // // 杭州是一线城市，互联网技术氛围特别不错。
// // // // // 我上一届实验室的两个师兄就是在有赞，一个前端一个后端，按照他们的话。杭州的生活习惯和饮食都和广东这边相近。
// // // // // 一个人可以走得很快，一群人可以走得更远
// // // // // 加上他们极力的推荐让我对杭州，有赞都有很不错的印象。
// // // // // 杭州人才引进补贴好，而且到处都在发展，2022 年杭州亚运会也要来临，这些都是杭州新新活力的特点，
// // // // // 我感觉也是一个不断向上的城市，所以我感觉杭州不错

// // // // // 3、你觉得你有什么优点？
// // // // // 优点：专注，自律，爱分享技术，有社区影响力。
// // // // // 一个小博主。
// // // // // 缺点：公共演讲能力不太好。

// // // // // 4、最有成就的事情，最有挫败的事情
// // // // // 大学吗？目前的话，可能就是自己通过努力开发了
// // // // // 一款垃圾分类的小程序吧。拿到8千多的省级立项。
// // // // // 最挫败的事，可能就是自己在大学里，找到自己喜欢的东西比较晚。
// // // // // 也就是尝试的比较少。





// // // // // function _instanceof(obj, proto) {
// // // // //     let objPro = Object.getPrototypeOf(obj)
// // // // //     let prototype = proto.prototype
// // // // //     while (objPro) {
// // // // //         if (objPro === prototype) {
// // // // //             return true
// // // // //         }
// // // // //         if (objPro === null) {
// // // // //             return false
// // // // //         }
// // // // //         objPro = Object.getPrototypeOf(objPro)
// // // // //     }
// // // // // }

// // // // // console.log(_instanceof({}, Object))
// // // // // console.log(_instanceof([], Array))

// // // // // let info = {
// // // // //     user:{
// // // // //         name:'lin'
// // // // //     }
// // // // // }

// // // // // let {user:name} = info
// // // // // console.log(user)

// // // // // [0,1,1,2,3]

// // // // // function fn(n){
// // // // //     if(n<=2) return n
// // // // //     let dp = [1,2,3]
// // // // //     for (let i = 2; i <= n; i++) {
// // // // //         dp[i] = dp[i-1] + dp[i-2]
// // // // //     }
// // // // //     console.log(dp[n-1])
// // // // // }
// // // // // fn(4)


// // // // var a = 0;
// // // // function Parent() {
// // // //   this.a = 1;
// // // //   return this;
// // // // }

// // // // Parent.a = 2;
// // // // Parent.prototype = {
// // // //   a: 3,
// // // //   setA: function (value) {
// // // //     this.a = value;
// // // //     return this;
// // // //   }
// // // // }

// // // // console.log(new Parent().a); // 1
// // // // console.log(Parent().a); // 1
// // // // console.log(new Parent().setA(4).a); // 4
// // // // console.log(a); // 1
// // // // console.log(Parent().setA(5).a); // TypeError




// // // function fn(s1, s2) {
// // //   if (s1.length !== s2.length) return false
// // //   let arrS1 = s1.split('')
// // //   let arrS2 = s2.split('')
// // //   let len = arrS1.length
// // //   let i = 0
// // //   while (len) {
// // //     if (!arrS2.includes(arrS1[i])) {
// // //       return false
// // //     } else {
// // //       let index = arrS2.indexOf(arrS1[i])
// // //       arrS1.shift()
// // //       len = arrS1.length
// // //       arrS2.splice(index, 1)
// // //     }
// // //     if (len === 0) break
// // //   }
// // //   return len != arrS2.length ? false : true
// // // }

// // // // console.log(fn('aabccegth', 'aabccethg'))


// // // var isAnagram = function (s, t) {
// // //   return s.length == t.length && [...s].sort().join('') === [...t].sort().join('')
// // // };


// // // // function solve(nums) {
// // // //   if (nums.length == 1) return nums[0] + ''
// // // //   let max = ''
// // // //   let l = 0
// // // //   let r = 1
// // // //   let res = []
// // // //   while (l < nums.length) {
// // // //     if (r < nums.length) {
// // // //       max = Math.max(parseInt(max + nums[l] + '' + nums[r]), max)
// // // //       r++;
// // // //       nums[l] = 0
// // // //     }
// // // //     if (r === nums.length) {
// // // //       res.push(max)
// // // //       l++;
// // // //       r = 0;
// // // //       max = ''
// // // //     }
// // // //   }
// // // //   return max + ''
// // // // }
// // // // console.log(solve([2, 20, 23, 4, 8]))

// // // console.log(fn('aabccegth', 'aabccethg'))

// // // function fn(s1, s2) {
// // //   let string1 = s1.sort()
// // //   let string2 = s2.sort()
// // //   return string1 === string2 ? true : false
// // // }


// // let str = '925656565656323777.5'
// // let strArr = str.split('.')
// // let arr = [...strArr[0]].reverse()
// // let ans = []
// // for (let i = 0; i < arr.length; i++) {
// //   ans.push(arr[i])
// //   if (ans.length == 3 || ans.length == 7 || ans.length == 11 || ans.length == 15 || ans.length == 19  ) {
// //     ans.push(',')
// //   }
// // }
// // // ans.reverse()[0] === ',' ? ans.shift() : null
// // console.log(ans.reverse().join('') + '.' + strArr[1])

// // if (str.length === 0) {
// //   return -1
// // }
// // var arr = str.split('')
// // for (var i in arr) {
// //   if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
// //     return i
// //   }
// // }
// // return -1
// // let str = 'google'

// // if (str == '') {
// //   console.log(-1)
// // }
// // else {
// //   var arr = str.split('')
// //   for (let i = 0; i < arr.length; i++) {
// //       if (str.split(arr[i]).length - 1 == 1) {
// //           console.log(str.indexOf(arr[i]))
// //           break
// //       }
// //   }
// // }

// //2: ab ba 
// //3: aab  aba  abb   baa  bab  bba 

// // accaacac
// // cacaacac
// // ccaaca
// let count = 0
// function fn(n, str) {
//   if (n < 2) return
//   let l = 0
//   let r = 1
//   let tmp = ''
//   let strArr = str.split('')
//   while (r <= n) {
//     if (strArr[l] == 'a' && strArr[r] == 'c') {
//       tmp = strArr[l]
//       strArr[l] = strArr[r]
//       strArr[r] = tmp
//       count++
//     }
//     l++
//     r++
//     if (r == n) {
//       break
//     }
//   }
//   let string = strArr.join("")
//   string.includes('ac') ? fn(n, string) : console.log(count)
// }

// let n = 8
// let str = 'accaacac'
// fn(n, str)


// 2: ab ba 
// 3: aab  aba  abb   baa  bab  bba 
// 4: aab  aba  abb   baa  bab  bba 
// aa aaab aabb 2

// ab abaa abab   abbb  abba  4

// function fn(n) {
//   let arr = ['a', 'b']

//   let i = 0
//   while(arr[0] < n){
//     arr[i] + Math.random() * 10
//   }


// }

// console.log(6 % 998244353)
// 18 + 73 + 27

// 3 2 3 1 1
// 1 1 2 3 3 
// 1 2 3

// 14 24 14 22 44 29 33 45 36 48 
// 24 14 22 44 29 33 45 36
// console.log((29 + 33 + 36) / 3)


// function fn(arr) {
//   arr.shift()
//   arr.pop()
//   let l = 0
//   let r = 1
//   let max = -1
//   let ans = [arr[l]]
//   while (l < arr.length) {
//     if (ans.length != 3) {
//       ans.push(arr[r])
//       r++
//     }
//     if (ans.length === 3) {
//       max = Math.max((ans[0] + ans[1] + ans[2]) / 3, max)
//       l = r
//       r++
//       ans = []
//     }
//     if(r>arr.length) {
//       break
//     }
//   }
//   console.log(max)
// }
// fn([14,24 ,14, 22, 44, 29, 33, 45, 36, 48])

// let a = {name:'foo'}
// let b = { age:11}
// let c = {sex:'max'}
// let d = isNaN(Number(12+'3'))
// let e = {
//   name:'yoho',
//   ...(d?Object.assign({name:'bar'},a,b):Object.assign({name:'bar'},a,c))
// }
// console.log(e)


// function fn(str) {
//   let arr = str.split("").sort()
//   console.log(arr)
//   let l = 0
//   let r = 1
//   let max = -1
//   let obj = {}
//   obj[arr[0]] = 1
//   while (r < arr.length) {
//     if (arr[l] == arr[r]) {
//       obj[arr[l]] += 1
//       r++
//     }
//     if (arr[l] != arr[r]) {
//       l = r
//       r++
//       obj[arr[l]] = 1
//     }
//   }
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       max = obj[key] > max ? obj[key] : max
//     }
//   }

//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (max == obj[key]) {
//         return key
//       }
//     }
//   }
// }

// function fn(str) {
//   let arr = str.split("")
//   let obj = arr.reduce((pre, cur) => {
//     cur in pre ? pre[cur]++ : pre[cur] = 1
//     return pre
//   }, {})

//   console.log(obj)
//   let max = -1
//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       max = obj[key] > max ? obj[key] : max
//     }
//   }

//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (max === obj[key]) {
//         console.log(key)
//         break
//       }
//     }
//   }
// }

// fn('aafjgsfradscfssdgwadageeydsw')

