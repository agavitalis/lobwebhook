const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Document schema definition
var DocumentSchema = new Schema(
	{
		documentName: { type: String, required: false },
		documentDescription: { type: String, required: false },
		documentContent: { type: String, required: false },
		url: { type: String, required: false },
        status: {
            type: String,
            enum : ["active","inactive"],
            default: "active"
        }
	},
	{ timestamps: true }
);

// var Document = mongoose.model('document', DocumentSchema);
// Document.collection.dropIndex('services_text', function(err, result) {
//     if (err) {
//         console.log('Error dropping index!', err);
//     }
// });

//for text search
DocumentSchema.index({
	documentContent: "text",
});

//Exports the DocumentSchema for use elsewhere.
module.exports = mongoose.model("document", DocumentSchema);
