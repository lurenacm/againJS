
``` js
Array.prototype.myMap = function (callback) {
    let array = []
    arr.reduce((pre, cur, index) => {
        array.push(callback(cur, index, this))
    }, 0)
    return array
}
```