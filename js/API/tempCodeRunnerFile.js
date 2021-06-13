class Person{
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    say(){
        console.log(this)
    }
}
let person = new Person('a', 12)
let say = person.say
say()