
import { observe } from './observe/index'
// 初始化数据
export function initState (vm){
  const opts = vm.$options; //options有很多属性props watch data 声明周期钩子。。。
  if(opts.data){
    initData(vm)
  }
}

function proxy(vm,target,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[target][key];
    },
    set(newValue){
      vm[target][key] = newValue
    }
  })
}


function initData (vm){
  let data = vm.$options.data //data可能是对象和函数
  data = typeof data === 'function' ? data.call(vm) : data;
  // 1、拿到数据后，我们需要对数据进行劫持。那如何对数据进行劫持？我们有一个api。defineProperty。https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/object/defineproperty
  // 2、我们希望写一个方法来完成我们的功能（劫持数据）。方法名为：observe。方法名也可以叫：hijack。或者叫 helpMeHijackAllData。当然这是个很“丑”的名字，虽然它很能表达作者的意图。
  // 3、名字暂定为observe，它需要帮助我们劫持数据，所以需要我们传入要被劫持的数据。例如{name:jack,age:18}。
  // 4、我们希望劫持数据这个功能是个单独的模块，所以我们新建一个文件夹 名为observe。
  vm._data = data;
  observe(data)
  for (let key in data){
    proxy(vm,"_data",key)
  }
}