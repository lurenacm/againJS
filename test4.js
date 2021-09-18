// // // // // // // // // // // // // // function shuffle(arr) {
// // // // // // // // // // // // // //   return function () {
// // // // // // // // // // // // // //     var arg = arguments[0]
// // // // // // // // // // // // // //     var res = []
// // // // // // // // // // // // // //     var random = Math.floor(Math.random() * 10)
// // // // // // // // // // // // // //     for (var j = 0; j <= arg; j++) {
// // // // // // // // // // // // // //       for (var i = 0; i < arr.length; i++) {
// // // // // // // // // // // // // //         arr[i] == random ? res.push(arr[i]) : null
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // //   return res
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // function someFunction() {
// // // // // // // // // // // // //   let a = 0;
// // // // // // // // // // // // //   function fn () {
// // // // // // // // // // // // //     return a++;
// // // // // // // // // // // // //   }
// // // // // // // // // // // // //   return fn
// // // // // // // // // // // // // }


// // // // // // // // // // // // // let f1 = someFunction(); //
// // // // // // // // // // // // // let f2 = someFunction(); // 
// // // // // // // // // // // // // console.log(f1()); // 0
// // // // // // // // // // // // // console.log(f2()); // 0

// // // // // // // // // // // // // let f = someFunction();
// // // // // // // // // // // // // console.log(f()); // 0
// // // // // // // // // // // // // console.log(f()); // 1


// // // // // // // // // // // // // let arr = [1, 3, 6, 9, 5, 8, 13, 76, 23, 45, 21, 7]
// // // // // // // // // // // // // function quickSort(arr) {
// // // // // // // // // // // // //     if (arr.length <= 1) { return arr; }
// // // // // // // // // // // // //     let left = []
// // // // // // // // // // // // //     let right = []
// // // // // // // // // // // // //     // 用第一项排序
// // // // // // // // // // // // //     let pivot = arr[0]
// // // // // // // // // // // // //     for (let index = 1; index < arr.length; index++) {
// // // // // // // // // // // // //         pivot >= arr[index] ? left.push(arr[index]) : right.push(arr[index])
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     return [...quickSort(left), pivot, ...quickSort(right)] 
// // // // // // // // // // // // // }
// // // // // // // // // // // // // console.log(quickSort(arr))
// // // // // // // // // // // // // [1,  3,  5,  6,  7, 8,  9, 13, 21, 23, 45, 76]


// // // // // // // // // // // // // Function.prototype.bind2 = function (context) {
// // // // // // // // // // // // //     var self = this;
// // // // // // // // // // // // //     var args = Array.prototype.slice.call(arguments, 1);
// // // // // // // // // // // // //     var fNOP = function () {};
// // // // // // // // // // // // //     var fBound = function () {
// // // // // // // // // // // // //         var bindArgs = Array.prototype.slice.call(arguments);
// // // // // // // // // // // // //         return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     fNOP.prototype = this.prototype;
// // // // // // // // // // // // //     fBound.prototype = new fNOP();
// // // // // // // // // // // // //     return fBound;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // 第三版
// // // // // // // // // // // // // Function.prototype.bind2 = function (context) {
// // // // // // // // // // // // //     var self = this;
// // // // // // // // // // // // //     var args = Array.prototype.slice.call(arguments, 1);

// // // // // // // // // // // // //     var fBound = function () {
// // // // // // // // // // // // //         var bindArgs = Array.prototype.slice.call(arguments);
// // // // // // // // // // // // //         // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
// // // // // // // // // // // // //         // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，
// // // // // // // // // // // // //         // 实例会具有 habit 属性

// // // // // // // // // // // // //         // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
// // // // // // // // // // // // //         return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
// // // // // // // // // // // // //     fBound.prototype = this.prototype; // new 
// // // // // // // // // // // // //     return fBound;
// // // // // // // // // // // // // }


// // // // // // // // // // // // // Function.prototype.myBind = function (context, ...arg) {
// // // // // // // // // // // // //     context = context || window
// // // // // // // // // // // // //     let _this = this

// // // // // // // // // // // // //     let mF = function() {}
// // // // // // // // // // // // //     function ctor(...otherArg) {
// // // // // // // // // // // // //         //判断this的来源是不是 new 关键字的  this  instanceof  ctor 是 true，说明有实例返回，也就是有使用到 new 关键字。
// // // // // // // // // // // // //         return _this.call(this instanceof mF ? this : context, ...arg.concat(otherArg))
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     mF.prototype = this.prototype
// // // // // // // // // // // // //     ctor.prototype = new mF()
// // // // // // // // // // // // //     return ctor
// // // // // // // // // // // // // }


// // // // // // // // // // // // // let obj = {
// // // // // // // // // // // // //     age: 18
// // // // // // // // // // // // // }
// // // // // // // // // // // // // var age = 0

// // // // // // // // // // // // // function fn() {
// // // // // // // // // // // // //     console.log(this.age)
// // // // // // // // // // // // // }

// // // // // // // // // // // // // let f = fn.bind(obj)

// // // // // // // // // // // // // console.log(new f)

// // // // // // // // // // // // // let newF = fn.myBind(obj)
// // // // // // // // // // // // // console.log(new newF)

// // // // // // // // // // // // // // let f0 = fn.bind(obj)
// // // // // // // // // // // // // // console.log('f0()', f0())


// // // // // // // // // // // // // // let newFn =  fn.myBind(obj)
// // // // // // // // // // // // // // console.log(newFn())

