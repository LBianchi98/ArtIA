<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "artia";


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
$sql = "SELECT * FROM quadri";
$result = $conn->query($sql);
echo json_encode($result->fetch_all());

$conn->close();
?>