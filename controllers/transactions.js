const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  public
exports.getTransactions = async (_req, res, _next) => {
    try {
        const transactions = await Transaction.find()
        return res.status(200).json({
            succcess: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

// @desc    Add a transaction
// @route   POST /api/v1/transactions
// @access  public
exports.addTransaction = async (req, res, _next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await Transaction.create({ text, amount });

        return res.status(201).json({
            success: true,
            data: transaction
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.messages);
            // Client side error
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            })
        }
    }
}

// @desc    Delete a transaction
// @route   /api/v1/transactions/:id
// @access  public
exports.deleteTransaction = async (req, res, _next) => {
    try {
        const _id = req.params.id;
        const transaction = await Transaction.findById(_id);
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }
        transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
}

