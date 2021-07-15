> __大家好，我是林一一，下面这篇文章是关于 Ajax，fetch，axios的超高频面试题，一起来阅读吧🤗__

## 思维导图

![未命名文件.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9aee627c53f4ec3b837e3bb2cc97431~tplv-k3u1fbpfcp-watermark.image)

# 一、Ajax
### 1. 概念
> Ajax全称：async javaScript and xml。xml：是一种可以扩展的文本标记语言，可以扩展自定义的语义标签。很早以前 xml 常用于从服务端返回数据结构，现在基本都是使用 json 格式返回数据。


### 2. 作用
> 在不刷新全局的条件下，局部刷新页面。


### 3. 四步创建 Ajax
1. 创建 `Ajax`实例，`let xhr = new XMLHttpRequest()`，IE6 不兼容这种写法
2. 打开请求，配置请求前的配置项，共 5个参数，`xhr.open([http method], [url], [async], [userName], [userPass])`
> `http methods` 有常用的请求方式有，`post, get, delete, put, head, options, trace, connect`。`async` 代表异步，默认是 `true` 异步，`false` 是同步。`[url]`：是想服务器请求的 `api`。`[userName], [userPass]`，代表用户名和密码
 - __http methods 细分：delete：删除服务器端的某些数据，一般是文件。put：向服务器上存放某些内容，一般是文件，head：只是获取从服务器端返回的请求头信息，不要响应主体的内容。options：一般用于向服务器发送探测性请求，看是否连接成功__

3. 事件监听 `readystatechange`，一般监听 ajax 状态码发生改变的事件，这个事件可以获取服务器返回的响应主和请求头。`xhr.onreadystatechange = function (){}`，对于 `同步` 执行的 Ajax 请求代码步骤三要放在 `send` 的前面。否则没有意义。
4. 发送 ajax 请求，ajax 任务开始执行。`xhr.send([])`，`XMLHttpRequest.send()` 方法中如果 Ajax 请求是异步的则这个方法发送请求后就会返回，如果 Ajax 请求是同步的，那么请求必须知道响应后才会返回。
> 第五步算上的话，就是读取返回的数据 `xhr.responseText`。
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

### 4. Ajax 状态和 HTTP 状态码(高频考点)
* Ajax 状态一共有 5 种 `xhr.readyState`，分别是 `0, 1, 2, 3, 4`
>- 状态 0：`unsent`，刚创建的 `XMLHttpRequest` 实例，还没有发送。
>- 状态 1：（载入）已调用 `send()` 方法，正在发送请求。
>- 状态 2：（载入完成）`send()` 方法执行完成，已经接收到全部响应内容
>- 状态 3：`loading`，（交互）正在解析响应内容
>- 状态 4：`done`，表示响应的主体内容解析完成，可以在客户端调用了

* HTTP 常见的状态码。
>- `2xx`：表示请求已经被服务器接收，理解，请接受。常见的有，`200` 表示ok，表示服务能够返回信息。`204` No Content 无内容。服务器成功处理，但未返回内容。
>- `3xx`：一类重要的高频考点，`301`：表示永久转移，返回旧域名会跳转到新域名。`302`：临时转移。一般用于服务器负载均衡，但服务器的并发数达到最大时，服务器会将后续访问的用户转移到其他服务器上去。`307`：表示临时重定向。`304`：表示不设置缓存，对于不经常更新的文件，例如`css/js/html文件`，服务器会结合客户端设置`304`状态，加载过的资源下次请求时会在客户端中获取。
>- `4xx`：表示语义有误，请求无法被服务器端理解。`400`：表示请求的参数错误。`401`：表示无权限访问。`404`：表示请求的资源不存在。`413`：表示和服务器的交互过大。
>- `5xx`：服务器端出错。`500`：表示服务器端出现未知的错误。`503`：服务器超负荷。


