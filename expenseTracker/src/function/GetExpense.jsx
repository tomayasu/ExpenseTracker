import React, { useEffect, useState } from 'react';
import {Button} from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import PieChart from '../function/Chart.jsx';


async function fetchData(setData) {
  try {
    const response = await fetch('http://localhost/ExpenseTracker/database/api/read.php');
    const newData = await response.json();
    setData(newData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function GetExpense() {
  const [data, setData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  //const [updateExpense, setUpdateExpense] = useState(false);
  const [editModes, setEditModes] = useState({});

  const handleShowGraph = async () => {
    //GetExpense();
    setShowGraph(!showGraph);
    /*if (!showGraph) {
       // Assuming you add a static fetchData function to GetExpense
    }*/
  };

  const handleUpdateButtonClick = (expenseID) => {

    const currentEditMode = editModes[expenseID];

    // Show an alert for both edit and update
    if (currentEditMode) {
      if(confirm('???????? Do you want to update????????!!!!!!!!!')){
        if(confirm('???????? Do you want to update????????!!!!!!!!!')){
          alert('Updated');
        }
        else{
          alert('Not Updated');
        }
        //alert('Updated');
      }
      else{
        alert('Not Updated');

      }
      // Update
    } else {
      //alert('Do you want to edit?');
      // Change to can edit
    }
    // Toggle the edit mode for the clicked row
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [expenseID]: !prevEditModes[expenseID],
    }));
  };

  useEffect(() => {
    // Fetch data from the database when the component mounts
    fetchData(setData);
  }, []);

  return (
    <div>
      <h2>
        Expense History
        <Button colorScheme='purple' onClick={handleShowGraph}>
          Show Graph
        </Button>
      </h2>
      <ul>
      <TableContainer>
        <Table variant='striped' colorScheme='green'>
          <TableCaption></TableCaption>
            <Thead>
              <Tr>
                <Th>Expense Name</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
                <Th>Category</Th>
                <Th>Memo</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(item => (
                <Tr key={item.expenseID}>
                  <Td>{item.name}</Td>
                  <Td>${item.amount}</Td>
                  <Td>{item.date}</Td>
                  <Td>{item.categoryName}</Td>
                  <td>{item.memo}</td>
                  <Td>
                    <Button colorScheme={editModes[item.expenseID] ? 'yellow' : 'blue'} onClick={() => handleUpdateButtonClick(item.expenseID)}>
                      {editModes[item.expenseID] ? 'Update' : 'Edit'}
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme='red' onClick={deleteExpense}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
        </Table>
      </TableContainer>
      </ul>

      {showGraph && <PieChart />}


    </div>
  );
}

function deleteExpense() {
  
  if(confirm('??????????Do you want to delete???????!!!!!!!!')){
    alert("Deleted");
  }
  else{
    alert("Not Deleted");
  }
  
  // Add your logic here
}

export { GetExpense, fetchData };

//export default GetExpense;

      /*{data.map(item => (
/*          <li key={item.expenseID}>
            {item.name}: ${item.amount} date: {item.date}
            <Button colorScheme='blue'>Edit Expense</Button>
            <Button colorScheme='red'>Delete Expense</Button>
          </li>*/
      //    ))}