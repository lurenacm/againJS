(function () {
    // 配置默认属性
    let defaultConfigs = {
        url: null,
        baseUrl: null,
        method: 'GET',
        body: null,
        dataType: 'JSON',
        params: null,   // get 请求中的 ? 传参
        headers: {},
        cache: false    // catch用于缓存，catch 在 axios 中没有。
    }

    let promiseAjax = function promiseAjax(optionsConfigs={}) {

        let {url, method ='GET', baseUrl, body, dataType, params, headers, cache} = optionsConfigs
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open(method, url=baseUrl+url)
            // 判断和设置请求头
            if(headers !== null && typeof headers == 'object'){
                
            }
            xhr.send(body)
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4 && xhr.status === 200){
                    dataType = dataType.toUpperCase()
                    let res = dataType === 'JSON' ? JSON.parse(xhr.responseText) : (dataType === 'xml' ? xhr.responseXML : null)
                    resolve(res, xhr)
                }
                reject(xhr.statusText, xhr)
            }
        })
    }

    // 提供外部的默认配置选项
    promiseAjax.defaultConfigs = defaultConfigs

    promiseAjax.get = function (url, config) {

    }

    promiseAjax.post = function (url, data, config) {

    }

    promiseAjax.head = function () {

    }

    window.promiseAjax = promiseAjax
    
})(window)
