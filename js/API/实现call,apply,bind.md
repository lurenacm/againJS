## call，apply，bind 都可以改变 this 的指向
* `call` 格式 [function].call([this], [param]...)，一句话概括：`call()` 将函数的 `this` 指定到 `call()` 的第一个参数值和剩余参数指定的情况下调用某个函数或方法。

>原理：`[function]`.call([this])，执行 `call()` 会将函数 `[function]` 中的 `this` 绑定到第一个参数。而函数 `call()` 中的 `this` 是指向 `[function]` 的，`[function]` 是在 `call()` 函数内部执行的，是 `call()` 通过操控自己的 `this` 来执行函数 `[function]`，同时给 `[function]` 传递剩余的参数。

## 思考
### 来一道 call 的面试题
``` js
function fn1(){
    console.log(1)
}

function fn2(){
    console.log(2)
}

fn1.call(fn2)   //  1
fn1.call.call(fn2)  //  2
```
> `fn1.call(fn2)` 中执行函数 `call()` 将 `fn1` 中的 `this` 绑定到 `fn2`，最后在 `call`中使用 `call` 的 `this` 执行函数`fn1`，输出就是1；`fn1.call.call(fn2)`：等价于`A.call(fn2)`，`A` 就是 `fn1.call`函数。同样将 A 中 `this` 传递给`fn2`，此时A 中 `this` 就是`fn2`。`call` 调用 this 执行 `A (fn1.call)`，也就是执行 `fn2` 输出就是2。

### 模拟实现内置的 call() 方法。
> 思路: 1. `call()` 方法得先执行。2. 获取到 `[function]` 的 `this`，传递给 `call()` 的第一个参数。3. 最后将剩余参数传入到 `[function]` 中。在 `call()` 中执行函数 `[function]`，也就是执行 this。
``` js

```
## 参考
[JavaScript深入之call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

