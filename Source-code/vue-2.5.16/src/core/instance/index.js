import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// 你终于找到这里了 源码中没有什么class Vue 当面试官问你Vue是对象还是函数时，
// 你可以坚定的告诉他，我们new的Vue 是个函数。
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 搜索一下这个：Vue.prototype._init
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
// 因为前端的导入导出主要分为commonjs和ES6modules两种标准，其中commonjs主要用于node环境，而ES6modules主要用于浏览器环境，但是ES6modules是兼容commonjs标准的。
// 显然下面用的是ES6modules规则。默认导出。从vue的源码来看。ES6modules导出一个函数就是这样的。
export default Vue
