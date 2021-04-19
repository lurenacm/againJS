## Factory 模式
> 工厂模式实现调用切换，或者做一些中转处理。
``` js
function factory(options = {}) {
    let {
        type,
        toDo
    } = options
    if (type === 'object') {
        toDo()
    }
    if (type === 'array') {
        toDo()
    }
}

factory({type:'array', toDo:() => {
    // do something
}})

factory({type:'object', toDo:() => {
    // do something
}})
```
> 对不同的情况做处理，再加工处理。