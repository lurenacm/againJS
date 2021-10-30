// var reverseBetween = function (head, left, right) {
//     let cur = head
//     let next = null
//     let first = null
//     let last = null

//     if (left === right) {
//         return head
//     }

//     while (cur) {
//         if (cur.val === left) {
//             first = cur
//         }
//         next = cur.next
//         cur = next
//         if (cur.val === right) {
//             last = cur
//             break
//         }
//     }

//     cur = first

//     while(cur){

//     }

// }


// // const shape = {

// // }

// // (shape => )()


// // const twoSum = function (nums, target) {
// //     const len = nums.length;
// //     const map = new Map();

// //     for (let i = 0; i < len; i++) {
// //         const needNum = target - nums[i];

// //         if (map.has(needNum) && i !== map.get(needNum)) {
// //             return [i, map.get(needNum)];
// //         }
// //         // 边读边存
// //         map.set(nums[i], i);
// //     }
// // }




function quick(str){
    let arr = str.split("")
    let markArr = []
    let len = arr.length
    for (let i = 0; i < len; i++) {
        if(arr[i] === '?'){
            markArr.push(i)
        }
    }

    let newArr = arr.filter(item => {
        return item !== "?"
    })
    newArr.sort()

    

    console.log(newArr, markArr)
}
console.log(quick('12A???zc'))



class Example{
    constructor(){
    }
    getName(){}
    getAge(){}
    static postDate(){
        console.log(this)
    }
}
new Example()