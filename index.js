const puppeteer = require("puppeteer");


const name = "てすや";
const message = "栗田 is unko";

function asyncWait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    /*await page.setViewport({
        width: 1920,
        height: 1080
    });*/
    //await page.goto('http://hosyusokuhou.jp/');
    await page.goto('http://hosyusokuhou.jp/archives/48819836.html');
    await page.evaluate((name, message) => {
        $("input#name.form-name").val(name);
        $("textarea[name='comment']").val(message);
        document.querySelector("input#name.form-name").scrollIntoView();
    }, name, message);
    await asyncWait(20000);
    await page.screenshot({
        path: "formtest.png"
    });

    await browser.close();
})();