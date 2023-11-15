import { useState } from 'react'

import './App.css'

import AddExpense from './components/ExpenseInput.jsx'
import ShowExpense from './components/ShowExpense.jsx'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AddExpense />
    <div className="bottomContainer">
        <ShowExpense />
    </div>
   
    </>
  );
  
  
}

export default App
