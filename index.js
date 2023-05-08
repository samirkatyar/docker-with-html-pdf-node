const express = require('express');
const app = express();
const port = 9000;
const os = require('os');
app.get('/', async(req, res) => {
    const html_to_pdf = require('html-pdf-node');
    console.log(os.platform());
    let options = { format: 'A4',printBackground: true};
    let file = { content: "<h1>Hello World from Node.js!</h1>" };
    return new Promise((resolve, reject) => {
      html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        if(pdfBuffer){
            res.send('data:application/pdf;base64,' + pdfBuffer.toString('base64'));
          return resolve(pdfBuffer);
        }else{
          reject(new Error('Error in generating PDF'))
        }
      });
    });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
