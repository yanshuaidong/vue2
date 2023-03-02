
let oldArrayProto =  Array.prototype;
export let newArrayProto = Object.create(oldArrayProto);

const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice',
];

methods.forEach(method =>{
  newArrayProto[method] = function(...args){
    const result = oldArrayProto[method].call(this,...args)
    console.log("method",method)
    let inserted;
    let ob = this.__ob__;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    // 劫持对象
    if(inserted){
      ob.observeArray(inserted)
    }
    return result;
  }
});


/*

在array.js文件的劫持对象中如何调用observe/index.js文件中Observer对象的observeArray方法呢？

在构造Observe对象的时候将执行data.__ob__ = this;将Observe对象（this）注入到arr对象上的__ob__属性。


解决栈溢出问题；
变成不可枚举。
*/ 

