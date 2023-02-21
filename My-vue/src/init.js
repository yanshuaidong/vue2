// 初始化
import { initState } from './state'

export function initMixin(Vue){
  Vue.prototype._init = function (options){
    const vm = this
    vm.$options = options //将用户的选项挂载到实力上
    /*
    数据： data，props，propsdata，computed，methods，watch
    DON: el，template，render，rebderError
    生命周期钩子函数：beforeCreate，created，beforeMount，mounted，beforeUpdate，updated，activated，deactivated，beforeDestroy，destroyed，erroCaptured。
    资源：directives，filters，components
    组合：parent，mxins，extends，provide，inject
    */ 
    // 初始化状态 如 data props watch 
    initState(vm)
  }
}


