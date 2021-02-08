[你知道的JS😂](./img/JS.png)
> __javascript 中常用小 tip__
* JavaScript 中 只有 5种情况在判断语句中为 false 即：0，NaN，''，null，undefined
* 数学运算符有 + - * /。JavaScript 中除了`+`号外，其他运算符遇到数学运算时，都会将非数字类型转化成 Number类型在运算。`+` 在 JS 中除了数字类型的相加还有字符串的拼接，当遇到字符串时 JS优先字符拼接而不是数字类型的相加。[运算示例](./img/数学运算符.jpg)
* 三元运算符，特殊情况。
    - 只执行true或 false运行，常使用 null，undefined/ void 0左占位符
    ``` js
    var num = 10
    num > 9? num++ : null   // false 的情况不做处理
    ```
    - 执行多行语句使用`()`包裹，`,`隔开
    ``` js
    var num = 10
    num> 9? (num++, num*= 10) ? num--
    ```