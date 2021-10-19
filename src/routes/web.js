const express = require("express");
const router = express.Router();

/*
|-------------------------------------------------------------------------------
| Controller Import
|-------------------------------------------------------------------------------
*/
const createLetterController = require("../controllers/letter.controller");
const makeOCRController = require("../controllers/makeOCRController");
const searchController = require("../controllers/webhook.controller");

/*
|-------------------------------------------------------------------------------
| Route Declaration
|-------------------------------------------------------------------------------
*/

router.route("/")
    .get(createLetterController.createLetter)
    .post(createLetterController.createLetterPost)
  

router.route("/makeOCR")
    .get(makeOCRController.makeOCR)
   

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

