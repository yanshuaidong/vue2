// 6、新建好了文件，当然别忘了我们新建这个文件的目的，做数据劫持，响应式数据。
class Observer{
  constructor(data){
    // new 对象的时候会走到这里。
    this.walk(data);
  }
  walk(data){//循环对象对属性依次劫持。
    // 重新定义属性
    Object.keys(data).forEach(key => {
      defineReactive(data,)
    });
  }
}


export function observe(data){
  // 7、一个好的模块需要首先需要对输入的数据做判断。如果输入的数据不是对象，我们就跳出当前方法。上一层。
  if(typeof data !== "object" || data == null){return}
  // 8、第二个要考虑的点就是不做重复工作，如果一个对象已经被劫持了，我们就不做劫持了。浏览器没有给我们这样的api，官方替我们是靠了一种办法，用实例来判断是否被劫持过。
  
  console.log(data);
  // 9、我们需要创建一个类，用来观测数据如果数据被观测过，那么实例就是这个类。这听起来很怪。
  return new Observer(data);
}