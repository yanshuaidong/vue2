// 引入插件
import babel from 'rollup-plugin-babel'
// rollup默认可以导出一个对象，作为打包的配置文件
export default {
  input: './src/index.js',//入口
  output: {
    file: './dist/vue.js',//出口
    // 全局增加vue
    name: 'Vue',//global。Vue
    format: 'umd',// esm es6  commonjs node中用， iife自执行函数。 umd 在全局上挂载Vue变量。
    sourcemap: true,//希望可以调试原代码
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // 排除node-modules所有文件
    })
  ]
}