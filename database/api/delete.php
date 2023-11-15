<?php

require_once("../database_config.php");

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");  // Add this line to allow "Content-Type" header
header("Content-Type: application/json");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assuming you receive data from the client-side via POST or any other method

$id = isset($_GET["id"])?$_GET["id"]:"";

//$key = isset($_GET["APIKEY"])?$_GET["APIKEY"]:"";

// Prepare and bind the SQL statement
$stmt = $conn->prepare("Delete from expense where  expenseID = ?");
$stmt->bind_param("i", $id);

// Execute the statement
$result = $stmt->execute();

if ($result === TRUE) {
    echo json_encode(["message" => "Record deleted successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();


?>