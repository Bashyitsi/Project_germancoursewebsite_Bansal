<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include 'db.php'; // Include your database connection

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Check if the token exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt = $conn->prepare("UPDATE users SET verified = 1 WHERE token = ?");


    if ($result->num_rows > 0) {
        // Update the user to mark them as verified
        $stmt = $conn->prepare("UPDATE users SET token = NULL WHERE token = ?");
        $stmt->bind_param("s", $token);
        if ($stmt->execute()) {
            echo "Email verified successfully! You can now log in.";
        } else {
            echo "Error verifying email.";
        }
    } else {
        echo "Invalid token!";
    }

    $stmt->close();
} else {
    echo "No token provided!";
}
?>
