## Observer 观察者模式
> 定义：观测消息触达后做出的工作。vue2.0的响应式原理就使用了观察者模式。
__定义一个观察者模式，每一个观察者都有一个监听到的 `getMsg` 方法，这个 `getMsg` 方法是消息触达后做出的动作__
``` js
class Observer {
    // 观察消息接收后走出反应
    getMsg(msg){
        console.log('消息到达：', msg)
    }
}
```
### 示例二
> 创建一个具有增删查改功能的观察者，每一个观察者都有观察列表。
``` js

```

