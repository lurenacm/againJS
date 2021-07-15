let b = require('./a')
console.log(b)
function abc() {
    b = 2
}
abc()
console.log(b)
