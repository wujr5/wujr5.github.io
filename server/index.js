const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
const port = 50501

// 新京报，报纸阅读转发
app.use('/ipaper', createProxyMiddleware({
  target: 'http://appimg2.tbnimg.com/',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
