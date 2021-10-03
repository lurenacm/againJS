// // class LRUCache {
// //     constructor(capacity) {
// //         this.capacity = capacity
// //         this.map = new Map();
// //     }

// //     get(key) {
// //         let val = this.map.get(key);
// //         if (val === undefined) return -1;

// //         this.map.delete(key); // 因为被用过一次，原有位置删除
// //         this.map.set(key, val); // 放入最下面表示最新使用
// //         return val;
// //     }

// //     put(key, val) {
// //         if (this.map.has(key)) this.map.delete(key); // 如果有，删除

// //         this.map.set(key, val); // 放到最下面表示最新使用

// //         if (this.map.size > this.capacity) {
// //             // 这里有个知识点
// //             // map的entries方法，还有keys方法(可以看mdn))，会返回一个迭代器
// //             // 迭代器调用next也是顺序返回，所以返回第一个的值就是最老的，找到并删除即可
// //             this.map.delete(this.map.entries().next().value[0])
// //         }
// //     }
// // }


// // // // // // 2
// // var LRUCache = function (capacity) {
// //     this.cache = new Map()
// //     this.capacity = capacity
// // }

// // LRUCache.prototype.get = function (key) {
// //     if (this.cache.has(key)) {
// //         // 存在即更新
// //         let temp = this.cache.get(key)
// //         this.cache.delete(key)
// //         this.cache.set(key, temp)
// //         return temp
// //     }
// //     return -1
// // }

// // LRUCache.prototype.put = function (key, value) {
// //     if (this.cache.has(key)) {
// //         // 存在即更新（删除后加入）
// //         this.cache.delete(key)
// //     } else if (this.cache.size >= this.capacity) {
// //         // 不存在即加入
// //         // 缓存超过最大值，则移除最近没有使用的
// //         this.cache.delete(this.cache.keys().next().value)
// //     }
// //     this.cache.set(key, value)
// // }


// // // //     *
// // // //    ***   
// // // //   *****  
// // // //  ******* 
// // // // *********

// // // // function dengyao(num) {
// // // //     // i 控制行数
// // // //     for (let i = 1; i <= num; i++) {
// // // //         // j 控制前面空格数 空格数 = 总行数减去当前行数 +1 
// // // //         let space = new Array(num - i + 1).join(" ")
// // // //         // k 控制每行星星个数 星星个数=两倍当前行数减一 也就是 (2*i-1)
// // // //         let star = new Array(i * 2).join("*")
// // // //         console.log(space + star);
// // // //     }
// // // // }
// // // // dengyao(5)



// // var tree = {
// //     val: "a",
// //     children: [{
// //             val: "b",
// //             children: [{
// //                     val: "d",
// //                     children: []
// //                 },
// //                 {
// //                     val: "e",
// //                     children: []
// //                 }
// //             ]
// //         },
// //         {
// //             val: "c",
// //             children: [{
// //                 val: "f",
// //                 children: []
// //             }, {
// //                 val: "g",
// //                 children: []
// //             }]
// //         }
// //     ]
// // }

// // function bfs(root) {
// //     let q = [root]
// //     while (q.length) {
// //         let res = q.shift()
// //         console.log(res.val)
// //         res.children.forEach(child => {
// //             q.push(child)
// //         });
// //     }
// // }
// // bfs(tree)



// // // 栈：后进先出，深度优先队列
// // // function dfs(root) {
// // //     let stack = [root]
// // //     while (stack.length) {
// // //         let res = stack.pop()
// // //         console.log(res.val)
// // //         for (let i = res.children.length - 1; i >= 0; i--) {
// // //             stack.push(res.children[i])
// // //         }
// // //     }
// // // }
// // // dfs(tree)



// // // // 深度优先遍历
// // // function dfs(root) {
// // //     console.log(root.val)
// // //     if (root.children[0]) {
// // //         root.children.forEach(element => {
// // //             dfs(element)
// // //         });
// // //     }
// // // }


// // // console.log("=====================")
// // // var tree = {
// // //     val: "a",
// // //     children: [{
// // //             val: "b",
// // //             children: [{
// // //                     val: "d",
// // //                     children: []
// // //                 },
// // //                 {
// // //                     val: "e",
// // //                     children: []
// // //                 }
// // //             ]
// // //         },
// // //         {
// // //             val: "c",
// // //             children: [{
// // //                 val: "f",
// // //                 children: []
// // //             }, {
// // //                 val: "g",
// // //                 children: []
// // //             }]
// // //         }
// // //     ]
// // // }

// // // //队列：先进先出
// // // function bfs(root){
// // //     let q = [root]
// // //     while(q.length){
// // //         let res = q.shift()
// // //         console.log(res.val)
// // //         res.children.forEach(child =>{
// // //             q.push(child)
// // //         })
// // //     }
// // // }
// // // bfs(tree)


// // // let obj = {
// // //     children: [{
// // //         index: 0,
// // //         children: [{
// // //             index: 1,
// // //             children: [{
// // //                 index: 3
// // //             }]
// // //         }]
// // //     }, {
// // //         index: 4
// // //     }, {
// // //         index: 5,
// // //         children: [{
// // //             index: 7,
// // //             children: [{
// // //                 index: 8
// // //             }]
// // //         }]
// // //     }, {
// // //         index: 6
// // //     }]
// // // }

