const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at'];

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    role: { type: String, required: true, default: 'USER', enum: ['USER', 'ADMIN'] },
    city: { type: String, required: true },
    hours: { type: Number, required: true, default: 0 },
    rank: { type: String, required: true, default: 'bronze', enum: ['bronze', 'silver', 'gold'] },
    middleMame: { type: String },
    phone: { type: String, unique: true },
})

// UserSchema.index({ email: 'text', name: 'text' }); // TODO Удалить если будет не нужно
const userModel = model('User', UserSchema);
module.exports = userModel

// bcrypt.hash('bgAdmin@dobro.minmolkchr.com', 3).then((res) => console.log(res));

// const qwe = async () => {
//     console.log(await bcrypt.hash('admin', 3));
// }
// qwe()
//
// let a = 0;
// while (a < 50) {
//     let randomObject = dummy(userModel, {
//         ignore: ignoredFields,
//         returnDate: true
//     })
//     userModel.create(randomObject);
//     a++
// }
