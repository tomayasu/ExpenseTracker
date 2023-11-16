<?php

require_once("../database_config.php");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if necessary parameters are set in the GET request
if (isset($_GET['expenseID']) && isset($_GET['name']) && isset($_GET['amount']) && isset($_GET['date']) && isset($_GET['memo'])) {
    $expenseID = $_GET['expenseID'];
    $newName = $_GET['name'];
    $newAmount = $_GET['amount'];
    $newDate = $_GET['date'];
    $newMemo = $_GET['memo'];

    // SQL statement to update the expense details
    $sql = "UPDATE `expense`
            SET `name` = '$newName',
                `amount` = $newAmount,
                `date` = '$newDate',
                `memo` = '$newMemo'
            WHERE `expenseID` = $expenseID";

    if ($conn->query($sql) === TRUE) {
        echo "Expense updated successfully";
    } else {
        echo "Error updating expense: " . $conn->error;
    }
} else {
    echo "Incomplete parameters in the request";
}

$conn->close();
?>
