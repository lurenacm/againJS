// // // /**
// // //  * Definition for singly-linked list.
// // //  * function ListNode(val, next) {
// // //  *     this.val = (val===undefined ? 0 : val)
// // //  *     this.next = (next===undefined ? null : next)
// // //  * }
// // //  */
// // // var reverseBetween = function (head, left, right) {
// // //     // 1
// // //     const dummy_node = new ListNode(-1);
// // //     dummy_node.next = head;
// // //     // 2
// // //     let pre = dummy_node;
// // //     for (let i = 0; i < left - 1; ++i) {
// // //         pre = pre.next;
// // //     }
// // //     // 3
// // //     let cur = pre.next;
// // //     for (let i = 0; i < right - left; i++) {
// // //         const next = cur.next;
// // //         // next.next = cur
// // //         cur.next = next.next; // 3->2
// // //         next.next = pre.next; // 
// // //         pre.next = next;
// // //         console.log(dummy_node)
// // //     }
// // //     return dummy_node.next;
// // // };
// // // // 1，2，3，4，5
// // // // 1，2，4，3，5

// // // var partition = function (head, x) {
// // //     let small = new ListNode(0);
// // //     const smallHead = small;
// // //     let large = new ListNode(0);
// // //     const largeHead = large;
// // //     while (head !== null) {
// // //         if (head.val < x) {
// // //             small.next = head;
// // //             small = small.next;
// // //         } else {
// // //             large.next = head;
// // //             large = large.next;
// // //         }
// // //         head = head.next;
// // //     }
// // //     large.next = null;
// // //     small.next = largeHead.next;
// // //     return smallHead.next;
// // // };

// // // // 输入：head = [1,4,3,2,5,2], x = 3
// // // // 输出：[1,2,2,4,3,5]
// // // var partition = function (head, x) {
// // //     // 哨兵节点
// // //     let less = new ListNode(0)
// // //     let lessHead = less
// // //     // 哨兵节点
// // //     let more = new ListNode(0)
// // //     let moreHead = more
// // //     let cur = head
// // //     while (cur) {
// // //         if (cur.val < x) {
// // //             less.next = cur
// // //             less = less.next
// // //         } else {
// // //             more.next = cur
// // //             more = more.next
// // //         }
// // //         cur = cur.next
// // //     }
// // //     more.next = null
// // //     less.next = moreHead.next
// // //     return lessHead.next
// // // };

// // Function.prototype.myCall = function (context, ...args) {
// //     context = context || window
// //     context.fn = this
// //     context.fn(...args)
// //     delete context.fn
// //     return
// // }

// // Function.prototype.myBind = function (context, ...args) {
// //     // context = context || window
// //     // context.fn = this
// //     let _this = this
// //     function ctor(...otherArg) {
// //         _this.call(this instanceof ctor? this : context, ...args.concat(...otherArg))
// //     }

// //     return ctor
// // }

// // var name = '一一'

// // function fn() {
// //     console.log(this.name, ...arguments)
// // }
// // var obj = {
// //     name: 'lin'
// // }
// // // fn.call(global, 1,2,3,4)

// // async function async1() {
// //     console.log('async1 start');
// //     await async2() // x.then().then(async2())
// //     console.log('async end');
// // }
// // async function async2() {
// //     return new Promise((resolve, reject) => {
// //         console.log('async2 start');
// //         resolve()
// //     }).then(res => {
// //         console.log('async2 end');
// //     })
// // }
// // async1()
// // new Promise(resolve => {
// //     console.log('Promise');
// //     resolve()
// // }).then(res => {
// //     console.log('Promise end');
// // })
// // console.log('script end');
// // // async1 start  async2 start  Promise  script end  async2 end  async end  Promise end
// // // async1 start  async2 start  Promise  script end  async2 end  async end  Promise end  

// // async function async1() {
// //     await async2();
// //     console.log('async1 end');
// // }
// // async function async2() {
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
// // });
// // // async2 promise  promise1  async1 end 
// // function _instanceof(example, classP) {
// //     let proto = Object.getPrototypeOf(example),
// //         classPrototype = classP.prototype
// //     while (true) {
// //         if (proto === classPrototype) {
// //             return true
// //         }
// //         if (proto === null) {
// //             return false
// //         }
// //         proto = Object.getPrototypeOf(proto)
// //     }
// // }
// // _instanceof([], Array)  //true
// // _instanceof('', Array)  // false
// // _instanceof('', Object) // true

// // function _instanceof(baseExp, claProto) {
// //     baseExp = Object.getPrototypeOf(baseExp)
// //     claProto = claProto.prototype
// //     while(true){
// //         if(baseExp === claProto){
// //             return true
// //         }
// //         if(baseExp === null){
// //             return false
// //         }
// //         baseExp = Object.getPrototypeOf(baseExp)
// //     }
// // }
// // _instanceof([], Array)  //true
// // _instanceof('', Array)  // false
// // _instanceof('', Object) // true



// function Parent(){
//     this.name = '林'
// }
// Parent.prototype.getName = function(){
//     return '一一'
// }
// function child(){
//     Parent.call(this)
// }
// // child.prototype = new Parent()
// child.prototype = Object.create(Parent.prototype)
// child.prototype.constructor = child
// console.log(child.name)

// function _new(func, ...params){
//     let obj = {}
//     obj.__proto__ = func.prototype

//     let res = func.call(obj, ...params)
//     if(typeof res === 'object' && res !== null) return res
//     return obj
// }

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



// let arr = []
// let res =  []
// for(var ){
//     for(){
        
//     }
//     if( >N/2){
        
//     }    
// }

// [1,1,1,4,6]
// N/2

function quickSort(arr){
    if(arr.length <=1) return arr
    let leftArr = []
    let rightArr = []
    let q = arr[0]
    for (let index = 1; index < arr.length; index++) {
        arr[index] >=q? rightArr.push(arr[index]) : leftArr.push(arr[index])
    }
    return [...quickSort(leftArr), q, ...quickSort(rightArr)]
}
// console.log(quickSort([1,5,2,7,3,9,1]))


// 冒泡
function bubbleSort(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length; j++) {
            
        }        
    }
}
