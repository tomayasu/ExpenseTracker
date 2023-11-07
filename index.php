<?php
session_start(); // Start a session

// Initialize total expenses if it hasn't been set yet
if (!isset($_SESSION['totalExpenses'])) {
    $_SESSION['totalExpenses'] = 0;
}

// Check if there's an expenses file, if not, create one
$expensesFile = 'expenses.txt';
if (!file_exists($expensesFile)) {
    file_put_contents($expensesFile, "");
}

// Function to add an expense to the file
function addExpenseToFile($expenseData) {
    global $expensesFile;
    file_put_contents($expensesFile, $expenseData . "\n", FILE_APPEND);
}

/*
Savings Planner

graph reports, category, date time, additional notes, total calculatioin, store expense in file, edit expense, search and filter, export data csv or excel, User Authentication, delete expense, monthly or weekly, anually budget, Income Tracking:, Savings Goals:




food, transportation, housing
*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
            text-align: center;
        }

        input, select {
            padding: 8px;
            width: 100%;
            margin-bottom: 10px;
        }

        h1, h2 {
            margin-bottom: 10px;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Expense Tracker</h1>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
            <label for="expenseName">Expense Name:</label>
            <input type="text" id="expenseName" name="expenseName" required><br><br>

            <label for="expenseAmount">Expense Amount:</label>
            <input type="number" id="expenseAmount" name="expenseAmount" required><br><br>

            <label for="Date">Expense Date:</label>
            <input type="text" id="expenseDate" name="expenseDate" required><br><br>

            <label for="Category">Expense Category:</label>
            <select name="expenseCategory" id="expenseCategory">
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="Food">Food</option>
                <option value="Housing">Housing</option>
                <option value="Clothing">Clothing</option>
                <option value="Health">Health</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>
            <!--<input type="text" id="expenseCategory" name="expenseCategory"><br><br>-->

            <input type="submit" value="Add Expense">
        </form>

        <h2>Expenses</h2>
        
        <ul>
            <?php

            if (file_exists($expensesFile)) {
                // Read the contents of the file
                $expensesData = file_get_contents($expensesFile);

                // Split the data into an array of individual expenses
                $expensesArray = explode("\n", $expensesData);

                // Loop through the expenses and display them
                foreach ($expensesArray as $expense) {
                    echo "<li>$expense</li>";
                }
            }
            else {
                echo "<li>No expenses recorded yet</li>";
            }

            $totalExpenses = 0;
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $expenseName = $_POST["expenseName"];
                $expenseAmount = $_POST["expenseAmount"];
                $expenseDate = $_POST["expenseDate"];

                // Check if expenseCategory is set before using it
                if(isset($_POST["expenseCategory"])){
                    $expenseCategory = $_POST["expenseCategory"];
                } else {
                    $expenseCategory = "Not specified";
                }
                #$expenseCategory = $_POST["expenseCategory"];
                
                if($expenseName && $expenseAmount && $expenseDate && $expenseCategory){
                    echo "<li>$expenseName: $$expenseAmount: $expenseDate: $expenseCategory</li>";
                }
                else if ($expenseName && $expenseAmount && $expenseDate) {
                    echo "<li>$expenseName: $$expenseAmount: $expenseDate</li>";
                }

                $totalExpenses = $expenseAmount + $_SESSION['totalExpenses'];
                $_SESSION['totalExpenses'] = $totalExpenses;

                // Record the expense in the file
                $expenseData = "$expenseName: $$expenseAmount: $expenseDate: $expenseCategory";
                addExpenseToFile($expenseData);
                
            }
            ?>
        </ul>

        <h2>Total Expenses</h2>
        
        <ul>
            <?php
            #$totalExpenses = 0;
            echo "<li>$$totalExpenses</li>";
        
            ?>
        </ul>
    </div>
</body>
</html>
