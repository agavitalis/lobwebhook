const fs = require('fs')
const mongoose = require('mongoose');
const Document = require('../models/document');

/*
 * GET / route to show the search form.
 */
function search(req, res) {
    //catch any response on the url
    let response = req.query.response
    res.render('search', { response })
}


/*
 * POST /searchPost to search the contents our saved file.
 */
function searchPost(req, res) {

    let searchString = req.body.searchString;
    console.log("search seting",searchString)
    Document.aggregate([
        { $match: { $text: { $search: searchString } } },
        { $sort: { score: { $meta: "textScore" } } },
    ])
    .then(function (documents) {
        res.render('search', { documents })
    })
    .catch(function (error) {
        let response = error
        res.render('search', { response })
    });
}

/*
 * POST /downloadPDF To Donload PDF Documents.
 */
async function downloadPDF(req, res) {
   
    let documentId = req.params.documentId
    let document = await Document.findOne({_id:documentId});
    res.download(document.url);
}

//export all the functions
module.exports = { search, searchPost, downloadPDF };