// // // // // // // // // // // // // Function.prototype.myBind = function (context, ...arg) {
// // // // // // // // // // // // //     context = context || window
// // // // // // // // // // // // //     let _this = this
// // // // // // // // // // // // //     function ctor(...otherArg) {
// // // // // // // // // // // // //         return _this.call(this instanceof ctor ? this : context, ...arg.concat(otherArg))
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     ctor.prototype  = this.prototype
// // // // // // // // // // // // //     return ctor
// // // // // // // // // // // // // }


// // // // // // // // // // // // class Scheduler {
// // // // // // // // // // // //     count = 2
// // // // // // // // // // // //     queue = []
// // // // // // // // // // // //     run = []

// // // // // // // // // // // //     add(task) {
// // // // // // // // // // // //         this.queue.push(task)
// // // // // // // // // // // //         return this.schedule()
// // // // // // // // // // // //     }

// // // // // // // // // // // //     schedule() {
// // // // // // // // // // // //         if (this.run.length < this.count && this.queue.length) {
// // // // // // // // // // // //             const task = this.queue.shift()
// // // // // // // // // // // //             const promise = task().then(() => {
// // // // // // // // // // // //                 this.run.splice(this.run.indexOf(promise), 1)
// // // // // // // // // // // //             })
// // // // // // // // // // // //             this.run.push(promise)
// // // // // // // // // // // //             return promise
// // // // // // // // // // // //         } else {
// // // // // // // // // // // //             return Promise.race(this.run).then(() => this.schedule())
// // // // // // // // // // // //         }
// // // // // // // // // // // //     }
// // // // // // // // // // // // }
// // // // // // // // // // // // const scheduler = new Scheduler()

// // // // // // // // // // // // const timeout = (time) => new Promise(resolve => {
// // // // // // // // // // // //     setTimeout(resolve, time)
// // // // // // // // // // // // })

// // // // // // // // // // // // const addTask = (time, order) => {
// // // // // // // // // // // //     scheduler.add(() => timeout(time)).then(() => console.log(order))
// // // // // // // // // // // // }

// // // // // // // // // // // // addTask(1000, '1')
// // // // // // // // // // // // addTask(500, '2')
// // // // // // // // // // // // addTask(300, '3')
// // // // // // // // // // // // addTask(400, '4')
// // // // // // // // // // // // // output: 2 3 1 4
// // // // // // // // // // // // // 一开始，1、2两个任务进入队列
// // // // // // // // // // // // // 500ms时，2完成，输出2，任务3进队
// // // // // // // // // // // // // 800ms时，3完成，输出3，任务4进队
// // // // // // // // // // // // // 1000ms时，1完成，输出1
// // // // // // // // // // // // // 1200ms时，4完成，输出4

// // // // // // // // // // // // let str = '["bilibili.com", "master@bilibili.com", "test.bilibili@bilibili.com", "test@bilibili.biliil.com", "test.bilibili.com", "test.bili@bili.com"]'
// // // // // // // // // // // // let arr = str.split('[')[1].split(']')[0].split(',')
// // // // // // // // // // // // let ans = []
// // // // // // // // // // // // for(let i= 0; i<arr.length; i++){
// // // // // // // // // // // //     arr[i].includes("@") ? null: ans.push(arr[i])
// // // // // // // // // // // // }
// // // // // // // // // // // // console.log(ans)


// // // // // // // // // // // // 1、为什么想来有赞，对有赞了解什么
// // // // // // // // // // // // 有赞是一家商家服务。有赞微商城、有赞零售、有赞教育、有赞美业、有赞小程序等SaaS软件产品，
// // // // // // // // // // // // 帮商家网上开店、社交营销、直播卖货
// // // // // // // // // // // // 我的小程序就是借用 有赞开源的小程序去做的。开源的项目很错。
// // // // // // // // // // // // 是我理想的公司

// // // // // // // // // // // // 2、为什么想来杭州
// // // // // // // // // // // // 杭州是一线城市，互联网技术氛围特别不错。
// // // // // // // // // // // // 我上一届实验室的两个师兄就是在有赞，一个前端一个后端，按照他们的话。杭州的生活习惯和饮食都和广东这边相近。
// // // // // // // // // // // // 一个人可以走得很快，一群人可以走得更远
// // // // // // // // // // // // 加上他们极力的推荐让我对杭州，有赞都有很不错的印象。
// // // // // // // // // // // // 杭州人才引进补贴好，而且到处都在发展，2022 年杭州亚运会也要来临，这些都是杭州新新活力的特点，
// // // // // // // // // // // // 我感觉也是一个不断向上的城市，所以我感觉杭州不错

// // // // // // // // // // // // 3、你觉得你有什么优点？
// // // // // // // // // // // // 优点：专注，自律，爱分享技术，有社区影响力。
// // // // // // // // // // // // 一个小博主。
// // // // // // // // // // // // 缺点：公共演讲能力不太好。

// // // // // // // // // // // // 4、最有成就的事情，最有挫败的事情
// // // // // // // // // // // // 大学吗？目前的话，可能就是自己通过努力开发了
// // // // // // // // // // // // 一款垃圾分类的小程序吧。拿到8千多的省级立项。
// // // // // // // // // // // // 最挫败的事，可能就是自己在大学里，找到自己喜欢的东西比较晚。
// // // // // // // // // // // // 也就是尝试的比较少。





