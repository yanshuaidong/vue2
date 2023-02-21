echo "# vue2" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yanshuaidong/vue2.git
git push -u origin main

git remote add origin https://github.com/yanshuaidong/vue2.git
git branch -M main
git push -u origin main



"build": "rollup -cw"
c = config 使用配置文件 w = watch 监控

vue2 支持ie9 以上  Object.defineProperty 不支持低版本
proxy是es6，浏览器不支持proxy就不能用vue3
rollup是什么？
是打包工具，帮我们生成vue。js


1、vue的核心特点是什么？
响应式的数据变化。

2、简单说一下响应式数据变化？
响应式的数据变化。就是数据变化了我们可以监控到数据的变化，比如取值，赋值

3、
![dfa](../img/vueclassfunction.png)

