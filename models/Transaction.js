const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    text: {
        type: String,
        // To remove whitespaces
        trim: true,
        // This text will be shown in the validation error
        required: [true, 'Please Enter some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please Enter a positive or negative amount']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;