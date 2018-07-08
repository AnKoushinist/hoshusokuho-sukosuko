const puppeteer = require("puppeteer");

const { fromHtml: c2j } = require("./comments2json");
const {
    post: postUrlExtractor
} = require("./regex");

class CommentPostParent {
    constructor(browser) {
        this.browser = browser;
    }

    async open(url) {
        return new CommentPostPage(await this.browser.newPage(), url);
    }

    final() {
        return this.browser.close();
    }
}

class CommentPostPage {
    constructor(page, url) {
        this.page = page;
        const id = postUrlExtractor.exec(url)[1];
        const url = `http://hosyusokuhou.jp/archives/${id}.html`;
        this.page.goto(url);
    }

    async fill(name, message) {
        return await page.evaluate((name, message) => {
            if (name) {
                $("input#name.form-name").val(name);
            }
            $("textarea[name='comment']").val(message);
        }, name, message);
    }

    async clickSubmit() {
        return await page.evaluate(() => {
            $("input[name='submit']").click();
        });
    }

    async post(name, message) {
        await this.fill(name, message);
        await this.clickSubmit();
    }

    async comments() {
        return await c2j(await page.$eval(selector, (element) => element.innerHTML));
    }

    final() {
        return this.page.close();
    }
}

async function open(options) {
    return new CommentPostParent(await puppeteer.launch(options || {}));
}

module.exports = open;

