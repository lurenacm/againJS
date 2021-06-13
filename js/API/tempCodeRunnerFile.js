Array.prototype.reduce = function (callback, initVal) {
    for (let index = 0; index < this.length; index++) {
        if (initVal) {
            callback(pre = initVal, cur = this[index], index, this)
        } else {
            callback(pre = this[index], cur = this[index + 1], index, this)
        }
    }
}

let arr = [1, 2]
let a = arr.reduce((pre, cur, index, arr) => {
    console.log(pre, cur, index, arr)
    return pre + cur
}, 0)