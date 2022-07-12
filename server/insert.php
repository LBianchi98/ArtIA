<?php
include_once('config.php');


if(isset($_GET['label']) && isset($_GET['source'])  && isset($_GET['titolo']) && isset($_GET['desc'])){

$label = $_GET['label'];
$src = $_GET['source'];
$titolo = $_GET['titolo'];
$desc = $_GET['desc'];

$sql = "INSERT INTO `quadri` (`id`, `source`, `titolo`, `label`, `descrizione`) VALUES (NULL, '$src', '$titolo', '$label', '$desc') ";
$result = $conn->query($sql);
echo json_encode($result->fetch_all());
}




$conn->close();
?>