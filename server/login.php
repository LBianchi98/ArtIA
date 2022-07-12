<?php
include_once('config.php');



if(isset($_COOKIE['admin'])){
    header("location: ../admin.html");
  }


  

if (isset($_GET['username']) & isset($_GET['password'])) {

    $user = $_GET['username'];
    $psw = $_GET['password'];



    if (empty($user) || empty($psw)) {
        $messaggioerrore = 'Inserisci username e password %s';
        printf($messaggioerrore, '<a href="../login.html">torna al login</a>');
    } else {

        $sql = "SELECT * FROM utenti WHERE username = '$user' AND psw = '$psw'";
        $result = $conn->query($sql);



    /*    echo $r;
        implode("," , $da);   

        
        if (strcmp($r, '') == 0)*/
        
        if(mysqli_num_rows($result) > 0){
        foreach($result as $row) {
         /*   echo $row['username'];
            echo $row['psw'];*/

            if($row['username'] == $user && $row['psw'] == $psw){
                header("location: ../admin.html");
                setcookie('admin', $user, time() + 3600); // 1 ora di cookie
                $messaggioerrore = 'loggato con successo  %s';
                printf($messaggioerrore, '<a href="../login.html">torna al login</a>');

                } else {
                    $messaggioerrore = 'Username e password non valide %s';
                    printf($messaggioerrore, '<a href="../login.html">torna al login</a>');

                }
        }
    }else{
        $messaggioerrore = 'Username e password non valide %s';
        printf($messaggioerrore, '<a href="../login.html">torna al login</a>');
    }

    }

}

    $conn->close();
    ?>