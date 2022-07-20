import React, { useState } from 'react';


export default function AddTransaction ({ transactions, setTransactions }) {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const url = '/api/v1/transactions';

    const postTransaction = async (url, transaction) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        })

        return await response.json();
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNaN(Number(amount))) {
            alert('Please enter a numeric value for amount');
            return;
        }

        let newTransaction = { text, amount: Number(amount) };

        try {
            postTransaction(url, newTransaction)
                .then(response => {
                    newTransaction._id = response.data._id;
                });
        } catch (error) {
            console.log(error);
        }
        setTransactions([...transactions, newTransaction]);

        setText('');
        setAmount(0);
    }

    return <div className="add-transaction-container">
        <h3>Add new transaction</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-control" >
                <label htmlFor="text">Text</label>
                <br />
                <input type="text" id="text" name="text" value={text} onChange={(e) => {
                    setText(e.target.value);
                }} placeholder='Enter text...' required />
            </div>
            <div className="form-control">
                <label htmlFor="amount">Amount<br />(negative-expense, positive-income)</label>
                <br />
                <input type="number" id="amount" name="amount" value={amount} onChange={(e) => {
                    setAmount(e.target.value);
                }} required />
            </div>
            <button type="submit">Add Transaction</button>
        </form >
    </div >
}