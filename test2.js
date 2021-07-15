let arr = [1, 3, 6, 9, 5, 8, 13, 76, 23, 45, 21, 7]

function selectionSort(arr) {
    let newArr = []
    let len = arr.length
    for (let i = 0; i < len; i++) {
        let min = Math.min(...arr)
        newArr.push(min)
        arr.splice(arr.indexOf(min), 1)
    }
    console.log(newArr)
}
selectionSort(arr)