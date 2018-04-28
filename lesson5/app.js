//因为一般网站都有限制你的并发连接数，这个时候超过并发连接数就会封掉ip
//也就说我们真实目的是要爬1000个链接，这时候我们可以一个生成一个队列，5个5个爬，用async控制队列

//如果我们想构造一个fetch(url,function(err,result){})的函数
//应该这样写
// function fetch(url,callback){
//     处理url
//     callback(null,返回url处理的)
// }
const async = require("async");
// 并发连接数的计数器
let concurrencyCount = 0;
let fetchUrl = function(url, cb) {
  let delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log(
    "现在的并发数是",
    concurrencyCount,
    "，正在抓取的是",
    url,
    "，耗时" + delay + "毫秒"
  );
  setTimeout(() => {
    concurrencyCount--;
    cb(null, url + "html content");
  }, delay);
};
let urls = [];
for (var i = 0; i < 30; i++) {
  urls.push("http://datasource_" + i);
}
async.mapLimit(
  urls,
  5,
  (url, cb) => {
    fetchUrl(url, cb);
  },
  (err, result) => {
    console.log("final:");
    console.log(result);
  }
);
