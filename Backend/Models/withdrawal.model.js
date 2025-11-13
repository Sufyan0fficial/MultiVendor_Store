const mongoose = require('mongoose')

const WithdrawalSchema = new mongoose.Schema(
   {
    seller_id: {
        type: String,
        required: [true, 'Seller ID is required']
    },
    amount: {
        type: Number,
        required: [true, 'Withdrawal amount is required'],
        min: [50, 'Minimum withdrawal amount is $50']
    },
    method: {
        type: String,
        required: [true, 'Withdrawal method is required'],
        enum: ['bank', 'paypal']
    },
    account_info: {
        type: String,
        required: [true, 'Account information is required']
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    processing_fee: {
        type: Number,
        default: 0
    },
    net_amount: {
        type: Number,
        required: true
    },
    processed_at: {
        type: Date
    },
    notes: {
        type: String
    }
   },
   {
    timestamps: true
   }
)

const WithdrawalModel = mongoose.model('Withdrawal', WithdrawalSchema)

module.exports = WithdrawalModel
