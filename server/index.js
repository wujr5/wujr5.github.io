const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const https = require('https')

const port = 50501

const httpsOption = {
  key : fs.readFileSync(__dirname + '/ssl/5267232_handan.wanweitech.xyz.key'),
  cert: fs.readFileSync(__dirname + '/ssl/5267232_handan.wanweitech.xyz.pem')
}

const app = express();

// 新京报，报纸阅读转发
app.use('/ipaper', createProxyMiddleware({
  target: 'http://appimg2.tbnimg.com/',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

https
  .createServer(httpsOption, app)
  .listen(port, () => {
    console.log('服务监听端口：', port)
  })
