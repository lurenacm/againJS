var longestCommonSubsequence = function(text1, text2) {
    let q = []
    for (let index = 0; index < text1.length; index++) {
        text2.includes(text1[index]) ? q.push(text1[index]) : null
    }
    console.log(q)
    return q.length
};

let res = longestCommonSubsequence('abcdefg', 'abdeg')
console.log(res)