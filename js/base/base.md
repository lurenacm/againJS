<img src="https://github.com/lurenacm/againJS/blob/main/js/base/img/JS.png" width="500px" height="500px">

> __javascript 中常用小 tip__
* JavaScript 中 只有 5种情况在判断语句中为 false 即：0，NaN，''，null，undefined
* 数学运算符有 `+ - * / % ++ -- ` 等。JavaScript 中除了`+`号外，其他运算符遇到数学运算时，都会将非数字类型转化成 Number类型在运算，包括 `++`。`+` 在 JS 中除了数字类型的相加还有字符串的拼接，当遇到字符串时 JS 优先字符拼接而不是数字类型的相加。重要的是弄明白是不是数学运算，是数学运算就是字符串用number转型。[运算示例](./img/数学运算符.jpg)
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
    
    <img src="https://github.com/lurenacm/againJS/blob/main/js/base/img/%E4%B8%89%E5%85%83%E8%BF%90%E7%AE%97.jpg" width="300px" height="300px">
* switch case 语句中 cace的判断使用的是绝对相等 `===` 操作符来判断。使用场景：三元运算>switch cace> if else
* 