### 5. ajax 中常用的属性和方法
>1. `onabort`: 表示请求中断后要处理的事。和 `xhr.abort()` 一起使用。
>2. `ontimeout`: 表示请求的超时，执行的方法。和 `timeout` 设定的事件一起使用。
>3. `response`: 响应的主体内容。
>4. `responseText`: 响应的具体内容是字符串，一般是 json 字符串
>5. `responseXML`: 响应的具体内容是文档。
>6. `status`: http 的状态码。
>7. `statusText`: 状态码描述
>8. `withCredentials`：表示是否允许携带凭证 cookie。
>9. `getAllResponseHeaders`：获取所有响应头信息。
>10. `xhr.open()`：打开URL请求。
>11. `xhr.send()`：表示发送 ajax。
>12. `setRequestHeader()`: 设置请求头。这个属性在必须在`xhr.open()`后面。

#### 思考
1. `post` 和 `get` 有什么区别。
>`http` 的所有请求方法中都可以从服务端获取数据，和传递内容。`get`：主要是从服务器获取数据。`post` 主要发送数据给服务器。
 `GET` 和 `POST` 本质上就是 `TCP` 链接，并无差别，但是由于 HTTP 的规定和浏览器/服务器的限制具体由如下的区别。
* 从 `缓存` 的角度上说，`get` 请求会被浏览器默认缓存下来，而 `post` 请求默认不会。
* 从 `参数` 来说，`get` 请求的参数一般放在 `url` 中，`post` 请求是放在请求主体中，因此 `post` 请求更安全一些。
* 从 `TCP` 上来说，`GET` 产生一个 `TCP` 数据包；`POST` 产生两个 `TCP` 数据包。对于GET方式的请求，浏览器会把 `http header` 和 `data` 一并发送出去，服务器响应 200（返回数据）；而对于`POST`，浏览器先发送 `header` 请求头，服务器响应 `100 continue`，浏览器再发送 `data`，服务器响应 200 ok（返回数据）。虽然 post 请求需要发送两次，但是时间上是基本差别不大的。还有并不是所有浏览器都会在POST中发送两次包，`Firefox 就只发送一次`。


1. 来一道思考题，求输出结果
``` js
let xhr = new XMLHttpRequest()
xhr.open('post', 'api')
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
> 如果知道任务队列的概念，不难知道输出的结果，因为是异步请求，所以同步的主任务先输出`3`，最后输出 `2, 4`。如果上面`xhr.open('post', 'api')` 变成 `xhr.open('post', 'api', false)` 后代码就是同步的，任务队列中只有主任务输出的结果变成 `2, 4, 3`。

2. 再来一道思考题，在同步请求中下面代码输出的是什么
``` js
let xhr = new XMLHttpRequest()
xhr.open('get', 'xxx', false)
xhr.send()

