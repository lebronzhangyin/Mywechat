const express = require('express');
const sha1 = require('sha1');
const app = express();
const config = {
  appID: 'wxb8b6040e446a8674',
  appsecret: '7625b252dbf23822067481d14ae90472',
  token: 'wechat01'
}

app.use((req, res, next) => {
  console.log(req.query);
//获取请求参数
const {signature, echostr, timestamp, nonce} = req.query;
const {token} = config;
// - 将参数签名加密的三个参数（timestamp、nonce、token）组合在一起，按照字典序排序
// const arr = [timestamp, nonce, token].sort();
// console.log(arr); // [ '1542350582', '477910604', 'atguiguHTML0810' ]
// - 将排序后的参数拼接在一起，进行sha1加密
// const str = sha1(arr.join(''));
// console.log(str); // e131be1e59914a6f5eb0f254a59e09079c871fa8
const str = sha1([timestamp, nonce, token].sort().join(''));
// - 加密后的到的就是微信签名，将其与微信发送过来的微信签名对比，
if (signature === str) {
  //说明消息来自于微信服务器
  res.end(echostr);
} else {
  //说明消息不来自于微信服务器
  res.end('error');
}


})


app.listen(3000, err => {
  if (!err) console.log('服务器启动成功~');
else console.log(err);
})