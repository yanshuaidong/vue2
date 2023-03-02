import { newArrayProto } from "./array.js";
class Observer{
  constructor(data){
    Object.defineProperty(data,"__ob__",{
      value:this,
      enumerable:false,//将__ob__变成不可枚举，不可循环，不可取值
    })
    if(Array.isArray(data)){
      
      data.__proto__ = newArrayProto;
      this.observeArray(data)
    }else{
      this.walk(data);
    }
  }
  walk(data){
    Object.keys(data).forEach(key => {
      defineReactive(data,key,data[key])    
    });
  }
  observeArray(data){
    data.forEach(item => {
      observe(item)
    })
  }
}
export function defineReactive(target,key,value){
  observe(value)
  Object.defineProperty(target,key,{
    get(){
      return value;
    },
    set(newValue){
      if(newValue === value) return ;
      observe(newValue)
      value = newValue;
    }
  })
}

export function observe(data){
  if(typeof data !== "object" || data == null){return}
  if(data.__ob__ instanceof Observer){
    return data.__ob__;
  }
  return new Observer(data);
}
