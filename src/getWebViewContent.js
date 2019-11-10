function getWebViewContent(results) {
    var resultHtml = "";
    var allTestsPassed = true;
    for(var result of results) {
        if (result.verdict !== 'AC') allTestsPassed = false;
        if (result.verdict !== 'TLE') {
            resultHtml += `
                <div class="tests">
                    Test #${result.testNumber} : <span class=${result.verdict}>${result.verdict}</span></br>
                    Input: 
                    <pre>${result.input}</pre>
                    Expected output: 
                    <pre>${result.correctOutput}</pre>
                    Program output: 
                    <pre>${result.programOutput}</pre>
                </div>
                ======================================
            `;
        }
    }
    if (allTestsPassed) resultHtml += `<div>All tests passed!!!</div>`;
    else resultHtml += `<div>Failed on few tests!!!</div>`;
    var baseContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Result</title>
        <script>
            .tests {
                background: rgba(0, 0, 0, 0.1);
                padding: 10px;
                margin-bottom: 5px;
            }
            .WA {
                color: rgb(126, 38, 38);
            }
            .AC {
                color: rgb(37, 87, 37);
            }
        </script>
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