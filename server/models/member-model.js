const { Schema, model } = require('mongoose');

const MemberSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    isTookPart: { type: Boolean, default: false },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    middleMame: { type: String },
})

module.exports = model('Member', MemberSchema);
