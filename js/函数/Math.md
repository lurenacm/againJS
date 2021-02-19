> Math是数学函数，但实际上是对象
 
### Math对象中的常用方法
* `ceil/floor`：向上或向下取整。
``` JS
Math.ceil(0.1)  // 1
Math.ceil(10.001)   // 11

Math.floor(0.1) // 0
Math.floor(10.999)  // 10
```
* `round`：四舍五入
``` JS
Math.round(10.5) // 11
Math.round(10.49) // 10

Math.round(-10.49) // -10
Math.round(-10.5)  // -10
Math.round(-10.51) // -11
``` 
* `max/min`：获取一堆数种的最大最小值
``` JS
Math.max(12, 23, 45, 67, 432, 12)   // 432
Math.min(12, 23, 45, 67, 432, 12)   // 12
``` 
* `random`：获取0~1之间的随机小数
``` js
Math.random()   // 0.42149284753164284
``` 
> 获取 1-10之间的随机整数，Math.round(Math.random()*9+1)。获取 n 到 m的随机整数。Math.round(Math.random() * (m-n) + n)

### 思考
* 生成4位随机验证码
``` js
/** 4位随机验证码 基础版*/
function code() {
    const CHAR_CODE = 'qwertyuiopasdfghjklzxcvbmQWERTYUIOPASDFGHJKLZXCVBNM789561230'
    let char = ''
    for (let index = 0; index <4; index++) {
        const n = Math.round(Math.random()*61)
        char += CHAR_CODE.charAt(n)
    }
    return char
}
console.log(code())

/** 4位不重复的随机验证码*/
function code() {
    const CHAR_CODE = 'qwertyuiopasdfghjklzxcvbmQWERTYUIOPASDFGHJKLZXCVBNM789561230'
    let char = ''
    for (let index = 0; index <4; index++) {
        const n = Math.round(Math.random()*61)
        var str =  CHAR_CODE.charAt(n)
        if(char.indexOf(str)>-1){
            index--
            continue
        }
        char += CHAR_CODE.charAt(n)
    }
    return char
}
console.log(code())
``` 