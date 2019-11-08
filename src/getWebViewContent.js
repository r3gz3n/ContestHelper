function getWebViewContent(results) {
    var resultHtml = "";
    for(var result of results) {
        resultHtml += `
            <div class="tests">
                Verdict: 
                <pre>${result.verdict}</pre>
                Input: 
                <pre>${result.input}</pre>
                Expected output: 
                <pre>${result.correctOutput}</pre>
                Program output: 
                <pre>${result.programOutput}</pre>
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