let str = '5 1 2 3 4 5'
let arr = str.split(" ").map( item => {
    return parseInt(item)
})
// console.log(arr)
if(arr[0] !== 0){
   let sum = 0
   for(let i=1; i<=arr[0]; i++){
       console.log(arr[i])
       sum = sum + arr[i]
   } 
   console.log(sum)
}