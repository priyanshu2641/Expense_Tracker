import React from 'react'
import { numberWithCommas } from '../utils/numberWithCommas';

export default function IncomeExpenses ({ transactions }) {
    let income = 0, expense = 0;
    transactions.map((transaction) => {
        if (transaction.amount > 0)
            income += transaction.amount;
        else
            expense += transaction.amount;
        return transaction;
    })
    return <div className="inc-exp-container">
        <div className="amount-container">
            <h4>income</h4>
            <div className="money plus">+${numberWithCommas(income.toFixed(2))}</div>
        </div>
        <div className="amount-container">
            <h4>expense</h4>
            <div className="money minus">-${numberWithCommas(Math.abs(expense).toFixed(2))}</div>
        </div>
    </div>
}