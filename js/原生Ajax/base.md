# 一、Ajax
### 1. 概念
>Ajax全称：async javaScript and xml。xml：是一种可以扩展的文本标记语言，可以扩展自定义的语义标签。很早以前 xml 常用于从服务端返回数据结构，现在基本都是使用 json 格式返回数据。

### 2. 作用
> 在不刷新全局的下，局部刷新页面。

### 3. 四步创建 Ajax
1. 创建 `Ajax`实例，`let xhr = new XMLHttpRequest()`，IE6 不兼容这种写法
2. 打开请求，配置请求前的配置项，共 5个参数，`xhr.open([http method], [url], [async], [userName], [userPass])`
    > `http methods` 有常用的请求方式有，`post, get, delete, put, head, options, trace, connect`。`async`代表异步，默认是 `true`，`false` 是同步。`[url]`：是想服务器请求的 `api`。`[userName], [userPass]`，代表用户名和密码

 - __http methods 细分：delete：删除服务器端的某些数据，一般是文件。put：向服务器上存放某些内容，一般是文件，head：只是获取从服务器端返回的请求头信息，不要响应主体的内容。options：一般用于向服务器发送探测性请求，看是否连接成功__

3. 事件监听 `readystatechange`，一般监听 ajax 状态发生改变的事件，这个事件可以获取服务器返回的响应主和请求头。`xhr.onreadystatechange = function (){}`
4. 发送 ajax 请求，ajax 任务开始执行。`xhr.send([])`

``` js
// 1. 创建 XMLHttpRequest 实例
let xhr = XMLHttpRequest()
// 2. 打开和服务器的连接
xhr.open('get', 'URL')
// 3.发送
xhr.send()
// 4. 接收变化。
xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){   // readyState: ajax 状态，status：http 请求状态
        console.log(xhr.responseText);   //响应主体
    }
}
```
### 4. Ajax 状态和 HTTP 状态码
* Ajax 状态一共有5种，分别是`0, 1, 2, 3, 4`
>- 状态 0：`unsent`，刚创建的 `XMLHttpRequest` 实例，还没有发送。
>- 状态 1：`opened`，已经执行了上面的 `open` 操作。
>- 状态 2：`header_received`，标识已经发送的 ajax 请求。
>- 状态 3：`loading`，表示响应的主体内容正在返回
>- 状态 4：`done`，表示响应的主体内容已经被客户端接收。

* HTTP 常见的状态码。
>- `2xx`：表示请求已经被服务器接收，理解，请接受。常见的有，`200`表示ok，表示服务能够返回信息
>- `3xx`：一类重要的高频考点，`301`：表示永久转移，返回旧域名会跳转到心域名。`302`：临时转移。一般用于服务器负载均衡，但服务器的并发数达到最大时，服务器会将后续访问的用户转移到其他服务器上去。`307`：表示临时重定向。`304`：表示不设置缓存，对于不经常更新的文件，例如`css/js/html文件`，服务器会结合客户端设置`304`状态，加载过的资源下次请求时会在客户端中获取
>- `4xx`：表示语义有误，请求无法被服务器端理解。`400`：表示请求的参数错误。`401`：表示无权限访问。`404`：表示请求的资源不存在。`413`：表示和服务器的交互过大。
>- `5xx`：服务器端出错。`500`：表示服务器端出现未知的错误。`503`：服务器超负荷。 

### 5. ajax 中常用的属性和方法
>1. `onabort`: 表示请求中断后要处理的事。和 `xhr.abort()` 一起使用。
>2. `ontimeout`: 表示请求的超时，执行的方法。和`timeout`设定的事件一起使用。
> 3. `response`: 响应的主体内容。
>4. `responseText`: 响应的具体内容是字符串，一般是 json 字符串
>5. `responseXML`: 响应的具体内容是文档。
>6. `status`: http 的状态码。
>7. `statusText`: 状态码描述
>8. `withCredentials`：表示是否允许跨域。
>9. `getAllResponseHeaders`：获取所有响应头信息。
>10. `xhr.open()`：打开URL请求。
>11. `xhr.send()`：表示发送 ajax。
>12. `setRequestHeader()`: 设置请求头。这个属性在必须在`xhr.open()`后面。

