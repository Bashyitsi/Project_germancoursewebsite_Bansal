<?php

$servername = "localhost"; 
$username = "deutschconnectac"; //  MySQL username
$password = "Jgw?&KUOfCkp"; //  MySQL password
$dbname = "deutschconnectac_user_login"; // database name from your setup
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
