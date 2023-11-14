import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function AddExpense() {
  const [expenseName, setExpenseName] = useState('');
  const [category, setCategory] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');

  const handleAddExpense = async () => {
    console.log('Button clicked');
    // You can perform any necessary data processing or validation here
    // and then send the data to the desired location (e.g., API or parent component)
    const expenseData = {
      expenseName,
      category,
      dateTime,
      amount: parseFloat(amount) || 0,
      memo,
    };
    console.log('Expense Data:', expenseData);


    try {
      const response = await fetch(`http://localhost/ExpenseTracker/database/api/create.php?name=${encodeURIComponent(expenseName)}&catID=${encodeURIComponent(category)}&date=${encodeURIComponent(dateTime)}&amount=${encodeURIComponent(amount)}&memo=${encodeURIComponent(memo)}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(expenseData),
      });
  
      if (!response.ok) {
          throw new Error(`Failed to add expense: ${await response.text()}`);
      }
  
      //const result = await response.json();
      //console.log(result);
      // Process the result as needed
      alert('Expense added successfully!');
  } catch (error) {
      console.error('Error adding expense:', error.message);
      alert('An unexpected error occurred while adding the expense.');
  }
  
    console.log('Expense Data:', expenseData);
    // ... (send data to the server or parent component)
  };

  const [categoryOptions, setCategoryOptions] = useState([]);

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

  return (
    <>
      <Table>Expense Tracker</Table>
      <Input
        placeholder='Expense Name'
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}           
      />

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
            >
              {categoryOption.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Input
        placeholder="Select Date and Time"
        size="md"
        type="date"
        onChange={(e) => setDateTime(e.target.value)}
      />
      <NumberInput defaultValue={0} precision={2} step={10} min={0}>
        <NumberInputField
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Input
        placeholder='Memo'
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <Button colorScheme='blue' onClick={handleAddExpense}>
        Add Expense
      </Button>
    </>
  );
}

export default AddExpense;
