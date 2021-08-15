class EventEmitter {
  constructor() {
      this.events = {};
  }
  // 实现订阅
  on(type, callBack) {
      if (!this.events[type]) {
          this.events[type] = [callBack];
      } else {
          this.events[type].push(callBack);
      }
  }
  // 删除订阅
  off(type, callBack) {
      if (!this.events[type]) return;
      this.events[type] = this.events[type].filter((item) => {
          return item !== callBack;
      });
  }

  // 只订阅一次事件
  once(type, callBack) {
      function fn() {
          callBack();
          this.off(type, fn);
      }
      this.on(type, fn);
  }


  // 触发事件
  emit(type, ...rest) {
      this.events[type] &&
          this.events[type].forEach((fn) => fn.apply(this, rest));
  }
}

// 使用如下
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});

class EventEmitter{
  constructor(){
      this.event = {}
  }
  
  on(type, callback){
      if(!this.event[type]){
          this.event[type] = [callback]
      }else{
          this.event[type].push(callback)
      }
  }
  
  off(type, callback){
      if(!this.event[type]) return
      this.event[type] = this.event[type].filter(item => {
         return item !== callback
      })
  }
  
  once(type, callback){
       function fn(){
           callback()
           this.off(type, fn)
       }
      this.on(type, fn)
  }
  
  
  emit(type, ...arg){
      this.event[type] && this.event[type].map(callback => callback.call(this, ...arg))
  }
}