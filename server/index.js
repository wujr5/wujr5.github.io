const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const https = require('https')
const superagent = require('superagent')
const cheerio = require('cheerio')

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

// 人民日报，报纸阅读转发
app.use('/rmrb', createProxyMiddleware({
  target: 'http://paper.people.com.cn/',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

// 经济日报，报纸阅读转发
app.use('/jjrb', createProxyMiddleware({
  target: 'http://paper.ce.cn/',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

// 羊城晚报，报纸阅读转发
app.use('/epaper', createProxyMiddleware({
  target: 'http://ep.ycwb.com/',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

// 中国环境报，报纸阅读转发
app.use('/html', createProxyMiddleware({
  target: 'http://epaper.cenews.com.cn/',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

// 环球时报、参考消息
app.get('/hqck', (req, res) => {
  superagent
    .get('https://www.hqck.net/ckxx.html')
    .then((res0) => {
      let $ = cheerio.load(res0.text);
      let sTodayUrl = $('.jBoxBody li a')[0].attribs.href;

      let sBaseTodayUrl = sTodayUrl.substr(0, sTodayUrl.lastIndexOf('/') + 1);

      superagent
        .get(sTodayUrl)
        .then((res1) => {
          let $$ = cheerio.load(res1.text);
          let aPageUrl = [];

          let aOptions = $$('.newspaper > .paging > .pagelist > #dedepagetitles').children();
          aOptions.map((key, item) => {
            if (key > aOptions.length / 2 - 1) return;
            aPageUrl.push(sBaseTodayUrl + item.attribs.value);
          })

          let aPageText = Promise.all(aPageUrl.map((item) => {
            return superagent
              .get(item)
              .then((res2) => {
                return cheerio.load(res2.text)('img')[0].attribs.src;
              })
          }))

          aPageText.then((res3) => {
            res.send({ urls: res3 });
          })
        })
    })
})

https
  .createServer(httpsOption, app)
  .listen(port, () => {
    console.log('服务监听端口：', port)
  })
