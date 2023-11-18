const HandleAddExpense = async (expenseName, category, dateTime, amount, memo) => {
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
    if (!expenseName || !dateTime || isNaN(parseFloat(amount))) {
      alert('Please fill in all required fields.');
      return;
    }
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
  
    //console.log('Expense Data:', expenseData);
    // ... (send data to the server or parent component)
  };

  export default HandleAddExpense;