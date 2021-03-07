## 指向
匿名自执行函数函数的 this 指向 window。

## 思考题
``` js
var n =2 

var obj = {
    n: 3,
    fn: (function(n){
        n*=2
        this.n+=2
        var n = 5
        return function (m) {
            this.n*=2
            console.log(m + (++n))
        } 
    })(n)
}

var fn = obj.fn;
fn(3)
obj.fn(3)
console.log(n, obj.n)
/* 输出
* 9
* 10
* 8  6
/
```