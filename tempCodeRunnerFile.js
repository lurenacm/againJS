let data = []
for (var i = 0; i < 3; i++) {
    data[i] = (function (j) {
        return function () {
            console.log(j);
        }
    })(i)
}