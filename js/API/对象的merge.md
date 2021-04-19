### 对象
> 两个对象的合并的场景：接口请求，组件封装的参数处理等。下面对对象合并，其他类型直接做替换。
``` js
const options = {
    url: '',
    methods: 'GET',
    herders: {
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

const param = {
    url: 'https://www.baidu.com/',
    headers: {
        'self': 'aa'
    },
    data: {
        person: {
            action: 'keep move~'
        }
    },
    [arr]: [10, 23]
}

function isObj(checkType) {
    let type = {}.toString.call(checkType).split(' ')[1].split(']')[0].toLowerCase();
    return type === 'object' ? true : false
}

function merge(option, param = {}) {
    let optionType = isObj(option),
        paramType = isObj(param);
    if (optionType && !paramType) throw new TypeError(`${param} must an be object`)
    for (const key in param) {
        let optionKey = isObj(option[key]),
            paramKey = isObj(param[key])
        if (optionKey && paramKey) {
            option[key] = merge(option[key], param[key])
            return
        }
        option[key] =  param[key]   // person.action
    }
    return option
}

let res = merge(option, param)
console.log('res', res)

```