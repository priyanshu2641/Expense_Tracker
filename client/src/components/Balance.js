import React from 'react';
import { numberWithCommas } from '../utils/numberWithCommas';

export default function Balance ({ transactions }) {
    let balance = 0.00;
    transactions.map((transaction) => {
        balance += transaction.amount;
        return transaction;
    })
    return <div className="balance-container">
        <div className="balance-text">Your Balance</div>
        <div className="balance">${numberWithCommas(balance.toFixed(2))}</div>
    </div>
}