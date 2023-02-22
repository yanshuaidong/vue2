const http = require("http");
const app = http.createServer((req,res)=>{
  const jsonData = {
    name: "jack",
    age: 18
  }
  res.end(`diyCallBackFun(${JSON.stringify(jsonData)})`);
})
app.listen(3000)