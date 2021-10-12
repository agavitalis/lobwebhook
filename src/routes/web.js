const express = require("express");
const router = express.Router();
const {fileUpload} = require("../services/Uploads");

/*
|-------------------------------------------------------------------------------
| Controller Import
|-------------------------------------------------------------------------------
*/
const createPDFController = require("../controllers/createPDFController");
const makeOCRController = require("../controllers/makeOCRController");
const searchController = require("../controllers/searchController");

/*
|-------------------------------------------------------------------------------
| Route Declearation
|-------------------------------------------------------------------------------
*/

router.route("/")
    .get(createPDFController.createPDF)
    .post(fileUpload.single("document"),createPDFController.createPDFPost)

router.route("/makeOCR")
    .get(makeOCRController.makeOCR)
    .post(fileUpload.single("document"),makeOCRController.makeOCRPost);

router.route("/search")
    .get(searchController.search)
    .post(searchController.searchPost);
   
router.route("/download/:documentId")
    .get(searchController.downloadPDF)
    
/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
module.exports = router;

