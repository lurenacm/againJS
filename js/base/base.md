<img src="https://github.com/lurenacm/againJS/blob/main/js/base/img/JS.png" width="500px" height="500px">
 [你知道的JS](./img/JS.png)

> Javascript 中的小 tip

* JavaScript 中 只有5种情况在判断语句和`!`和`!!`中为 false（Boolean()） 即：0，NaN，''，null，undefined
### JavaScript 中的数学运算符
* 数学运算符有 `+ - * / % ++ -- ()` 等。JavaScript 中除了`+`号外，其他运算符遇到数学运算时，都会将非数字类型转化成 Number类
型在运算，包括 `++`。`+` 在 JS 中除了数字类型的相加还有字符串的拼接，字符串在加号运算有最高的优先运算，与字符串相加必定是字符串连接运算，当遇到字符串时 JS 优先字符拼接而不是数字类型的相加。重要的是弄明白是不是数学运算，是数学运算就是字符串用number转型。[运算示例](./img/数学运算符.jpg)
    - 特殊情况一：有引用类型和`+`运算。引用类型的 `+` 运算中，引用类型会先使用 `toString()` 转化成字符串（其实是先使用`valueOf`，但是valueOf返回的是对象本身），才转换成数字。所以转字符串时就会字符串拼接。比如：`[] + 10 => "10"，[] + [] =>""，10 + {} => "10[object Object]"，({})+ 10 / ({name: 12})+10 => "[object Object]10"`，`()`这里的小括号也是数学运算。

    - 特殊情况二 有`{}` 在前面 `+` 在后面：`{} + 10 => 10`，得到的是10。原因：浏览器会认为这代码不是数学运算也不是字符串拼接，这是两部分代码。`{}`代表的是一个代码块也就是一个作用域，`+10`才是数学运算。上面的写法等价`{};  +10;`所以结果是10, 比如`{}+100 => 100；{} + true => 1`；`{} + [] `相当于 `{}; +[]; +""=> 0`，+""在这就是数学运算; 
 
    - 特殊情况三 `{} + {} `：不同浏览器输出结果可能不同，`{} + {} => "[object Object][object Object]"`，这也是按照valueOf -> toString 的顺序，但因为 valueOf 是对象本身，所以会以toString的返回值才是原始数据类型，也就是`"[object Object]"`字符串`
     > 特别注意: {} + {} 在不同的浏览器有不同结果可能是 NaN，因为有部分浏览器会认为这也是两部分代码块，相等于`{}; +{};`所以`+{};`输出就是NaN

* `==`运算符：在进行 `==` 比较时，如果两边的数据类型不一样，则先转换成相同的数据类型，再作比较。
   - 引用类型作比较，需要看的是引用地址是否一样，一样就相等，否则不相等。
    ``` js
        {name: 'LinYY'} == {name: 'LinYY'}  // false
        [12,13] ==  [12,13]    // false

        var obj = {}
        var obj1 = obj
        obj1 == obj // true
    ```
   - null 和 undefined 与任何值比较时都不转化成数字，也就是和任何值都不相等。
   ``` js
        null == 0  // false
        null == [] // false
   ``` 
   - 一个特殊的例子，null == undefined 是 true。JavaScript的最初版本是这样区分的：null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。推荐一篇阮老师的文章[undefined和null区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)
   > - var a = null, 在初始化 a 时使用null 来赋值最好，因为null 时空对象指针即空什么都没有，不会占用内存。而 undefined 是占用位置的
* 三元运算符，特殊情况。
    - 只执行true或 false运行，常使用 null，undefined/ void 0左占位符
    ``` js
    var num = 10
    num > 9 ? num++ : null   // false 的情况不做处理
    ```
    - 执行多行语句使用`()`包裹，`,`隔开
    ``` js
    var num = 10
    num> 9? (num++, num*= 10) ? num--
    ```
    - 思考题：改写下面的代码成三元运算符
    ``` js
    var  num = 12
        if(num > 10){
            if(num > 11) {
                num ++
            } else {
                num--
            }
        }else {
            if(num == 12){
                num--
                num*=10
            }
        }
    ```
    ``` js
    var  num = 12
    num > 10 ? (num > 11? num ++ : num--) : (num == 12? (num--,num*=10): null)
    ``` 
    - [打印结果](./img/三元运算.jpg)
    
    <img src="https://github.com/lurenacm/againJS/blob/main/js/base/img/%E4%B8%89%E5%85%83%E8%BF%90%E7%AE%97.jpg" width="550px" height="330px">
* `i++` 和`++i`区别：`i++`是先运算 `i` 再自加1，而不是运算的结果自加1。`++i` 是 `i` 先自加1再运算。
``` js
var i = 10
var a = 20 + (i++)
console.log(a, i)   // 30, 11
```
> `a + (i++)` 中 `()` 不会起作用，a 先与 ` i ` 相加 `i` 再自加 1。
* JS 运算符的优先级[JS运算符的优先级](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

### JavaScript 中 `||` 和 `&&` 运算符
*  `&&` 运算的优先级高于 `||`
* JavaScript 中 `||` 和 `&&` 运算不是为了得到 `true false`，而是为了得到返回值。两者都只是判断左边的操作数值的 Boolean 值来决定是否进行下一步。
``` js
var a = 1 || 2
a   // 1
var b = '' || 1
b   // 1
var g = null || ''
g   // ''

var c = 1 && 2
c   // 2
var d = '' && 1
d   // ''
```
>`||` (A || B) 判断A真假，A真返回A，A假返回B。`&&` (A && B)，判断A真假，A真返回B，A假返回B。
* `||` 和 `&&` 使用场景
``` js
function fo(x){
    if(!x){
        x = 0
    }
    x = x || 0
}
fo(1)

function fn(callback){
    // if(typeof callback === 'function'){
    //     callback()
    // }
    callback && callback()  // 简写
}

fn(function() {})
```

### others
* switch case 语句中 cace的判断使用的是绝对相等 `===` 操作符来判断。使用场景：三元运算>switch cace> if else
* 
