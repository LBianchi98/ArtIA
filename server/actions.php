<?php
include_once('config.php');


if(isset($_GET['label'])){

$label = $_GET['label'];

$sql = "SELECT * FROM quadri WHERE label = '$label'";
$result = $conn->query($sql);
echo json_encode($result->fetch_all());
}




$conn->close();
?>