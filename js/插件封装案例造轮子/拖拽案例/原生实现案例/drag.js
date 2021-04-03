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
    let moveStatus = false
    let dragStart = function (ev) {
        that = this
        that.myAttr = {
            startX: ev.clientX,
            startY: ev.clientY,
            startLeft: left,
            startTop: top
        }

        document.addEventListener('mousemove', (ev) => {
            moveStatus = true
            dragMove(ev)
        })
    }

    // 第二步：鼠标按下拖动的
    // 当前的盒子位置  =  当前鼠标位置 - 起始鼠标位置 + 起始盒子的位置
    let dragMove = function (ev) {
        if (!moveStatus) return
        let {
            startX,
            startY,
            startLeft,
            startTop
        } = that.myAttr
        let curL = ev.clientX - startX + startLeft,
            curT = ev.clientY - startY + startTop;
        controlScope(curL, curT)

        topCenter[0].addEventListener('mouseup', dragEnd)
    }

    // 控制边界的范围
    function controlScope(curL, curT) {
        let minL = 0,
            minT = 0,
            maxL = winW - modelW,
            maxT = winH - modelH;

        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);

        model[0].style = `top:${curT}px; left:${curL}px`
    }

    // 第三步：鼠标松开时刻，移除监听的移动事件
    let dragEnd = function () {
        moveStatus = false
        topCenter[0].removeEventListener('mousemove', dragMove)
    }

    topCenter[0].addEventListener('mousedown', (ev) => {
        dragStart(ev)
    })

})()


Function.prototype.myBind = function myBind(context, ...arg) {
    var _this = this    // 获取调用 myBind 的函数主体
    return (...otherArg) => {      // 返回的新函数，是调用 myBind 函数的拷贝
        _this.call(context, ...arg.concat(...otherArg))          // 利用 apply 原理，改变 this 指向，同时执行返回的新函数。
    }
}