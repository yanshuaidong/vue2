
// 初始化数据
export function initState (vm){
  const opts = vm.$options; //options有很多属性props watch data 声明周期钩子。。。
  if(opts.data){
    initData(vm)
  }
}

function initData (vm){
  let data = vm.$options.data //data可能是对象和函数
  data = typeof data === 'function' ? data.call(vm) : data;
  console.log(data);
}