// // // // // // // // // // // // function _instanceof(obj, proto) {
// // // // // // // // // // // //     let objPro = Object.getPrototypeOf(obj)
// // // // // // // // // // // //     let prototype = proto.prototype
// // // // // // // // // // // //     while (objPro) {
// // // // // // // // // // // //         if (objPro === prototype) {
// // // // // // // // // // // //             return true
// // // // // // // // // // // //         }
// // // // // // // // // // // //         if (objPro === null) {
// // // // // // // // // // // //             return false
// // // // // // // // // // // //         }
// // // // // // // // // // // //         objPro = Object.getPrototypeOf(objPro)
// // // // // // // // // // // //     }
// // // // // // // // // // // // }

// // // // // // // // // // // // console.log(_instanceof({}, Object))
// // // // // // // // // // // // console.log(_instanceof([], Array))

// // // // // // // // // // // // let info = {
// // // // // // // // // // // //     user:{
// // // // // // // // // // // //         name:'lin'
// // // // // // // // // // // //     }
// // // // // // // // // // // // }

// // // // // // // // // // // // let {user:name} = info
// // // // // // // // // // // // console.log(user)

// // // // // // // // // // // // [0,1,1,2,3]

// // // // // // // // // // // // function fn(n){
// // // // // // // // // // // //     if(n<=2) return n
// // // // // // // // // // // //     let dp = [1,2,3]
// // // // // // // // // // // //     for (let i = 2; i <= n; i++) {
// // // // // // // // // // // //         dp[i] = dp[i-1] + dp[i-2]
// // // // // // // // // // // //     }
// // // // // // // // // // // //     console.log(dp[n-1])
// // // // // // // // // // // // }
// // // // // // // // // // // // fn(4)


// // // // // // // // // // // var a = 0;
// // // // // // // // // // // function Parent() {
// // // // // // // // // // //   this.a = 1;
// // // // // // // // // // //   return this;
// // // // // // // // // // // }

// // // // // // // // // // // Parent.a = 2;
// // // // // // // // // // // Parent.prototype = {
// // // // // // // // // // //   a: 3,
// // // // // // // // // // //   setA: function (value) {
// // // // // // // // // // //     this.a = value;
// // // // // // // // // // //     return this;
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // // console.log(new Parent().a); // 1
// // // // // // // // // // // console.log(Parent().a); // 1
// // // // // // // // // // // console.log(new Parent().setA(4).a); // 4
// // // // // // // // // // // console.log(a); // 1
// // // // // // // // // // // console.log(Parent().setA(5).a); // TypeError




// // // // // // // // // // function fn(s1, s2) {
// // // // // // // // // //   if (s1.length !== s2.length) return false
// // // // // // // // // //   let arrS1 = s1.split('')
// // // // // // // // // //   let arrS2 = s2.split('')
// // // // // // // // // //   let len = arrS1.length
// // // // // // // // // //   let i = 0
// // // // // // // // // //   while (len) {
// // // // // // // // // //     if (!arrS2.includes(arrS1[i])) {
// // // // // // // // // //       return false
// // // // // // // // // //     } else {
// // // // // // // // // //       let index = arrS2.indexOf(arrS1[i])
// // // // // // // // // //       arrS1.shift()
// // // // // // // // // //       len = arrS1.length
// // // // // // // // // //       arrS2.splice(index, 1)
// // // // // // // // // //     }
// // // // // // // // // //     if (len === 0) break
// // // // // // // // // //   }
// // // // // // // // // //   return len != arrS2.length ? false : true
// // // // // // // // // // }

// // // // // // // // // // // console.log(fn('aabccegth', 'aabccethg'))


// // // // // // // // // // var isAnagram = function (s, t) {
// // // // // // // // // //   return s.length == t.length && [...s].sort().join('') === [...t].sort().join('')
// // // // // // // // // // };


// // // // // // // // // // // function solve(nums) {
// // // // // // // // // // //   if (nums.length == 1) return nums[0] + ''
// // // // // // // // // // //   let max = ''
// // // // // // // // // // //   let l = 0
// // // // // // // // // // //   let r = 1
// // // // // // // // // // //   let res = []
// // // // // // // // // // //   while (l < nums.length) {
// // // // // // // // // // //     if (r < nums.length) {
// // // // // // // // // // //       max = Math.max(parseInt(max + nums[l] + '' + nums[r]), max)
// // // // // // // // // // //       r++;
// // // // // // // // // // //       nums[l] = 0
// // // // // // // // // // //     }
// // // // // // // // // // //     if (r === nums.length) {
// // // // // // // // // // //       res.push(max)
// // // // // // // // // // //       l++;
// // // // // // // // // // //       r = 0;
// // // // // // // // // // //       max = ''
// // // // // // // // // // //     }
// // // // // // // // // // //   }
// // // // // // // // // // //   return max + ''
// // // // // // // // // // // }
// // // // // // // // // // // console.log(solve([2, 20, 23, 4, 8]))

// // // // // // // // // // console.log(fn('aabccegth', 'aabccethg'))

// // // // // // // // // // function fn(s1, s2) {
// // // // // // // // // //   let string1 = s1.sort()
// // // // // // // // // //   let string2 = s2.sort()
// // // // // // // // // //   return string1 === string2 ? true : false
// // // // // // // // // // }


