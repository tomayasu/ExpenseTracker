
<?php
require_once("../database_config.php");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT c.name AS label, SUM(amount) AS value, c.color FROM expense e join category c ON (e.catID = c.catID)GROUP BY c.catID");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);

$conn->close();

?>


