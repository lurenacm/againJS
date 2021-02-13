<img src="https://github.com/lurenacm/againJS/blob/main/js/base/img/JS.png" width="500px" height="500px">

> __javascript 中常用小 tip__
* JavaScript 中 只有 5种情况在判断语句中为 false 即：0，NaN，''，null，undefined
* 数学运算符有 `+ - * / % ++ -- ()` 等。JavaScript 中除了`+`号外，其他运算符遇到数学运算时，都会将非数字类型转化成 Number类型在运算，包括 `++`。`+` 在 JS 中除了数字类型的相加还有字符串的拼接，字符串在加号运算有最高的优先运算，与字符串相加必定是字符串连接运算，当遇到字符串时 JS 优先字符拼接而不是数字类型的相加。重要的是弄明白是不是数学运算，是数学运算就是字符串用number转型。[运算示例](./img/数学运算符.jpg)
    - 特殊情况一：有引用类型和`+`运算。引用类型的`+`运算中，引用类型会先使用`toString()`转化成字符串（其实是先使用`valueOf`，但是valueOf返回的是对象本身），才转换成数字。所以转字符串时就会字符串拼接。比如：`[] + 10 => "10"，[] + [] =>""，10 + {} => "10[object Object]"，({})+ 10 / ({name: 12})+10 => "[object Object]10"`，`()`这里的小括号也是数学运算。

    - 特殊情况二 有`{}` 在前面 `+` 在后面：`{} + 10 => 10`，得到的是10。原因：浏览器会认为这代码不是数学运算也不是字符串拼接，这是两部分代码。`{}`代表的是一个代码块也就是一个作用域，`+10`才是数学运算。上面的写法等价`{};  +10;`所以结果是10, 比如`{}+100 => 100；{} + true => 1`；`{} + [] `相当于 `{}; +[]; => 0`; 
 
    - 特殊情况三 `{} + {} `：不同浏览器输出结果可能不同，`{} + {} => "[object Object][object Object]"`，这也是按照valueOf -> toString的顺序，但因为valueOf是对象本身，所以会以toString的返回值才是原始数据类型，也就是`"[object Object]"`字符串`
     > 特别注意: {} + {} 在不同的浏览器有不同结果可能是NaN，因为有部分浏览器会认为这也是两部分代码块，相等于`{}; +{};`所以`+{};`输出就是NaN

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
* switch case 语句中 cace的判断使用的是绝对相等 `===` 操作符来判断。使用场景：三元运算>switch cace> if else
* 
