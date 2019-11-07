function getWebViewContent(results) {
    var resultHtml = "";
    for(var result of results) {
        resultHtml += `
            <div class="tests">
                Verdict: <br/>
                ${result.verdict}
                Input: <br/>
                ${result.input}
                Expected output: <br/>
                ${result.correctOutput}
                Program output: <br/>
                ${result.programOutput}
            </div>
        `;
    }
    var baseContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Result</title>
    </head>
        <body>
            ${resultHtml}
        </body>
    </html>
    `;
    return baseContent;
}

module.exports = getWebViewContent;