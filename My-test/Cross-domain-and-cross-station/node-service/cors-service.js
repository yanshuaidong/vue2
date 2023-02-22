const http = require('http');

const app = http.createServer(async (req, res) => {
  // 跨域支持
  // 放行指定域名
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.setHeader('Access-Control-Allow-Headers', '*')
  // 允许携带cookie
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  // 允许方法
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  let { method, url } = req
  // 对预检请求放行
  if (method === 'OPTIONS') {
    return res.end()
  }
  console.log(method, url)
  res.end('success')
});

app.listen(3000 ,err => {
  console.log(`listen 3000 success`);
})
