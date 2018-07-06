const cheerio = require("cheerio");
const request = require("request");

const extractor = /(?:http:\/\/)?(?:hosyusokuhou.jp\/archives\/)?([0-9]+)(?:\.html)?/;
const dateExtractor = /[0-9]{4}年[0-9]{2}月[0-9]{2}日 [0-9]{2}:[0-9]{2}:[0-9]{2}/;
const idExtractor = /ID:([a-zA-Z0-9]+)/;

function requestGet(url, options) {
    return new Promise((resolve, reject) => {
        request.get(url, options, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve({ response, body });
            }
        })
    });
}

async function convertNow(input) {
    const id = extractor.exec(input)[1];
    const url = `http://hosyusokuhou.jp/archives/${id}.html`;
    const text = (await requestGet(url)).body;
    const $ = cheerio.load(text);

    const commentsRoot = $("div#comments-list");
    let data = [];
    commentsRoot.children("div.com_header").each(function (index, element) {
        const content = $(element);
        const text = content.text();
        const date = dateExtractor.exec(text)[0];
        const postId = idExtractor.exec(text)[1];
        const name = content.find("span.com_name").text();
        const message = content.find("div.comtext").text();
        data.push({
            date, postId, name, message
        });
    });
    return data;
}

module.exports = convertNow;
