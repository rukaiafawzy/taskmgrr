const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch({
            headless: 'new'
        });
        const page = await browser.newPage();
        
        const htmlPath = path.resolve(__dirname, 'PROJECT_DOCS.html');
        const fileUrl = 'file://' + htmlPath;
        
        console.log(`Loading HTML from: ${fileUrl}`);
        await page.goto(fileUrl, { 
            waitUntil: 'networkidle0',
            timeout: 60000 
        });

        console.log("Generating PDF...");
        await page.pdf({
            path: 'PROJECT_DOCS.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        });

        await browser.close();
        console.log('PDF Generated Successfully: PROJECT_DOCS.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