xhr.onreadystatechange = () => {
    console.log(xhr.readyState)
}
```
> 上面的结果什么也没有输出，这里涉及到任务队列的知识，`onreadystatechange` 这个事件监听的是 ajax 状态码的变化，上面的同步请求中 `xhr.send()` 已经执行完后 ajax 的状态码由 0 变成了 4 还没有执行到 `onreadystatechange` 这个监听事件，所以没有输出结果。如果将监听事件放在 `xhr.send()` 之前，那么输出的就是 4。

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
> `axios.all()` 可以实现多个请求，且请求都需要在完成后才再去做某事。
``` js
let requestArr = [axios.get('apiURL/1'), axios.get('apiURL/2'), axios.post('apiURL/3', {id: 3})]
axios.all(requestArr).then(res => {
    console.log(res)
})
```
### 思考，axios.all() 是怎么实现并发请求的？
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
* `fetch`：是 `http` 的数据请求方式，是 `XMLHttpRequest` 的一种代替方案，没有使用到 `XMLHttpRequest` 这个类。`fetch` 不是 ajax，而是原生的 js。`fetch()` 使用 `Promise`，不使用回调函数。`fetch` 是 ES8 中新增的 api，兼容性不是很好，IE 完全不兼容 `fetch` 写法。
* `fetch()` 采用模块化设计，API 分散在 `Response` 对象、`Request` 对象、`Headers` 对象上。
* `fetch()` 通过数据流（Stream 对象）处理数据，对于请求大文件或者网速慢的场景相当有用。`XMLHttpRequest` 没有使用数据流，所有的请求都必须完成后才拿到
* 在默认情况下 `fetch` 不会接受或者发送 `cookies`。


## 2. fetch(url, optionObj) 基本使用
* 接收第一个参数为请求的 `url`，默认的请求方式是 `get`。
* 第二个是可选参数 `optionObj`，可以控制不同配置的属性，比如 `method：` 属性是字符串。` headers`: 一个对象，可以设定 http 的请求头。`body`: `POST` 请求的数据体，属性也是字符串。`credentials` 表示是否可以携带 `cookie`，`includes` 表示是否同源都包含 `cookie`。
* `fetch` 参数没有同步的设定，因为 `fetch` 是基于  `promise` 封装的本身就是异步。
* `fetch` 虽然使用的是 `promise` 封装的，但是 `catch` 函数不能直接的捕获到错误，需要在第一个 `then` 函数内做些操作。
> `fetch` 发送 post请求时，当发生的是跨域请求，`fetch` 会先发送一个 `OPTIONS` 请求，来确认服务器是否允许接受请求，这个请求主要是用来询问服务器是否允许修改header头等一些操作。服务器同意后返回 204，才会发送真正的请求。没有发生跨域的情况下不会产生两次请求。

__一个 get 请求__
``` js
const pro = fetch('https://lyypro.gitee.io/blog/')
pro.then( response => 
    response.json()
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

## 5.思考 发送 post 2 次请求的原因
> 使用 `fetch` 发送 `post` 请求时如果是跨域，那么导致 `fetch` 第一次发送了一个`Options` 请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求。

## 6.思考 fetch  的缺点
> 1. `fetch` 的 `get/head` 请求不能设置 `body` 属性。
> 2. `fetch` 请求后，服务器返回的状态码无论是多少包括(4xx, 5xx)，`fetch` 都不认为是失败的，也就是使用 `catch` 也不能直接捕捉到错误，需要再第一个 `then` 中做一些处理。

# 四、面试题
> 封装原生的 Ajax
## 1.实现一个 Ajax。
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
## 2. ajax 有几个状态，分别代表什么？
> ajax 5个状态向上看。

## 3. fetch VS ajax VS axios 区别
* 传统的 `ajax` 利用的是 `XMLHttpRequest` 这个对象，和后端进行交互。`JQuery ajax` 是对原生 `XHR` 的封装，多请求间有签到的话就会出现回调地狱的问题。
* `axios` 使用 `promise` 封装 `xhr`，解决了回调地狱问题
* `fetch` 不是 `XMLHttpRequest`，`fetch` 是原生的 js，使用的是 `promise`。

## 4. Fetch 和 Ajax 比有什么优点？
> fetch 使用的是 promise 方便使用异步，没有回调地狱的问题。

## 5. 如何实现一个 ajax 请求？如果我想发出两个有顺序的 ajax 需要怎么做？
> 实现 ajax 的请求就是上面的创建 ajax 的四个步骤。实现两个有顺序的 ajax 可以使用 `promise.then()`

## 6. Ajax 怎么解决浏览器缓存问题
* 设置请求头，在 ajax 发送请求前加上 `anyAjaxObj.setRequestHeader("If-Modified-Since","0")` 或 `anyAjaxObj.setRequestHeader("Cache-Control","no-cache")`。
* 在 URL 后面加上一个随机数：` "fresh=" + Math.random()`。 或在后面加上时间搓：`"nowtTime=" + new Date().getTime()`。
* 如果是使用 jQuery，直接这样就可以了 `$.ajaxSetup({cache:false})`。这样页T面的所有 ajax 都会执行这条语句就是不需要保存缓存记录。

# 五、参考
[get和post的区别](https://www.oschina.net/news/77354/http-get-post-different)

[Fetch API 教程](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

[MDN XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

[MDN fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

# 六、结束
---
> __感谢阅读到这里，如果着篇文章能对你有一点启发或帮助的话欢迎  [star](https://github.com/lurenacm/againJS/issues), 我是林一一,下次见。__



