``` js
function myParserInt(params){
    let s 
    if(typeof params == 'number'){
         s = params.toString()
        return eval(s.split(".")[0])
    }else if(typeof params == 'string'){
        return eval(params.split(".")[0])
    }
     return NaN
}

console.log(myParserInt(123.99))
console.log(myParserInt("123.99"), typeof myParserInt("123.99"))
console.log(myParserInt({}))
console.log(myParserInt([]))
console.log("2323232", typeof "2323232")
```