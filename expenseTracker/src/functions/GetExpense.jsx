import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import {Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react';
import PieChart from './Chart.jsx';
import DeleteExpense from './DeleteExpense.jsx'
import { Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Input} from '@chakra-ui/react';
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'

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
  const [amount, setAmount] = useState(0);

  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState(0);
  const [editDate, setEditDate] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editMemo, setEditMemo] = useState('');

  const [categoryOptions, setCategoryOptions] = useState([]);
  //const [category, setCategory] = useState('');


  const handleShowGraph = async () => {
    setShowGraph(!showGraph);
  };

  const handleUpdateButtonClick = async (expenseID) => {
    const currentEditMode = editModes[expenseID];
  
    if (currentEditMode) {
      if (window.confirm('Do you want to update?')) {
        const updatedData = data.map((item) =>
          item.expenseID === expenseID
            ? {
                ...item,
                name: editedName,
                amount: editedAmount,
                date: editDate,
                category: editModes[expenseID] ? editCategory : item.category,
                memo: editMemo,
              }
            : item
        );
  
        try {
          const response = await fetch(`http://localhost/ExpenseTracker/database/api/update.php?expenseID=${expenseID}&name=${editedName}&amount=${editedAmount}&date=${editDate}&memo=${editMemo}&catID=${editCategory}`, {
            method: 'GET',
            mode: 'cors',
          });

          console.log(response);
  
          const data = await response.json();
  
          if (response.ok) {
            setData(updatedData);
            setEditModes((prevEditModes) => ({
              ...prevEditModes,
              [expenseID]: !prevEditModes[expenseID],
            }));
            setEditCategory(''); // Reset editCategory after updating
            alert('Updated');
            fetchData(setData); 
          } else {
            alert('Failed to update expense');
          }
        } catch (error) {
          console.error('Error updating expense:', error);
          alert('Failed to update expense');
        }
      } else {
        alert('Not Updated');
      }
    } else {
      // Set editCategory when switching to edit mode
      const expense = data.find((item) => item.expenseID === expenseID);
      setEditedName(expense.name);
      setEditedAmount(expense.amount);
      setEditDate(expense.date);
      setEditCategory(expense.category);
      setEditMemo(expense.memo);
      //setEditCategory(expense.catID);
  
      setEditModes((prevEditModes) => ({
        ...prevEditModes,
        [expenseID]: !prevEditModes[expenseID],
      }));
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/ExpenseTracker/database/api/category/read.php');
        const categoryData = await response.json();
        setCategoryOptions(categoryData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategories();
  }, []);


  const handleInputChange = (expenseID, field, value) => {
    // Update the state with the new input value
    setData((prevData) =>
      prevData.map((item) =>
        item.expenseID === expenseID ? { ...item, [field]: value } : item
      )
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/ExpenseTracker/database/api/category/read.php');
        const categoryData = await response.json();
        setCategoryOptions(categoryData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategories();
  }, []);

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
              {/* Add headers for other fields */}
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((item) => (
              <Tr key={item.expenseID}>
                <Td>
                  {editModes[item.expenseID] ? (
                    <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </Td>
                <Td>
                  {editModes[item.expenseID] ? (
                    <NumberInput defaultValue={editedAmount} precision={2} step={10} min={0}>
                    <NumberInputField
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(parseFloat(e.target.value) || 0)}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  ) : (
                    `$${item.amount}`
                  )}
                </Td>
                <Td>
                  {editModes[item.expenseID] ? (
                    <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  ) : (
                    item.date
                  )}
                </Td>
                <Td>
                {editModes[item.expenseID] ? (
  <Select
    placeholder="Select Category"
    value={editCategory} // Update to use editCategory
    onChange={(e) => setEditCategory(e.target.value)} // Update editCategory state
  >
    {categoryOptions.map((categoryOption) => (
      <option
        key={categoryOption.catID}
        value={categoryOption.catID}
        style={{ backgroundColor: categoryOption.color }}
      >
        {categoryOption.name}
      </option>
    ))}
  </Select>
) : (
  item.categoryName
)}

                </Td>
                <Td>
                {editModes[item.expenseID] ? (
              <input
                type="text"
                value={editMemo}
                onChange={(e) => setEditMemo(e.target.value)}
              />
                  ) : (
                    item.memo
                  )}
                </Td>
                {/* Add cells for other fields */}
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

export { GetExpense, fetchData };

/*
{editModes[item.expenseID] ? (
                    
  <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
    Category
  </MenuButton>
  <MenuList>
    {categoryOptions.map((categoryOption) => (
      <MenuItem
        key={categoryOption.catID}
        onClick={() => setCategory(categoryOption.catID)}
        style={{ backgroundColor: categoryOption.color }}
        onChange={(e) => setEditDate(e.target.value)}
      >
        {categoryOption.name}
      </MenuItem>
    ))}
  </MenuList>
</Menu>

) : (
  item.categoryName
)}
</Td>*/