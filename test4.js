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


// // // 2
// // var LRUCache = function(capacity) {
// //     this.cache = new Map()
// //     this.capacity = capacity
// // }

// // LRUCache.prototype.get = function(key) {
// //     if (this.cache.has(key)) {
// //         // 存在即更新
// //         let temp = this.cache.get(key)
// //         this.cache.delete(key)
// //         this.cache.set(key, temp)
// //         return temp
// //     }
// //     return -1
// // }

// // LRUCache.prototype.put = function(key, value) {
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



// const obj = {
//     value: 1,
//     children: [{
//             value: 2,
//             children: [{
//                     value: 4
//                 },
//                 {
//                     value: 5
//                 },
//                 {
//                     value: 6
//                 }
//             ]
//         },
//         {
//             value: 3,
//             children: [{
//                     value: 7
//                 },
//                 {
//                     value: 8
//                 }
//             ]
//         }
//     ]
// }


// function bfs(root) {
//     let q = [root]
//     while (q.length > 0) {
//         let res = q.shift()
//         console.log(res.value)
//         res.children.forEach(child => {
//             q.push(child)
//         });
//     }
// }
// bfs(obj)


function dengyao(num) {
    // i 控制行数
    for (let i = 1; i <= num; i++) {
        // j 控制前面空格数 空格数 = 总行数减去当前行数 +1 
        let space = new Array(num - i + 1).join(" ")
        // k 控制每行星星个数 星星个数=两倍当前行数减一 也就是 (2*i-1)
        let star = new Array(i * 2).join("*")
        console.log(space + star);
    }
}
dengyao(5)
