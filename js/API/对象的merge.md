### 对象
> 两个对象的合并的场景：接口请求，组件封装的参数处理等。下面对对象合并，其他类型直接做替换。
``` js
const option = {
    url: '',
    methods: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    data: {
        name: '林一一',
        age: 18,
        person: {
            sex: 'man'
        }
    },
    arr: [12, 34]
}
let param = {
    url: 'https://www.baidu.com/',
    arr: [10, 23],
    headers: {
        'self': 'aa'
    },
    data: {
        person: {
            action: 'keep move~'
        }
    }
}

function isObj(checkType) {
    let type = {}.toString.call(checkType).split(' ')[1].split(']')[0].toLowerCase();
    return type === 'object' ? true : false
}

function merge(option, param = {}) {
    for (const key in param) {
        let paramKey = isObj(param[key]);
        let optionKey = isObj(option[key])
        if (optionKey && paramKey) {
            option[key] = merge(option[key], param[key])
            continue
        }
        option[key] = param[key]
    }
    return option
}

let res = merge(option, param)
console.log('res', res)
/* 输出
res {
    url: 'https://www.baidu.com/',
    methods: 'GET',
    headers: { 'Content-Type': 'application/json', self: 'aa' },
    data: {
      name: '林一一',
      age: 18,
      person: { sex: 'man', action: 'keep move~' }
    },
    arr: [ 10, 23 ]
  }
*/
```