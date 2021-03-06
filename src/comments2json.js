const cheerio = require("cheerio");
const request = require("request");

const {
    post: extractor,
    jpnDate: dateExtractor,
    postId: idExtractor
} = require("./regex");

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

async function fromUrl() {
    const id = extractor.exec(input)[1];
    const url = `http://hosyusokuhou.jp/archives/${id}.html`;
    return await fromHtml((await requestGet(url)).body);
}

async function fromHtml(text) {
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

module.exports = { fromHtml, fromUrl };
