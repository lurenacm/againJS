## call，apply，bind 都可以改变 this 的指向
* `call` 格式 [function].call([this], [param]...)，一句话概括：将函数的 `this` 指定到 `call()` 的第一个参数对象，再将剩余的参数传递给函数。
>详细： `[function]`.call([this])，执行 `call()` 会将函数 `[function]` 中的 `this` 绑定到第一个参数对象中，将后面的实参获取到传递给函数 `[function]`，同时执行`[function]`。要记住是`call()` 先执行，`[function]`再执行。

## 思考
### 来一道 call 的面试题
``` js
function fn1(){
    console.log(1)
}

function fn2(){
    console.log(2)
}

fn1.call(fn2)
fn1.call.call(fn2)
Function.prototype.call(fn1)
Function.prototype.call.call(fn1)
```
### 模拟实现内置的 call() 方法。
> 思路: 1. `call()` 方法得先执行。2. 获取到 `[function]` 的 `this`，传递给 `call()` 的第一个参数。3. 将剩余参数传入到 `[function]` 中。4. 最后调用 `this` (函数 `[function]`) 执行。
``` js

```


