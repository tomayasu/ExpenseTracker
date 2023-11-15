
const DeleteExpense = async (expenseID) =>  {

  console.log('Button clicked for expenseID:', expenseID);

    if (window.confirm('Are you sure you want to delete?????!!!!!!!!')) {

        try {
          const response = await fetch(`http://localhost/ExpenseTracker/database/api/delete.php?id=${encodeURIComponent(expenseID)}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          //alert('Deleted');
      
          if (!response.ok) {
              throw new Error(`Failed to delete expense: ${await response.text()}`);
          }
      
          //const result = await response.json();
          //console.log(result);
          // Process the result as needed
          alert('Expense deleted successfully!');
      } catch (error) {
          console.error('Error deleting expense:', error.message);
          alert('An unexpected error occurred while deleting the expense.');
      }
        

    } else {
        alert('Not Deleted');
    }

    console.log('Button clicked');

};

export default DeleteExpense;