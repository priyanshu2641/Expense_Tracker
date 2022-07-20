import React, { useState } from 'react';
import { numberWithCommas } from '../utils/numberWithCommas';

export default function TransactionList ({ transactions, setTransactions }) {
    const removeTransaction = (_id) => {
        const newTransactions = transactions.filter(transaction => transaction._id !== _id);

        const deleteTransaction = async (_id) => {
            const url = '/api/v1/transactions/' + _id;
            const resp = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: JSON.stringify({ id: _id })
            });

            return await resp.json();
        }
        setTransactions(newTransactions);

        try {
            deleteTransaction(_id);
        } catch (error) {
            console.log("Error is", error);
        }
    }

    const [showButton, setShowButton] = useState(false);

    return <div className="transaction-list-container">
        <h3>History</h3>
        <ul className="list">
            {transactions.map((transaction) => {
                const { _id, text, amount } = transaction;
                if (transaction.amount < 0) {
                    return <div className="item-container" key={_id} onMouseEnter={() => { setShowButton(true) }} onMouseLeave={() => { setShowButton(false) }}>{(showButton ? <button className='delete-btn' onClick={() => removeTransaction(_id)}>x</button> : <></>)}<li className="list-item minus-item" ><div>{text}</div> <span>-${numberWithCommas(Math.abs(amount))}</span></li></div>
                } else {
                    return <div className="item-container" key={_id} onMouseEnter={() => { setShowButton(true) }} onMouseLeave={() => { setShowButton(false) }}>{(showButton ? <button className='delete-btn' onClick={() => removeTransaction(_id)}>x</button> : <></>)}<li className="list-item plus-item" ><div>{text}</div> <span>${numberWithCommas(amount)}</span></li></div>
                }
            })}
        </ul >
    </div >
}