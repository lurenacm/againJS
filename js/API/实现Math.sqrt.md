## 二分法
``` js
  function mySqrt(n) {
    if (typeof n !== 'number') return
  
    let low = 0
    let height = n
    let mid = (low + height) / 2
    let preMid = null
    do {
      if (mid * mid > n) {
        height = mid
      } else {
        low = mid
      }
      preMid = mid
      mid = (low + height) / 2
    } while (Math.abs(preMid - mid) > 1e-15)
    return parseFloat(mid.toFixed(15))
  }
```