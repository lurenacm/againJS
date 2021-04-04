## 一、Ajax
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
let xhr = XMLHttpRequest()
xhr.open('get', 'api')
xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){   // readyState: ajax 状态，status：http 请求状态
        xhr.responseText;   //响应主体
    }
}
xhr.send()
```
### 4. Ajax 状态和 HTTP 状态码
* Ajax 状态一共有5种，分别是`0, 1, 2, 3, 4`
>- 状态 0：`UNSENT`，刚创建的 `XMLHttpRequest` 实例，还没有发送
>- 状态 1：`OPENED`，已经执行了上面的 `open` 操作。
>- 状态 2：`HEADERS_RECEIVED`，标识已经发送的 ajax 请求。
>- 状态 3：`LOADING`，表示响应的主体内容正在返回
>- 状态 4：`DONE`，表示响应的主体内容已经被客户端接收。

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
>7. `statusText`: 属性保存的状态码是 以字符串表示
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

## 封装原生的 Ajax
### 1. 参考 jQuery
``` js

```










