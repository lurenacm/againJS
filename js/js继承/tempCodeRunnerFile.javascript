function Parent(){
    this.name = 'parent'
}

Parent.prototype.getParentName = function() {
    console.log('Parent')
}

function Child(){
    this.name = '一一'
    var name = '二二'
}

Child.prototype = new Parent

Child.prototype.getChildName = function() {
    console.log('Child')
}

var c1 = new Child

console.log(Child.prototype.__proto__)
// console.log(c1)