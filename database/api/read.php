<?php

require_once("../database_config.php");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

$order = isset($_GET["order"])?$_GET["order"]:"";
$ascDesc = isset($_GET["ad"])?$_GET["ad"]:"";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the database
if($order != "") {
    if($ascDesc ==""){
        $sql = "SELECT e.expenseID, e.catID, e.name, e.amount, e.date, e.memo, c.name AS categoryName FROM expense e join category c ON e.catID = c.catID order by $order";
    }
    if($ascDesc == "desc"){
        $sql = "SELECT e.expenseID, e.catID, e.name, e.amount, e.date, e.memo, c.name AS categoryName FROM expense e join category c ON e.catID = c.catID order by $order desc";
    }
    else{
        $sql = "SELECT e.expenseID, e.catID, e.name, e.amount, e.date, e.memo, c.name AS categoryName FROM expense e join category c ON e.catID = c.catID order by $order asc";
    }
}
else{
    $sql = "SELECT e.expenseID, e.catID, e.name, e.amount, e.date, e.memo, c.name AS categoryName FROM expense e join category c ON e.catID = c.catID";   
}
$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    // Fetch associative array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>