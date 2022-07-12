<?php
include_once('config.php');


if(isset($_GET['label']) && isset($_GET['source']) ){

$label = $_GET['label'];
$src = $_GET['source'];

$sql = "INSERT INTO `quadri` (`id`, `source`, `label`, `descrizione`) VALUES (NULL, '$src', '$label', NULL) ";
$result = $conn->query($sql);
echo json_encode($result->fetch_all());
}




$conn->close();
?>