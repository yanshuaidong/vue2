import { initState } from './state'
import { compileToFunction } from './compiler/index.js'
export function initMixin(Vue){
  Vue.prototype._init = function (options){
    const vm = this
    vm.$options = options
    // 初始化状态
    initState(vm)
    if(options.el){
      vm.$mount(options.el);// 实现数据的挂载
    }
  }
  Vue.prototype.$mount = function(el) {
    const vm = this;
    let opts = vm.$options
    el = document.querySelector(el);
    if(!opts.render){
      let template;
      if(!opts.template && el){//没写模板，写了el
        template = el.outerHTML
      }else{
        if(el){
          template = opts.template
        }
      }
      // 写了template 就用写了的template
      if(template){
        // 这里需要对模板进行编译
        const render = compileToFunction(template);
        opts.render = render;
      }
      // typeof template  is string
      // console.log();
    }
    opts.render; //之后就可以获取render方法
  }
}


