<?php
include_once('config.php');


if(isset($_GET['id'])){

    $id = $_GET['id'];

    if($id != ''){
        $sql = "DELETE FROM quadri WHERE id = '$id'";
        $conn->query($sql);
    }

}

$conn->close();
?>