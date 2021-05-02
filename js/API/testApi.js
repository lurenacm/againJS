function isObj(checkType) {
    let type = {}.toString.call(checkType).split(' ')[1].split(']')[0].toLowerCase();
    return type === 'object' ? true : false
}

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