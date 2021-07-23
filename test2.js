// let arr = [6, 3, 1, 9, 5, 8, 13, 76, 23, 45, 21, 7]

// function insertSort(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         while(arr[i] < arr[i-1]){
//             [arr[i], arr[i-1]] = [arr[i-1], arr[i]]
//             i--
//         }
//     }
//     return arr
// }

// console.log(insertSort(arr)) 
// //[1, 3, 5, 6, 7, 8, 9, 13, 21, 23, 45, 76]

var longestCommonSubsequence = function(text1, text2) {
    let q = []
    for (let index = 0; index < text1.length; index++) {
        text2.includes(text1[index]) ? q.push(text1[index]) : null
    }
    console.log(q)
    return q.length
};

let res = longestCommonSubsequence('abcdefg', 'abdeg12edhyim')
console.log(res)
