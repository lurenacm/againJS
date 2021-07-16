let arr = [6, 3, 1, 9, 5, 8, 13, 76, 23, 45, 21, 7]

function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        while(arr[i] < arr[i-1]){
            [arr[i], arr[i-1]] = [arr[i-1], arr[i]]
            i--
        }
    }
    return arr
}

console.log(insertSort(arr))