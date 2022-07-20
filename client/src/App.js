import './App.css';
import Header from './components/Header';
import  Balance  from './components/Balance';
import  IncomeExpenses  from './components/IncomeExpenses';
import  TransactionList  from './components/TransactionList';
import  AddTransaction  from './components/AddTransaction';
import  {useState, useEffect}  from 'react';




function App() {
  const [transactions, setTransactions] = useState([]);

  // Since getTransactions is an asynchronous call, we call it inside useEffect()
  useEffect(() => {
    const getFormattedData = async (url) => {
      try {
        const resp = await fetch(url);
        const jsonData = await resp.json();
        const reqdData = await jsonData.data;
        setTransactions(reqdData);

      } catch (err) {
        console.log(err);
        return [];
      }

    };

    const url = '/api/v1/transactions';
    getFormattedData(url);

  }, []);

  return (

    <div className="container">
      <Header />
      <Balance transactions={transactions} />
      <IncomeExpenses transactions={transactions} />
      <AddTransaction transactions={transactions} setTransactions={setTransactions} />
      <TransactionList transactions={transactions} setTransactions={setTransactions} />
    </div>
  );
}

export default App;

