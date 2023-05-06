const { Schema, model } = require('mongoose');
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id'];

const NewsSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    images: [{ type: String, required: true }],
}, { timestamps: true });

const newsModel = model('News', NewsSchema);
module.exports = newsModel;

// let a = 0;
// while (a < 50) {
//     let randomObject = dummy(newsModel, {
//         ignore: ignoredFields,
//         returnDate: true
//     })
//     newsModel.create(randomObject);
//     a++
// }
