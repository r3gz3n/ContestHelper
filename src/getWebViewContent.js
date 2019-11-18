function getWebViewContent(results) {
    var resultHtml = "";
    var allTestsPassed = true;
    for(var result of results) {
        resultHtml += `
            <div>
                Test #${result.testNumber}:</br>
                Input: 
                <pre>${result.input}</pre>
                Expected output: 
                <pre>${result.correctOutput}</pre>
                Program output: 
                <pre>${result.programOutput}</pre>
                Verdict: ${result.message} <br/>
            </div>
            ------------------------------------------------------
        `;
    }
    for(var result of results) {
        if (result.verdict !== 'AC') {
            allTestsPassed = false;
            resultHtml += `<div>Test #${result.testNumber}: ${result.message}</div>`;
        }
    }
    if (allTestsPassed) resultHtml += `<div>All tests passed</div>`;
    var baseContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Result</title>
    </head>
        <body>
            <h4> Result </h4>
            ${resultHtml}
        </body>
    </html>
    `;
    return baseContent;
}

module.exports = getWebViewContent;