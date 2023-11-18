import { useState } from 'react'

import './App.css'

import ExpenseInput from './components/ExpenseInput.jsx'
import ShowExpense from './components/ShowExpense.jsx'
import LoginScreen from './components/LoginScreen.jsx'; // Assuming you have a LoginScreen component
import React from 'react';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLogin = (username, password) => {
    // Perform authentication logic here
    // For example, check credentials against a database or API

    // If credentials are valid, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
        ) : (
          <>
      <ExpenseInput />
      <div className="bottomContainer">
        <ShowExpense />
      </div>
      </>
      )}
    </div>
  );
}

export default App;
