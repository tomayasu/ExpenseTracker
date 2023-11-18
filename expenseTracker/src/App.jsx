import { useState } from 'react'

import './App.css'

import ExpenseInput from './components/ExpenseInput.jsx'
import ShowExpense from './components/ShowExpense.jsx'
import React from 'react';




function App() {
  return (
    <div className="app-container">
      <ExpenseInput />
      <div className="bottomContainer">
        <ShowExpense />
      </div>
    </div>
  );
}

export default App;