#### 思考
1. `post` 和 `get` 有什么区别。
>`http` 的所有请求方法中都可以从服务端获取数据，和传递内容。`get`：主要是从服务器获取数据。

2. 来一道思考题，求输出结果
``` js
let xhr = new XMLHttpRequest()
xhr.option('post', 'api')
xhr.onreadystatechange = () =>{
    if(xhr.readyState == 2){
        console.log(2)
    }
    if(xhr.readyState == 4){
        console.log(4)
    }
}
xhr.send()
console.log(3)
/* 输出
*   3 2 4
*/
```
> 如果知道任务队列的概念，不难知道输出的结果，因为事异步请求，所以同步的主任务先输出`3`，最后输出 `2, 4`。如果上面`xhr.option('post', 'api')` 变成 `xhr.option('post', 'api', false)` 后代码就是同步的，任务队列中只有主任务输出的结果变成`2, 4, 3`。

# 二、axios
> `axios` 是使用 `promise` 封装的 `ajax`。axios 不是一个类是一个方法。

## 1.  axios 属性
> axios 有 `get, post, put, patch ,delete` 等请求方式，`get，post` 返回的实例都是 `promise`，所以可以使用 `promise` 的方法，下面给出基本的实用方法。
* `axios.get()`，向服务器发送一个 `get` 请求。
``` js
axios.get('apiURL', {
    param: {
        id: 1
    }
}).then(res=>{
    console.log(res);
})
.catch( error=>{
    console.log(error)
}
```
> `param` 中的的键值对最终会 `?` 的形式，拼接到请求的链接上，发送到服务器。
* `axios.post()`示例
``` js
axios.post('apiURL',{
        user: '林一一',
        age: 18
}).then( res=>{
    console.log(res);
})
.catch( error=>{
    console.log(error)
}
```
* `axios.put()`示例
``` js
axios.put('apiURL', {
    name: '林一一',
})
```
* `axios.patch(url[, data[, config]])`示例
``` js
axios.patch('apiURL', {
    id: 13,
},{
   timeout: 1000,
})
```
* `axios.delete()`示例
``` js
axios.delete('apiURL', {
    params: {
        id: 1
    },
    timeout: 1000
})
```
## 2. 一次并发的请求 `axios.all([])`
> `axios.all()` 可以实现多个请求，且请求都完成后才再去做某事。
``` js
let requestArr = [axios.get('apiURL/1'), axios.get('apiURL/2'), axios.post('apiURL/3', {id: 3})]
axios.all(requestArr).then(res => {
    console.log(res)
})
```
### 思考，`axios.all()` 是怎么实现并发请求的？
> `axios.all()` 使用的是 `promise.all()` 实现的，来看看 axios 中的源码
``` js
axios.all = function all(promises) {
    return Promise.all(promises);
};
```
## 3. axios 中的配置项。
> 实用的 [axios配置项](http://www.axios-js.com/zh-cn/docs/index.html#%E9%85%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E5%80%BC)


# 三、fetch
## 1. 介绍 fetch
*  `fetch`：是 `http` 的数据请求方式，是 `XMLHttpRequest` 的一种代替方案，没有使用到 `XMLHttpRequest` 这个类。`fetch` 不是 ajax，而是原生的 js。`fetch()` 使用 `Promise`，不使用回调函数。`fetch` 是 ES8 中新增的 api，兼容性不是很好，IE 完全不兼容 `fetch` 写法。
* `fetch()` 采用模块化设计，API 分散在 `Response` 对象、`Request` 对象、`Headers` 对象上。
*  `fetch()` 通过数据流（Stream 对象）处理数据，对于请求大文件或者网速慢的场景相当有用。`XMLHttpRequest` 没有使用数据流，所有的请求都必须完成后才拿到
*  在默认情况下 `fetch` 不会接受或者发送 `cookies`

## 2. fetch(url, optionObj) 基本使用
* 接收第一个参数为请求的 `url`，默认的请求方式是 `get`。
* 第二个是可选参数 `optionObj`，可以控制不同配置的属性，比如 `method：`属性是字符串。` headers`: 一个对象，可以设定 http 的请求头。`body`: `POST` 请求的数据体，属性也是字符串。`credentials` 表示是否可以携带 `cookie`，`includes`表示是否同源都包含 `cookie`。
* `fetch` 参数没有同步的设定，因为 `fetch` 是基于  `promise` 封装的本身就是异步。
* `fetch` 虽然使用的是 `promise` 封装的，但是 `catch` 函数不能直接的捕获到错误，需要在第一个 `then` 函数内做些操作。

__一个 get 请求__
``` js
const pro = fetch('https://lyypro.gitee.io/blog/')
pro.then( response => 
    response.json()
).then( res =>
    console.log(res)
).catch( err => {
    console.log(err)
})
```
__一个 post 请求__
``` js
const URL =  'https://lyypro.gitee.io/blog/'
const init = {
    method: 'POST',
    header: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: 'id=12&name=林一一',
    credentials: 'include'
}
const pro = fetch(URL, init)
pro.then( response => 
    response.json()
).then( res =>
    console.log(res)
).catch( err => {
    console.log(err)
})
```

> 上面的请求都可以使用 `await, async` 来修改这里不展示。同时是为 `post` 请求中，`data` 属性只支持字符串，我们可以使用

## 4. fetch 的三个模块
* `Response` 模块：`fetch` 请求发送后，会得到一个服务器的响应 `response`，这个响应对于着 http 的回应。
* `Request` 模块：这是用于请求服务器的模块，上面提到的 `data, header, method` 都是 `Request` 模块的属性。
* `Headers`，这是一个在 `Response.headers`上的属性用于操控响应头的信息。
> 上面三者的详细属性可以看看 [阮老师的 Fetch API 教程](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

## 5.思考 fetch 发送 2 次请求的原因
>fetch 发送 post 请求的时候，总是发送 2 次，第一次状态码是 204，第二次才成功？原因很简单，因为你用 fetch 的 post 请求的时候，导致 fetch 第一次发送了一个 Options请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的
请求

## 6.思考 fetch  的缺点
> 1. `fetch` 的 `get/head` 请求不能设置 `body` 属性
> 2. `fetch` 请求后，服务器返回的状态码无论是多少包括(4xx, 5xx)，`fetch` 都不认为是失败的，也就是使用 `catch` 也不能直接捕捉到错误，需要再第一个 `then` 中做一些处理。

# 四、面试题
> 封装原生的 Ajax
### 1.实现一个 Ajax。
> 将原生的 ajax 封装成 promise
``` js
var myNewAjax = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && readyState == 4) {
                var json = JSON.parse(xhr.responseText);
                resolve(json)
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                reject('error');
            }
        }
    })
}
```

### fetch VS ajax VS axios 区别

### 140，如何实现 ajax 请求，假如我有多个请求，我需要让这些 ajax 请求按照某种顺序一次执行，有什么办法呢？如何处理 ajax 跨域
> https://www.nowcoder.com/tutorial/96/7bf81ef089184fdebeec58822b6e93fd

### 141，如何实现一个 ajax 请求？如果我想发出两个有顺序的 ajax 需要怎么做？

### 142，Fetch 和 Ajax 比有什么优缺点？


# 五、参考
[Fetch API 教程](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)
[MDN fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

[ajax](https://juejin.cn/post/6844904114896240647)
[Ajax原理一篇就够了](https://github.com/ljianshu/Blog/issues/45)
[ajax常见面试题](https://juejin.cn/post/6844903573529034759)

# 六、实战篇，自己封装一个 promise 版的 ajax
[我是怎样使用promise封装ajax成一个简单版的axios的]()




