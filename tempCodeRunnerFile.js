var length = 10;

function fn() {
    return this.length + 1;
}
var obj = {
    length: 5,
    test1: function () {
        return fn();
    }
};
obj.test2 = fn;
//下面代码输出是什么
console.log(obj.test1())
console.log(fn() === obj.test2())