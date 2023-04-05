const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`)


// 多模板进行编译处理
export function compileToFunction(template){
  // 1、将template转化成ast语法树
  // 2、生成render方法（render方法返回的结果就是虚拟dom）
  console.log(template);
}