// // // // 广度优先遍历
// // // let bfs = (node) => {
// // //     let nodes = []
// // //     let stack = []
// // //     if (node) {
// // //         stack.push(node)
// // //         while (stack.length) {
// // //             //取第一个
// // //             let item = stack.shift()

// // //             console.log(item.index)
// // //             let children = item.children || []
// // //             nodes.push(item)
// // //             for (let i = 0; i < children.length; i++) {
// // //                 stack.push(children[i])
// // //             }
// // //         }
// // //     }
// // //     // return nodes
// // // }
// // // console.log(bfs(obj))

// // class LRUCache {
// //     constructor(capacity) {
// //         this.capacity = capacity
// //         this.map = new Map();
// //     }

// //     get(key) {
// //         let val = this.map.get(key);
// //         if (val === undefined) return -1;

// //         this.map.delete(key); // 因为被用过一次，原有位置删除
// //         this.map.set(key, val); // 放入最下面表示最新使用
// //         return val;
// //     }

// //     put(key, val) {
// //         if (this.map.has(key)) this.map.delete(key); // 如果有，删除

// //         this.map.set(key, val); // 放到最下面表示最新使用

// //         if (this.map.size > this.capacity) {
// //             // 这里有个知识点
// //             // map的entries方法，还有keys方法(可以看mdn))，会返回一个迭代器
// //             // 迭代器调用next也是顺序返回，所以返回第一个的值就是最老的，找到并删除即可
// //             this.map.delete(this.map.entries().next().value[0])
// //         }
// //     }
// // }


// // class LURCache {
// //     constructor(capacity) {
// //         this.capacity = capacity
// //         this.map = new Map()
// //     }

// //     // 查找key的val
// //     get(key) {
// //         if(this.map.has(key)){
// //             // 存在即更新
// //             let val = this.map.get(key)
// //             this.map.delete(key)
// //             this.map.set(key, val)
// //             return val
// //         }
// //         return -1
// //     }

// //     //新增 key 的 val
// //     put(key, val){
// //         if (this.map.has(key)) this.map.delete(key); // 如果有，删除

// //         this.map.set(key, val); // 放到最下面表示最新使用

// //         if (this.map.size > this.capacity) {
// //             // 这里有个知识点
// //             // map的entries方法，还有keys方法(可以看mdn))，会返回一个迭代器
// //             // 迭代器调用next也是顺序返回，所以返回第一个的值就是最老的，找到并删除即可
// //             this.map.delete(this.map.entries().next().value[0])
// //         }
// //     }

// //     put(key, val){
// //         if(this.map.has(key)) this.map.delete(key)

// //         this.map.set(key, val)
// //         if(this.map.size > this.capacity){
// //             this.map.delete(this.map.entries().next().value[0])
// //         }
// //     }
// // }

// async function runPromiseByQueue(arrPromise) {
//     for (const value of arrPromise) {
//         await value()
//     }
// }

// function createPromise(timeout, val) {
//     return () => {
//         new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 console.log('promise', val)
//                 resolve()
//             }, timeout)
//         })
//     }
// }

// runPromiseByQueue([
//     createPromise(3000, 1),
//     createPromise(2000, 2),
//     createPromise(1000, 3)
// ]);



/**
 * 设定如下对应关系
     A: 1,
     B: 2,
     C: 3,
     ...
     Z: 26,
     AA: 27,
     AB: 28,
     AC: 29,
     ...
     AZ: 52,
     BA: 53,
     BB: 54,
     ...
     ZZ: 702
     AAA: 703
     AAB: 704
     ...
 * 写一个转换函数，根据上面规则把一个字符串转换为数字
 * str2Int('ABCDEFG') → 334123303
 */
// function str2Int(str) {}


// const shape = {

// }

//(shape => )()


// const twoSum = function (nums, target) {
//     const len = nums.length;
//     const map = new Map();

//     for (let i = 0; i < len; i++) {
//         const needNum = target - nums[i];

//         if (map.has(needNum) && i !== map.get(needNum)) {
//             return [i, map.get(needNum)];
//         }
//         // 边读边存
//         map.set(nums[i], i);
//     }
// }


// class Iterator {
//     constructor(assemble) {
//         this.assemble = assemble
//         this.index = 0
//     }

//     next() {
//         var {assemble, index} = this
//         if(index > assemble.length-1){
//             return {
//                 done:true,
//                 value: undefined
//             }
//         }
//         return {
//             done:false,
//             value:assemble[this.index++]
//         }
//     }
// }

// let iter = new Iterator([1,2,3])
// console.log(iter.next())
// console.log(iter.next()) 
// console.log(iter.next())
// console.log(iter.next())

// let obj = {
//     name: '林一一',
//     age: 18,
//     [Symbol.iterator]: Array.prototype[Symbol.iterator]
// }



10+ {}      // '10[object Object]'
10 + [10]  //