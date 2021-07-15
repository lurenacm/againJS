function getF(count) {
    if (count <= 1) return 1
    let q = [1, 1]
    let i = count
    while (i>0) {
        let a = q[q.length - 2]
        let b = q[q.length - 1]
        q.push(a + b)
        i--
    }
    return q.indexOf(count) -1
}
console.log(getF(2))