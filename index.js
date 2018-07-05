const puppeteer = require("puppeteer");


const name = "てすや by AnKoushinist";
const message = `
****Wikiは、attorney***及び関連するもの達の情報をまとめるという理念のもと平成26年3月27日に、HoshuSokuhoにて誕生しました。
Wikiというサイトに対して、このページを見て下さる方々は敷居が高いとお思いかもしれません。 実際、そのようなWikiもあるのでしょう。 しかし、当Wikiは、編集者と共に泣き共に笑うことができるサイトでありたいと思っております。 
`;

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
        if (name) {
            $("input#name.form-name").val(name);
        }
        $("textarea[name='comment']").val(message);
        document.querySelector("input#name.form-name").scrollIntoView();
    }, name, message);
    await asyncWait(5000);
    await page.evaluate((name, message) => {
        $("input[name='submit']").click();
    });
    await asyncWait(20000);

    await browser.close();
})();