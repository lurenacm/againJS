## Iterator 迭代器
> iterator 迭代器是一个规范，是一个接口，任务数据结构只要拥有迭代器规范的，都可以执行遍历的操作。
* 在浏览器中并没有 iterator 这个类的。
* 每一个 iterator 都有一个 `next()` 方法用于遍历数据结构的成员
* iterator 还具备一个对象 `{done:boolean, value:xxx}`。done表示是否遍历完成，value 表示返回的值


