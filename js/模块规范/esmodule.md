# es module
> es 提供的模块化导入导出依赖 `import from` 和 `export/module.export`


## export 导出
> export 是一个对象
* export 可以导出多个变量，也可以使用 `export default param` 导出一个变量，`export default` 在一个文件内只能使用一次。使用 `export default` 导出的变量，导入可以直接获取不需要解构赋值。
* 
``` js
// a.js
export let a = 1
export let b = 2
// 等价于
// export {a, b}


// b.js
export default c = 1

// c.js
import cData from 'b.js
import {a, b} from 'a.js
```


## import from
> import from 引入文件
* **ES module 重要特点：import 导入的变量是只读的，导入的变量不能重新赋值，可以给对象添加属性，但是不能重盖原有的地址值**。 
* import 导入可以使用解构赋值，也可以将所有的属性都导入到一个对象中，例如` import * as obj from 'a.js'`
* import 具备声明功能，也就是说定义的解构赋值的不可以再用 `let/const` 重新声明。
* import 具备预解析，声明的变量可以提升到文件的顶部
* import 命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载
``` js
console.log(str)  // 能直接打印出 str 的值。
import {str, str1} from 'a.js'
let str1 = 1     // error。
```
