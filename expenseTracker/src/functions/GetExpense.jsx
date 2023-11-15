import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import PieChart from './Chart.jsx';
import DeleteExpense from './DeleteExpense.jsx'


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
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [editModes, setEditModes] = useState({});

  const handleShowGraph = async () => {
    setShowGraph(!showGraph);
  };

  const handleUpdateButtonClick = (expenseID) => {
    const currentEditMode = editModes[expenseID];

    if (currentEditMode) {
      if (window.confirm('Do you want to update?')) {
        alert('Updated');
      } else {
        alert('Not Updated');
      }
    } else {
      setEditModes((prevEditModes) => ({
        ...prevEditModes,
        [expenseID]: !prevEditModes[expenseID],
      }));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  const handleDeleteAndFetch = async (expenseID) => {
    if (window.confirm('Do you want to delete this expense?')) {
      await DeleteExpense(expenseID);
      fetchData(setData); // Fetch updated data after deletion
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortBy === 'date') {
      const dateA = aValue ? new Date(aValue).getTime() : null;
      const dateB = bValue ? new Date(bValue).getTime() : null;

      if (dateA === null && dateB === null) {
        return 0;
      }

      if (dateA === null) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      if (dateB === null) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      // Both values are not null, continue with timestamp comparison
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }

    if (sortBy === 'amount') {
      return sortOrder === 'asc' ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      // Handle other data types if necessary
      return 0;
    }
  });  
  

  return (
    <div>
      <h2>
        Expense History
        <Button colorScheme='purple' onClick={handleShowGraph}>
          Show Graph
        </Button>
      </h2>
      <TableContainer>
        <Table variant='striped' colorScheme='green'>
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th onClick={() => handleSort('name')}>Expense Name</Th>
              <Th onClick={() => handleSort('amount')}>Amount</Th>
              <Th onClick={() => handleSort('date')}>Date</Th>
              <Th onClick={() => handleSort('categoryName')}>Category</Th>
              <Th onClick={() => handleSort('memo')}>Memo</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((item) => (
              <Tr key={item.expenseID}>
                <Td>{item.name}</Td>
                <Td>${item.amount}</Td>
                <Td>{item.date}</Td>
                <Td>{item.categoryName}</Td>
                <Td>{item.memo}</Td>
                <Td>
                  <Button
                    colorScheme={editModes[item.expenseID] ? 'yellow' : 'blue'}
                    onClick={() => handleUpdateButtonClick(item.expenseID)}
                  >
                    {editModes[item.expenseID] ? 'Update' : 'Edit'}
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme='red' onClick={() => handleDeleteAndFetch(item.expenseID)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {showGraph && <PieChart />}
    </div>
  );
}

/*function deleteExpense() {
  
  if(confirm('??????????Do you want to delete???????!!!!!!!!')){
    alert("Deleted");
  }
  else{
    alert("Not Deleted");
  }
  
  // Add your logic here
}*/

export { GetExpense, fetchData };