// // // // // // // // // let str = '925656565656323777.5'
// // // // // // // // // let strArr = str.split('.')
// // // // // // // // // let arr = [...strArr[0]].reverse()
// // // // // // // // // let ans = []
// // // // // // // // // for (let i = 0; i < arr.length; i++) {
// // // // // // // // //   ans.push(arr[i])
// // // // // // // // //   if (ans.length == 3 || ans.length == 7 || ans.length == 11 || ans.length == 15 || ans.length == 19  ) {
// // // // // // // // //     ans.push(',')
// // // // // // // // //   }
// // // // // // // // // }
// // // // // // // // // // ans.reverse()[0] === ',' ? ans.shift() : null
// // // // // // // // // console.log(ans.reverse().join('') + '.' + strArr[1])


// // // // // // // // // if (str.length === 0) {
// // // // // // // // //   return -1
// // // // // // // // // }
// // // // // // // // // var arr = str.split('')
// // // // // // // // // for (var i in arr) {
// // // // // // // // //   if (arr.indexOf(arr[i]) === arr.lastIndexOf(arr[i])) {
// // // // // // // // //     return i
// // // // // // // // //   }
// // // // // // // // // }
// // // // // // // // // return -1
// // // // // // // // // let str = 'google'


// // // // // // // // // if (str == '') {
// // // // // // // // //   console.log(-1)
// // // // // // // // // }
// // // // // // // // // else {
// // // // // // // // //   var arr = str.split('')
// // // // // // // // //   for (let i = 0; i < arr.length; i++) {
// // // // // // // // //       if (str.split(arr[i]).length - 1 == 1) {
// // // // // // // // //           console.log(str.indexOf(arr[i]))
// // // // // // // // //           break
// // // // // // // // //       }
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // //2: ab ba 
// // // // // // // // //3: aab  aba  abb   baa  bab  bba 


// // // // // // // // // accaacac
// // // // // // // // // cacaacac
// // // // // // // // // ccaaca
// // // // // // // // let count = 0
// // // // // // // // function fn(n, str) {
// // // // // // // //   if (n < 2) return
// // // // // // // //   let l = 0
// // // // // // // //   let r = 1
// // // // // // // //   let tmp = ''
// // // // // // // //   let strArr = str.split('')
// // // // // // // //   while (r <= n) {
// // // // // // // //     if (strArr[l] == 'a' && strArr[r] == 'c') {
// // // // // // // //       tmp = strArr[l]
// // // // // // // //       strArr[l] = strArr[r]
// // // // // // // //       strArr[r] = tmp
// // // // // // // //       count++
// // // // // // // //     }
// // // // // // // //     l++
// // // // // // // //     r++
// // // // // // // //     if (r == n) {
// // // // // // // //       break
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   let string = strArr.join("")
// // // // // // // //   string.includes('ac') ? fn(n, string) : console.log(count)
// // // // // // // // }


// // // // // // // // let n = 8
// // // // // // // // let str = 'accaacac'
// // // // // // // // fn(n, str)


// // // // // // // // 2: ab ba 
// // // // // // // // 3: aab  aba  abb   baa  bab  bba 
// // // // // // // // 4: aab  aba  abb   baa  bab  bba 
// // // // // // // // aa aaab aabb 2


// // // // // // // // ab abaa abab   abbb  abba  4

// // // // // // // // function fn(n) {
// // // // // // // //   let arr = ['a', 'b']

// // // // // // // //   let i = 0
// // // // // // // //   while(arr[0] < n){
// // // // // // // //     arr[i] + Math.random() * 10
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // console.log(6 % 998244353)
// // // // // // // // 18 + 73 + 27

// // // // // // // // 3 2 3 1 1
// // // // // // // // 1 1 2 3 3 
// // // // // // // // 1 2 3

// // // // // // // // 14 24 14 22 44 29 33 45 36 48 
// // // // // // // // 24 14 22 44 29 33 45 36
// // // // // // // // console.log((29 + 33 + 36) / 3)


// // // // // // // // function fn(arr) {
// // // // // // // //   arr.shift()
// // // // // // // //   arr.pop()
// // // // // // // //   let l = 0
// // // // // // // //   let r = 1
// // // // // // // //   let max = -1
// // // // // // // //   let ans = [arr[l]]
// // // // // // // //   while (l < arr.length) {
// // // // // // // //     if (ans.length != 3) {
// // // // // // // //       ans.push(arr[r])
// // // // // // // //       r++
// // // // // // // //     }
// // // // // // // //     if (ans.length === 3) {
// // // // // // // //       max = Math.max((ans[0] + ans[1] + ans[2]) / 3, max)
// // // // // // // //       l = r
// // // // // // // //       r++
// // // // // // // //       ans = []
// // // // // // // //     }
// // // // // // // //     if(r>arr.length) {
// // // // // // // //       break
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   console.log(max)
// // // // // // // // }
// // // // // // // // fn([14,24 ,14, 22, 44, 29, 33, 45, 36, 48])

// // // // // // // // let a = {name:'foo'}
// // // // // // // // let b = { age:11}
// // // // // // // // let c = {sex:'max'}
// // // // // // // // let d = isNaN(Number(12+'3'))
// // // // // // // // let e = {
// // // // // // // //   name:'yoho',
// // // // // // // //   ...(d?Object.assign({name:'bar'},a,b):Object.assign({name:'bar'},a,c))
// // // // // // // // }
// // // // // // // // console.log(e)


