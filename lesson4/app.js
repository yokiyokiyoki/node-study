const express = require("express");
const app = express();
const superagent = require("superagent");
const cheerio = require("cheerio");
const url = require("url");
const eventproxy = require("eventproxy");
const cnodeUrl = "https://cnodejs.org/";
app.get("/", (req, res, next) => {
  superagent.get(cnodeUrl).end((err, sres) => {
    if (err) {
      return next(err);
    }
    //sres.text是网页内容
    let $ = cheerio.load(sres.text);
    let topicUrls = [];
    $("#topic_list .topic_title").each(function(idx, element) {
      let $element = $(element);
      let href = url.resolve(cnodeUrl, $element.attr("href"));
      topicUrls.push(href);
    });

    let ep = new eventproxy();

    ep.after("topic_html", topicUrls.length, function(topics) {
      topics = topics.map(function(topicPair) {
        var topicUrl = topicPair[0];
        var topicHtml = topicPair[1];
        var $ = cheerio.load(topicHtml);
        return {
          title: $(".topic_full_title")
            .text()
            .trim(),
          href: topicUrl,
          comment1: $(".reply_content")
            .eq(0)
            .text()
            .trim()
        };
      });

      console.log("final:");
      //   console.log(topics);
      res.send(topics);
    });

    topicUrls.forEach(function(topicUrl) {
      superagent.get(topicUrl).end(function(err, res) {
        console.log("fetch " + topicUrl + " successful");
        ep.emit("topic_html", [topicUrl, res.text]);
      });
    });
  });
});
app.listen(3001, () => {
  console.log("监听3001端口");
});
