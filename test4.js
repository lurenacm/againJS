// function fn(nums, k){
//     let set = new Set()
//     let res = []
//     nums.map((item, index) => {
//         if(!set.has(item)){
//             set.add(item)
//             if(index+1 == k){
//                 return
//             }
//         }else{
//             res.push(item)
//         }
//     })
//     // console.log(res)
//     return [... new Set(res)]
// }

// let res = fn([1,1,1,2,2,3], 2)
// console.log(res)

function fn(nums, k) {
    let set = new Set()
    let res = []
    for (let i = 0; i < nums.length; i++) {
        if (!set.has(nums[i])) {
            set.add(nums[i])
        }
    }
    res = [...set]
    let arr = []
    for (let j = 0; j < res.length; j++) {
        arr = res.shift()
        if (arr.length == k) {
            break
        }
    }



    return arr
}
let res = fn([1, 1, 1, 2, 2, 3, 3], 2)
console.log(res)


// 一个数如果恰好等于它的因子之和，这个数就称为“完数”。例如6=1＋2＋3.编程找出1000以内的所有完数
// 12 -> 1 2 3  4 6 
const objarray = {
    '1': [1]
};
let i = 1;
while (i <= 1000) {
    for (let j = 1; j <= i; j++) {
        if (i % j == 0 && j !== i) {
            if (objarray[i]) {
                objarray[i].push(j)
            } else {
                objarray[i] = [j]
            }
        }
    }
    i++
}

// console.dir(objarray)

for (let key in objarray) {
    let i = 0
    if (!Array.isArray(objarray[key])) continue
    if (!objarray.hasOwnProperty(key)) break
    objarray[key].forEach(item => {
        i += item
    })
    //     console.log(key,objarray[key],'---',i,i == key)

    if (i == key) {
        console.log('key', key)
        //       console.log(objarray[key])
    }
}