// // // // // // // // function fn(str) {
// // // // // // // //   let arr = str.split("").sort()
// // // // // // // //   console.log(arr)
// // // // // // // //   let l = 0
// // // // // // // //   let r = 1
// // // // // // // //   let max = -1
// // // // // // // //   let obj = {}
// // // // // // // //   obj[arr[0]] = 1
// // // // // // // //   while (r < arr.length) {
// // // // // // // //     if (arr[l] == arr[r]) {
// // // // // // // //       obj[arr[l]] += 1
// // // // // // // //       r++
// // // // // // // //     }
// // // // // // // //     if (arr[l] != arr[r]) {
// // // // // // // //       l = r
// // // // // // // //       r++
// // // // // // // //       obj[arr[l]] = 1
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // //   for (const key in obj) {
// // // // // // // //     if (obj.hasOwnProperty(key)) {
// // // // // // // //       max = obj[key] > max ? obj[key] : max
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   for (const key in obj) {
// // // // // // // //     if (obj.hasOwnProperty(key)) {
// // // // // // // //       if (max == obj[key]) {
// // // // // // // //         return key
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // function fn(str) {
// // // // // // // //   let arr = str.split("")
// // // // // // // //   let obj = arr.reduce((pre, cur) => {
// // // // // // // //     cur in pre ? pre[cur]++ : pre[cur] = 1
// // // // // // // //     return pre
// // // // // // // //   }, {})

// // // // // // // //   console.log(obj)
// // // // // // // //   let max = -1
// // // // // // // //   for (const key in obj) {
// // // // // // // //     if (obj.hasOwnProperty(key)) {
// // // // // // // //       max = obj[key] > max ? obj[key] : max
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   for (const key in obj) {
// // // // // // // //     if (obj.hasOwnProperty(key)) {
// // // // // // // //       if (max === obj[key]) {
// // // // // // // //         console.log(key)
// // // // // // // //         break
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // fn('aafjgsfradscfssdgwadageeydsw')



// // // // // // // function fn(n, byte) {
// // // // // // //   let l = 0
// // // // // // //   let r = 1
// // // // // // //   let count = 0
// // // // // // //   while (l < byte.length) {
// // // // // // //     if (byte[l] == 'B' && byte[r] == 'Y') {
// // // // // // //     }
// // // // // // //     if (byte[l] != 'B' && byte[r] == 'Y') {
// // // // // // //       r++
// // // // // // //       l++
// // // // // // //       count++
// // // // // // //     }
// // // // // // //     if (byte[l] == 'Y' && byte[r] == 'Y') {
// // // // // // //       r++
// // // // // // //       l++
// // // // // // //       count++
// // // // // // //     }
// // // // // // //   }
// // // // // // // }
// // // // // // // fn(5, ['B', 'Y', 'Y', 'Y', 'B'])



// // // // // // // let arr = [{
// // // // // // //         id: 1,
// // // // // // //         name: '部门1',
// // // // // // //         pid: 0
// // // // // // //     },
// // // // // // //     {
// // // // // // //         id: 2,
// // // // // // //         name: '部门2',
// // // // // // //         pid: 1
// // // // // // //     },
// // // // // // //     {
// // // // // // //         id: 3,
// // // // // // //         name: '部门3',
// // // // // // //         pid: 1
// // // // // // //     },
// // // // // // //     {
// // // // // // //         id: 4,
// // // // // // //         name: '部门4',
// // // // // // //         pid: 3
// // // // // // //     },
// // // // // // //     {
// // // // // // //         id: 5,
// // // // // // //         name: '部门5',
// // // // // // //         pid: 4
// // // // // // //     },
// // // // // // // ]


// // // // // // // function fn(arr) {
// // // // // // //     let obj = {}
// // // // // // //     let last = 0
// // // // // // //     let fast = 0
// // // // // // //     while (last < arr.length) {
// // // // // // //         if (arr[fast + 1]['pid'] > arr[last]['pid']) {
// // // // // // //             for (const key in arr[last]) {
// // // // // // //                 if (arr[last].hasOwnProperty(key)) {
// // // // // // //                     obj[key] = arr[last][key];
// // // // // // //                 }
// // // // // // //             }
// // // // // // //         }
// // // // // // //         break
// // // // // // //     }
// // // // // // // }
// // // // // // // fn(arr)

// // // // // // // [{
// // // // // // //     "id": 1,
// // // // // // //     "name": "部门1",
// // // // // // //     "pid": 0,
// // // // // // //     "children": [{
// // // // // // //             "id": 2,
// // // // // // //             "name": "部门2",
// // // // // // //             "pid": 1,
// // // // // // //             "children": []
// // // // // // //         },
// // // // // // //         {
// // // // // // //             "id": 3,
// // // // // // //             "name": "部门3",
// // // // // // //             "pid": 1,
// // // // // // //             "children": [
// // // // // // //                 // 结果 ,,,
// // // // // // //             ]
// // // // // // //         }
// // // // // // //     ]
// // // // // // // // }]



// // // // // // // Vue.use(Router);
// // // // // // // const router = new Router({
// // // // // // //     routes: [{
// // // // // // //         path: '/',
// // // // // // //         redirect: '/home'
// // // // // // //     }, ...userRouter, {
// // // // // // //         path: '*',
// // // // // // //         redirect: '/404'
// // // // // // //     }]
// // // // // // // });

// // // // // // // router.beforeEach((to, from, next) => {
// // // // // // //     document.title = to.meta.title || ''; // 这里先获取下用户信息，我偷懒用sessionStorage存了
// // // // // // //     // 里面包含了用户权限，用户各种信息等
// // // // // // //     const user = JSON.parse(sessionStorage.getItem('ms_user')); // 这里必须加上to.path !== 'login'的判断，不然会陷入无限循环，
// // // // // // //     // 因为逻辑是第一次进来，判断用户信息不存在，即!user为true，由于使用的是next('/login')而非next()，
// // // // // // //     // 会再次进入路由跳转，next()方法没有参数是直接进入页面，不会再次进入路由拦截，有参数则会，因为跳转，
// // // // // // //     // 所以再次进入路由，再次判断，再次进入路由，再次判断，循环往复无限循环
// // // // // // //     // 所以一定要加to.path !== 'login'的判断
// // // // // // //     if (!user && to.path !== '/login') {
// // // // // // //         next('/login');
// // // // // // //     } else if (to.meta.permission) {
// // // // // // //         user.permission === to.meta.permission ? next() : message.alert('没有权限');
// // // // // // //     } else {
// // // // // // //         next();
// // // // // // //     }
// // // // // // // });

// // // // // // // new Vue({
// // // // // // //     router,
// // // // // // //     render: h => h(App)
// // // // // // // }).$mount('#app');


// // // // // // // function longestOnes(nums, k) {
// // // // // // //     let result = 0
// // // // // // //     let left = 0
// // // // // // //     let right = 0
// // // // // // //     while (right < nums.length) {
// // // // // // //         if (nums[right] === 0) {
// // // // // // //             k--
// // // // // // //         }
// // // // // // //         while (k < 0) {
// // // // // // //             if (nums[left] === 0) {
// // // // // // //                 k++
// // // // // // //             }
// // // // // // //             left++
// // // // // // //         }
// // // // // // //         result = Math.max(result, right - left + 1)
// // // // // // //         right++
// // // // // // //     }
// // // // // // //     return result
// // // // // // // }
// // // // // // let arr = '0011001110110001111 3'.split(" ")
// // // // // // let k = parseInt(arr[1])
// // // // // // let c = arr[0].split("").map(item => parseInt(item))

// // // // // // // function fn(c, k) {
// // // // // // //     let res = 0
// // // // // // //     let left = 0
// // // // // // //     let right = 0
// // // // // // //     while (right < c.length) {
// // // // // // //         if (c[right] == 0 && k <= 0) {
// // // // // // //             while (k <= 0) {
// // // // // // //                 if (c[left] == 0) {
// // // // // // //                     k++
// // // // // // //                 }
// // // // // // //                 left++
// // // // // // //             }
// // // // // // //         }
// // // // // // //         if (c[right] == 0 && k > 0) {
// // // // // // //             k--
// // // // // // //         }
// // // // // // //         res = Math.max(res, right - left + 1)
// // // // // // //         right++
// // // // // // //     }
// // // // // // //     console.log(res)
// // // // // // // }
// // // // // // // fn([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)













// // // // // // // function fn(arr, k) {
// // // // // // //     for (let i = 0; i < k; i++) {
// // // // // // //       arr.unshift(arr.pop())
// // // // // // //     }
// // // // // // //     console.log(arr)
// // // // // // // }

// // // // // // // fn([1, 2, 3, 4, 5, 6,7], 2)




// // // // // JSON.stringify(a1) === JSON.stringify(a2)

// // // // // function fn(arr1, arr2) {
// // // // //     for (let i = 0; i < arr1.length; i++) {
// // // // //         if (typeof arr1[i] == 'object') {
// // // // //             arr1[i] = JSON.stringify(arr1[i])
// // // // //         }
// // // // //     }
// // // // //     for (let i = 0; i < arr2.length; i++) {
// // // // //         if (typeof arr2[i] == 'object') {
// // // // //             arr2[i] = JSON.stringify(arr2[i])
// // // // //         }
// // // // //     }
// // // // //     let ans = []
// // // // //     for (let i = 0; i < arr1.length; i++) {
// // // // //         if (arr2.includes(arr1[i])) {
// // // // //             ans.push(arr1[i])
// // // // //         }
// // // // //     }
// // // // //     console.log(ans)
// // // // // }

// // // // // let arr1 = [123, 'webank', [1, 2, 3], '123', {a: 1}]
// // // // // let arr2 = [123, '123', {a: 2}, [1, 2, 3], 'webank']
// // // // // [123, '123',  [1, 2, 3], 'webank']
// // // // // fn(arr1, arr2)


// // // // // function fn(arr1, arr2) {
// // // // //     for (let i = 0; i < arr1.length; i++) {
// // // // //         if (typeof arr1[i] === 'object') {
// // // // //             for (let j = 0; j < arr2.length; j++) {
// // // // //                 JSON.stringify(arr1[i]) 
// // // // //             }
// // // // //         }
// // // // //     }
// // // // // }

// // // // // let s = readline()
// // // // // var calculate = function(s) {
// // // // //     s = s.trim()
// // // // //     const stack = []
// // // // //     let preSign = '+', num = 0, n = s.length
// // // // //     for (let i = 0; i < n; i++) {
// // // // //         if (s[i] >= '0') num = num * 10 + (s[i] - '0')
// // // // //         if (isNaN(Number(s[i])) || i === n - 1){
// // // // //             switch (preSign) {
// // // // //                 case '+':
// // // // //                     stack.push(num)
// // // // //                     break;
// // // // //                 case '-':
// // // // //                     stack.push(-num)
// // // // //                     break;
// // // // //                 case '*':
// // // // //                     stack.push(stack.pop() * num)
// // // // //                     break;
// // // // //                 default:
// // // // //                     stack.push(stack.pop() / num | 0)
// // // // //                     break;
// // // // //             }
// // // // //             preSign = s[i];
// // // // //             num = 0;
// // // // //         }
// // // // //     }
// // // // //     return  stack.reduce((a,b) => { return a + b }, 0)
// // // // // };


// // // // // var fn = function (ans) {
// // // // //     let res = []
// // // // //     for (let j = 0; j < ans.length-1; j++) {
// // // // //         for (let i = 0; i < ans[j].length; i++) {
// // // // //             if (ans[j][i] === "(" || ans[j][i] === "{" || ans[j][i] === "[") {
// // // // //                 res.push(ans[j][i])
// // // // //                 continue
// // // // //             }
// // // // //             let item = res[res.length - 1]
// // // // //             if (item === "(" && ans[j][i] === ")" || item === "{" && ans[j][i] === "}" || item === "[" && ans[j][i] === "]") {
// // // // //                 res.pop()
// // // // //             } else {
// // // // //                 console.log('no')
// // // // //             }
// // // // //         }
// // // // //         if(res.length === 0 ){
// // // // //             console.log('yes')
// // // // //         }else{
// // // // //             console.log('no')
// // // // //         }
// // // // //     }
// // // // // };
// // // // // let ans  = [3, '([])', '({]})', '()[]{}']
// // // // // ans.shift()
// // // // // fn(ans)

// // // // // JSON.stringify('[1,2,3,4,6]')


// // // // function fn(arr, n) {
// // // //     console.log(arr.sort())
// // // //     let r = 0
// // // //     let l = 0
// // // //     let ans = []
// // // //     while (l < arr.length) {

// // // //     }
// // // // }

// // // // // fn([1,3,2,3,2,2,1,2], 1)



// // // // // function fn(arr, n) {
// // // // //     let obj = {}
// // // // //     for (let value of arr) {
// // // // //         if (obj[value]) {
// // // // //             obj[value] = obj[value] + 1
// // // // //         } else {
// // // // //             obj[value] = 1
// // // // //         }
// // // // //     }
// // // // //     const keys = Object.keys(obj)
// // // // //     if (n > keys.length) return console.log(-1,-1)
// // // // //     let ans = []
// // // // //     keys.forEach(item => {
// // // // //         ans.push({ value: item, weight: obj[item] })
// // // // //     })
// // // // //     ans = ans.sort((a, b) => {
// // // // //         return b.weight - a.weight
// // // // //     })
// // // // //     console.log(parseInt(ans[n - 1].value),ans[n - 1].weight)
// // // // // }
// // // // // searchNun([1, 3, 2, 3, 2, 2, 1, 2], 1)




// // // // function sumString(a, b) {
// // // //     a = '0' + a;
// // // //     b = '0' + b; //加'0'首先是为了转为字符串，而且两个数相加后可能需要进位，这样保证了和的长度就是a、b中长的那个字符的长度
// // // //     var arrA = a.split(''), //将字符串转为数组
// // // //         arrB = b.split(''),
// // // //         res = [], //相加结果组成的数组
// // // //         temp = '', //相同位数相加的值
// // // //         carry = 0, //同位数相加结果大于等于10时为1，否则为0
// // // //         distance = a.length - b.length, //计算两个数字字符串的长度差
// // // //         len = distance > 0 ? a.length : b.length; //和的长度
// // // //     // 在长度小的那个值前加distance个0，保证两个数相加之前长度是想等的
// // // //     if (distance > 0) {
// // // //         for (let i = 0; i < distance; i++) {
// // // //             arrB.unShift('0');
// // // //         }
// // // //     } else {
// // // //         for (let i = 0; i < distance; i++) {
// // // //             arrA.unShift('0');
// // // //         }
// // // //     }
// // // //     // 现在得到了两个长度一致的数组，需要做的就是把他们想通位数的值相加，大于等于10的要进一
// // // //     // 最终得到一个和组成的数组，将数组转为字符串，去掉前面多余的0就得到了最终的和
// // // //     for (let i = len - 1; i >= 0; i--) {
// // // //         temp = Number(arrA[i]) + Number(arrB[i]) + carry;
// // // //         if (temp >= 10) {
// // // //             carry = 1;
// // // //             res.unshift((temp + '')[1])
// // // //         } else {
// // // //             carry = 0;
// // // //             res.unshift(temp)
// // // //         }
// // // //     }
// // // //     res = res.join('').replace(/^0/, '');
// // // //     console.log(res);
// // // // }

// // // // // sumString(233333333333333333, 23333333333333333322)
// // // // function add(num1, num2) {
// // // //     let maxlen = Math.max(num1.length, num2.length);
// // // //     let a = num1.padStart(maxlen, 0);
// // // //     let b = num2.padStart(maxlen, 0);
// // // //     let res = "";
// // // //     let next = 0;
// // // //     for (let i = maxlen - 1; i >= 0; i--) {
// // // //         let acc = Number(a[i]) + Number(b[i]) + next;
// // // //         next = Math.floor(acc / 10);
// // // //         res = acc % 10 + res;
// // // //     }
// // // //     if (next === 1)
// // // //         res = "1" + res;
// // // //     console.log(res)
// // // //     return res;
// // // // }
// // // // // add('233333333333333333', '23333333333333333322')



// // // // var reverseWords = function (s) {
// // // //     if (s == null) return ""
// // // //     let strArray = Array.from(s)
// // // //     let len = 0;
// // // //     let cur = 0;
// // // //     let space = true;
// // // //     for (let i = 0; i < strArray.length; i++) {
// // // //         if (s[i] !== " ") {
// // // //             strArray[cur++] = s[i]
// // // //             space = false
// // // //         } else if (space == false) {
// // // //             strArray[cur++] = " "
// // // //             space = true
// // // //         }
// // // //     }
// // // //     len = space ? cur - 1 : cur
// // // //     strArray = strArray.slice(0, len)
// // // //     let prevSpaceIdx = -1

// // // //     reversal(strArray, 0, len)
// // // //     return strArray.join("")
// // // // };

// // // // const reversal = (strArray, left, right) => {
// // // //     right--
// // // //     while (left < right) {
// // // //         let tmp = strArray[left]
// // // //         strArray[left] = strArray[right]
// // // //         strArray[right] = tmp
// // // //         left++
// // // //         right--
// // // //     }
// // // // }

// // // // let [row, col] = readline().split(" ")
// // // // let reversalArr = []
// // // // for (let i = 1; i <= col; i++) {
// // // //     let number = (i * row);
// // // //     if (number <= 9) {
// // // //         reversalArr.push(number)
// // // //     } else {
// // // //         let numToStr = reverseWords(number.toString())
// // // //         reversalArr.push(+numToStr)
// // // //     }
// // // // }
// // // // let sortArray = reversalArr.sort((a, b) => {
// // // //     return a - b
// // // // })
// // // // console.log(sortArray[sortArray.length - 1])


// // // // 洗牌算法
// // // // Array.prototype.shuffle = function() {
// // // //     var input = this;
// // // //     for (var i = input.length-1; i >=0; i--) {
// // // //         var randomIndex = Math.floor(Math.random()*(i+1));
// // // //         var itemAtIndex = input[randomIndex];
// // // //         input[randomIndex] = input[i];
// // // //         input[i] = itemAtIndex;
// // // //     }
// // // //     return input;
// // // // }
// // // // console.log([1,2,3,4,5,6,7,8].shuffle())



// // // function curry(fn, len = fn.length) {
// // //     return _curry(fn, len)
// // // }
// // // // args 用于保留 ` return _curry.call(this, fn, len, ..._args)`  中 _args 传入的参数
// // // function _curry(fn, len, ...args) {
// // //     return function (...params) {
// // //         let _args = [...args, ...params]

// // //         if (_args.length >= len) {
// // //             return fn.apply(this, _args);
// // //         } else {
// // //             return _curry.call(this, fn, len, ..._args)
// // //         }
// // //     }
// // // }

// // // function fn(a, b, c, d, e) {
// // //     console.log(a + b + c + d + e)
// // // }
// // // let _fn = curry(fn)
// // // _fn(1)(2)(3, 4, 5); // print: 1,2,3,4,5
// // // _fn(1, 2, 3, 4, 5); // print: 1,2,3,4,5
// // // _fn(1, 2)(3, 4)(5); // print: 1,2,3,4,5
// // // _fn(1)(2)(3)(4)(5); // print: 1,2,3,4,5




// // // 'use strict';
// // // let startTimestamp = (new Date()).getTime();
// // // let currentPercentage = 0;
// // // let maxPercentage = 100;
// // // let countDelay = 100;
// // // let timer = null;
// // // let start = false;
// // // const percentageChange = () => {
// // //     const currentTimestamp = (new Date()).getTime();
// // //     if (currentTimestamp - startTimestamp >= countDelay) {
// // //         currentPercentage++;
// // //         startTimestamp = (new Date()).getTime();
// // //         progress1.style = `--percent: ${currentPercentage}`;
// // //     };
// // //     if (currentPercentage < maxPercentage) {
// // //         timer = window.requestAnimationFrame(percentageChange);
// // //     } else {
// // //         window.cancelAnimationFrame(timer);
// // //     };
// // // };
// // // const clickHander = () => {
// // //     if (!start) {
// // //         start = true;
// // //         percentageChange();
// // //     };
// // // };
// // // btn.addEventListener('click', clickHander);

// // async function async1() {
// //     await async2();
// //     console.log('async1 end');
// // }
// // function async2() {
// //     return new Promise((resolve, reject) => {
// //         resolve();
// //         console.log('async2 promise');
// //     })
// // }
// // async1();
// // new Promise(function (resolve) {
// //     console.log('promise1');
// //     resolve();
// // }).then(function () {
// //     console.log('promise2');
// // }).then(function () {
// //     console.log('promise3');
// // }).then(function () {
// //     console.log('promise4');
// });

// // // script start  async1 start  async2 start  async2 promise  promise1  script end  
// // // async1 end
// // // promise2 promise3
// // // setTimeout

// let arr = [{a:1}, {b:1}, {a:1}, '{a:1}', 'hello'] 

// function fn(arr){
//     let res = []
//     let newArr = []
//     for (const item of arr) {
//         if(typeof item == 'string'){
//             newArr.push(item)
//         }else if(typeof item == 'object'){
//            res.push(JSON.stringify(item))
//         }
//     }
//     res = [...new Set(res)]
//     for (const item of res) {
//         newArr.push(JSON.parse(item))
//     }
//     console.log(newArr)
// }
// fn(arr)


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

    // 只订阅一次事件
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
const event = new EventEmitter();

const handle = (...rest) => {
    console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2, 3, 4);

