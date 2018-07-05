const cheerio = require("cheerio");
const request = require("request");

const extractor = /(?:http:\/\/)?(?:hosyusokuhou.jp\/archives\/)?([0-9]+)(?:\.html)?/;

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
}