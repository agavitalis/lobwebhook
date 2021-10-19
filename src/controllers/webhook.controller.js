const mongoose = require('mongoose');
const Document = require('../models/letter');


/*
 * POST /searchPost to search the contents our saved file.
 */
function processWebhookEventPost(req, res) {


}


//export all the functions
module.exports = { processWebhookEventPost };