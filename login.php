<?php 
    // controllo cookie e casino
    if(isset($_COOKIE['admin'])){
      header("location: ./admin.html");
     }
     
?>
<html>
  <head> 
    <link rel="stylesheet" href="./css/style.css">
    <meta charset="UTF-8">
    <title>ArtIa Login</title>
  </head>
  <body>



    
    <a href="index.html"><h1 class="ArtIA">ArtIA</h1> </a>
    <form action="./server/login.php" method="GET" class="loginForm" name="login">
        <span>Username</span>
        <input id="username" name="username">
        <span>Password</span>
        <input id="psw" name="password" type="password">
        <button id="bottone" class="login">Login</button>
    </form>

    <p style="text-align: center;"><a href="./index.html">Torna alla ricerca</a></p>
     <iframe id="subframe" name="sub"></iframe> 

  </body>
</html>