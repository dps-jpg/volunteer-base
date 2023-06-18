const { Schema, model } = require('mongoose');
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id'];

const EventSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    images: [{ type: String, required: true }],
    city: { type: String, required: true },
    date: { type: String, required: true },
    hours: { type: Number, required: true },
}, { timestamps: true });

const eventModel = model('Event', EventSchema);
module.exports = eventModel;

// let a = 0;
// while (a < 50) {
//     let randomObject = dummy(eventModel, {
//         ignore: ignoredFields,
//         returnDate: true
//     })
//     eventModel.create(randomObject);
//     a++
// }
