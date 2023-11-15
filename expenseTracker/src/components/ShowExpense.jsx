// ButtonComponent.jsx
import React from 'react';
import {Button} from '@chakra-ui/react'
//import GetExpense from './GetExpense.jsx'
import { useEffect, useState } from 'react';
import { GetExpense, fetchData } from '../functions/GetExpense.jsx';


function ShowExpense() {

  const [showExpense, setShowExpense] = useState(false);
  const [data, setData] = useState([]);

  const handleButtonClick = async () => {
    //GetExpense();
    setShowExpense(!showExpense);
    if (!showExpense) {
      await fetchData(setData); // Assuming you add a static fetchData function to GetExpense
    }
  };

  return (
    <div className="fixed-button-container">
      
      {showExpense && <GetExpense />}
      <Button colorScheme='green' onClick={handleButtonClick}>
        {showExpense ? 'Hide Expense' : 'Show Expense'}
      </Button>
      
    </div>
  );
}

export default ShowExpense;
