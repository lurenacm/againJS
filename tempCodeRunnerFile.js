function quickSort(arr){
    if(arr.length === 0) return
    
    let p = arr.shift()
    let leftArr = []
    let rightArr = []
    for(let i=1; i<arr.length-1; i++){
        arr[i] > p ? rightArr.push(arr[i]) : leftArr.push(arr[i])
    }
    return [...quickSort(leftArr), p, ...quickSort(rightArr)]
}
quickSort(arr)