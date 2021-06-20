function Dog(name) {
    this.name = name
}

Dog.prototype.bark = function() {
    console.log('wang wang')
}

Dog.prototype.sayName = function() {
    console.log('my name is ' + this.name)
}

function _new() {
    // code
    return new arguments[0](arguments[1])
}

let sanmao = _new(Dog, '三毛')
sanmao.bark();  // => 'wang wang'
sanmao.sayName(); // => 'my name is 三毛'
console.log(sanmao instanceof Dog)  // true