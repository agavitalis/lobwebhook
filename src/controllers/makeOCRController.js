const fs = require('fs')
const pdf = require('pdf-parse');
const mongoose = require('mongoose');
const Document = require('../models/document');
const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');

/*
 * GET / route to show the createPDF form.
 */
function makeOCR(req, res) {
    //catch any response on the url
    let response = req.query.response
    res.render('ocr', { response })
}


/*
 * POST /createPDF to create a new PDF File.
 */
function makeOCRPost(req, res) {

    let filePath = req.file.path;
    let fileName = req.file.filename;
    let description = req.body.additional_message

    try {

        // Initial setup, create credentials instance.
        const credentials = PDFToolsSdk.Credentials
            .serviceAccountCredentialsBuilder()
            .fromFile("pdftools-api-credentials.json")
            .build();

        // Create an ExecutionContext using credentials and create a new operation instance.
        const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
            ocrOperation = PDFToolsSdk.OCR.Operation.createNew();

        // Set operation input from a source file.
        const input = PDFToolsSdk.FileRef.createFromLocalFile(filePath);
        ocrOperation.setInput(input);

        // Execute the operation and Save the result to the specified location.
        ocrOperation.execute(executionContext)
            .then(async (result) => {

                let newFileName = `createPDFFromDOCX-${Math.random() * 171}.pdf`
                await result.saveAsFile(`output/${newFileName}`)
                let documentContent = fs.readFileSync(require('path').resolve('./') + `\\output\\${newFileName}`)
                
                pdf(documentContent)
                .then(function (data) {
                    //Creates a new document
                    var newDocument = new Document({
                        documentName: fileName,
                        documentDescription: description,
                        documentContent: data.text,
                        url: require('path').resolve('./') + `\\output\\${newFileName}`
                    });
                    //Save it into the DB.
                    newDocument.save((err, docs) => {
                        if (err) {
                            res.send(err);
                        }
                        else { //If no errors, send it back to the client
                            res.redirect('/makeOCR?response=OCR Operation Successfully performed on the PDF File')
                        }
                    });
                })
                .catch(function (error) {
                    // handle exceptions
                    console.log(error)
                })


            })
            .catch(err => {
                if (err instanceof PDFToolsSdk.Error.ServiceApiError
                    || err instanceof PDFToolsSdk.Error.ServiceUsageError) {
                    console.log('Exception encountered while executing operation', err);
                } else {
                    console.log('Exception encountered while executing operation', err);
                }
            });

    } catch (err) {
        console.log('Exception encountered while executing operation', err);
    }


}




//export all the functions
module.exports = { makeOCR, makeOCRPost };