``` js
(function () {
    let model = document.getElementsByClassName('model'),
        text = document.getElementsByClassName('text'),
        topCenter = document.getElementsByClassName('topCenter')

    // winW,winH窗口大小，modelW，modelH 盒子大小
    let winW = document.documentElement.clientWidth,
        winH = document.documentElement.clientHeight,
        modelW = model[0].offsetWidth,
        modelH = model[0].offsetHeight,
        top = (winH - modelH) / 2,
        left = (winW - modelW) / 2;

    model[0].style = `top:${top}px; left:${left}px`
    text[0].addEventListener('click', function () {
        model[0].style = 'display: none'
    })

    // 第一步：等待鼠标按下的时刻，拖拽开始前，记录盒子和鼠标的位置。
    let that = null
    let dragStart = function (ev) {
        that = this
        that.myAttr = {
            startX: ev.clientX,
            startY: ev.clientY,
            startLeft: left,
            startTop: top
        }
        model[0].addEventListener('mousemove', dragMove)
    }

    // 第二步：鼠标按下拖动的
    let dragMove = function (ev) {
        let {
            startX,
            startY,
            startLeft,
            startTop
        } = that.myAttr
        // 当前的盒子位置 =  当前鼠标位置 - 起始鼠标位置 + 起始盒子的位置
        let curL = ev.clientX - startX + startLeft,
            curT = ev.clientY - startY + startTop;

        // 控制边界的范围
        let minL = 0,
            minT = 0,
            maxL = winW - modelW,
            maxT = winH - modelH;

        curL =  curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

        model[0].style = `top:${curT}px; left:${curL}px`
    }

    // 第三步：鼠标松开时刻，移除监听的移动事件
    let dragEnd = function () {
        model[0].removeEventListener('mousemove', dragMove)
    }

    topCenter[0].addEventListener('mousedown', dragStart)

    topCenter[0].addEventListener('mouseup',dragEnd)

})()
```
> 上面的效果基本已经实现了，但是鼠标快速移动的时候，会导致失焦，拖拽的模块跟不上的 bug。

* 怎么解决上面的bug呢？我门只需要将鼠标的移动的监听事件绑定到 `document` 文档就行了。


参考：
[鼠标拖拽](https://juejin.cn/post/6844904061339172877)