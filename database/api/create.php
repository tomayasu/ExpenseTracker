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

$name = isset($_GET["name"])?$_GET["name"]:"";
$amount = isset($_GET["amount"])?$_GET["amount"]:"";
$date = isset($_GET["date"])?$_GET["date"]:"";
$memo = isset($_GET["memo"])?$_GET["memo"]:"";
$cat = isset($_GET["cat"])?$_GET["cat"]:"";

if($cat == ""){
    $cat = 1;
}

$name = ucfirst($name);

//$formattedDate = $date->format('Y-m-d');
$formattedDate = date('Y-m-d', strtotime($date));


//$key = isset($_GET["APIKEY"])?$_GET["APIKEY"]:"";
if($date == ""){
    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO expense (name, amount, memo, catID) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sdsi", $name, $amount, $memo, $cat);
}
else{
    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO expense (name, amount, date, memo, catID) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdssi", $name, $amount, $formattedDate, $memo, $cat);
}


// Execute the statement
$result = $stmt->execute();

if ($result === TRUE) {
    echo json_encode(["message" => "New record created successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();


?>