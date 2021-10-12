
const PDFToolsSdk = require('@adobe/documentservices-pdftools-node-sdk');

/*
 * GET / route to show the createPDF form.
 */
function createPDF(req, res) {
    //catch any response on the url
    let response = req.query.response
    res.render('index', { response })
}


/*
 * POST /createPDF to create a new PDF File.
 */
function createPDFPost(req, res) {

    let filePath = req.file.path;
    let fileName = req.file.filename;

    try {
        // Initial setup, create credentials instance.
        const credentials = PDFToolsSdk.Credentials
            .serviceAccountCredentialsBuilder()
            .fromFile("pdftools-api-credentials.json")
            .build();

        // Create an ExecutionContext using credentials and create a new operation instance.
        const executionContext = PDFToolsSdk.ExecutionContext.create(credentials),
            createPdfOperation = PDFToolsSdk.CreatePDF.Operation.createNew();

        // Set operation input from a source file.
        const input = PDFToolsSdk.FileRef.createFromLocalFile(filePath);
        createPdfOperation.setInput(input);

        // Execute the operation and Save the result to the specified location.
        createPdfOperation.execute(executionContext)
            .then((result) => {

                result.saveAsFile(`output/createPDFFromDOCX-${Math.random() * 120}.pdf`)

                //download the file
                res.redirect('/?response=PDF Successfully created')
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
module.exports = { createPDF, createPDFPost };