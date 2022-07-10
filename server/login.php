<?php
include_once('config.php');


if(isset($_GET['username']) & isset($_GET['password'])){

$user = $_GET['username'];
$psw= $_GET['password'];

$sql = "SELECT * FROM utenti WHERE username = '$user' AND psw = '$password'";
$result = $conn->query($sql);
setcookie('admin', $user, time() + 3600); // 1 ora di cookie
}




$conn->close();
?>