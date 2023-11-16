import { useState } from 'react'

import './App.css'

import AddExpense from './components/ExpenseInput.jsx'
import ShowExpense from './components/ShowExpense.jsx'
import React from 'react';




function App() {
  return (
    <div className="app-container">
      <AddExpense />
      <div className="bottomContainer">
        <ShowExpense />
      </div>
    </div>
  );
}

export default App;
