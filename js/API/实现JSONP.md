### JSONP
> JSONP 实现跨域的原理：利用 script 标签不存在跨域的限制，请求数据信息。
``` js
// 本地的地址是 http://localhost:3000
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
> 本地的代码请求了一个域名和协议都不相同的地址，就会造成跨域，但是利用浏览器不对 script 标签请求限制实现跨域请求。

#### JSONP 具体实现跨域原因
一开始客户端向服务器发送了一个带有回调函数的url请求链接，比如
``` js
<script src="http://168.0.0.1/api/list?callback=func">
```
服务端接收到这个`callback`函数后执行，准备客服端需要的数据传递给客服端。浏览器接收到数据后执行服务器返回的回调函数。这个回调函数是一个全局下的函数。

#### 模拟实现 JSONP 的跨域请求函数
* 创建一个 script 标签，url 链接后面问号`?`携带一个回调函数必须是一个全局函数。例如上面的`http://168.0.0.1/api/list?callback=func`。
``` js
// 客户端 index.js
function jsonp(url, callback) {
    let script;
    url = url.includes('?') ? `${url}&${callback}` : `${url}?${callback}`
    script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    // window['callback'] = callback
    // 这里加一层判断，callback 是否有放回值
    window['callback'] = (data) =>{
        callback && callback(data)
        delete window['callback']
    }
}

jsonp('http://127.0.0.1:3000', (data) => {
    console.log(data)
})

// server.js
let express = require('express')
let app = express()
app.get('/', function(req, res) {
  let {callback} = req.query
  console.log(callback)
  let data = {
    a: 12
  }
  res.send(`callback(${JSON.stringify(data)})`)
})
app.listen(3000, () => {
  console.log('ok')
})
```
> 特别注意，浏览器获取到 `callback(${JSON.stringify(data)})` 后发现这段代码是字符串函数，会解析字符串函数后会在全局环境下执行这段代码，所以我们需要在全局环境 `window` 中先挂载这个函数。

#### JSONP 缺陷
> JSONP 的缺点也很明显，JSONP 利用的是 script 标签实现的跨域请求，但是 script 标签只能发送 GET 请求，不能发送 POST 等请求。