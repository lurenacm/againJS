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

        let {url, method ='GET', baseUrl, body, dataType, params, headers, cache = false} = optionsConfigs
        
        _classMethod(method, params, data, cache)

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open(method, url=baseUrl+url)
            // 判断和设置请求头
            if(headers !== null && typeof headers == 'object'){
                for (const key in object) {
                    if (object.hasOwnProperty(key)) {
                        const value = object[key];
                        xhr.setRequestHeader(key, value)
                    }
                }
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

    // 循环定义methods 的请求方法。
    ['get', 'head', 'delete'].forEach(item => {
         promiseAjax[item] = function anonymous (url, options={}) {
            options = {...defaultConfigs, ...options, url: url, method: item.toUpperCase()}
            return promiseAjax(options)
         }
    });

    ['post', 'put', 'patch'].forEach(item => {
        promiseAjax[item] = function anonymous (url, options={}, data={}) {
           options = {...defaultConfigs, ...options, url, method: item.toUpperCase(), data}
           return promiseAjax(options)
        }
   });

    function _classMethod(method, params, data){
        switch (method.toUpperCase) {
            case 'GET':
                url = params ? (url+_checkSymbol(url)+_formatObj(params)): url;
                cache === false ? url+_checkSymbol(url)+'_='+new Date() : null;
                data = null;
                break;
            case 'POST':
                data ? _formatObj(data) : null
                break;
            default:
                break;
        }
    }

    function _formatObj(obj) {
        let str = ''
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                str = str+'='+object[key]+'&'
            }
        }
        return str.substring(0, str.length-1)
    }

    function _checkSymbol(url){
        return url.indexOf('?')>-1 ? null : '?'
    }

    window.promiseAjax = promiseAjax
})(window)
