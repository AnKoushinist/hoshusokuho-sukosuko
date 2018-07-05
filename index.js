const puppeteer = require("puppeteer");


(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('http://hosyusokuhou.jp/');
    await page.setViewport({width: 1920, height: 1080});
    await page.screenshot({
        path: 'example.png',
        fullPage: true
    });

    await browser.close();
})();