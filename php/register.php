<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include 'db.php'; // Include your database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = 'user'; // Default role
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $token = bin2hex(random_bytes(50)); // Generate a verification token

    // Check for existing username or email
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Username or email already exists!";
    } else {
        // Insert new user with verification token
        $stmt = $conn->prepare("INSERT INTO users (username, password, role, name, surname, email, token) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $username, $password, $role, $name, $surname, $email, $token);
        
        if ($stmt->execute()) {
            // Prepare verification email
            $verification_link = "http://deutschconnectacademy.com/user_management/verify.php?token=" . $token; // Adjust the URL as needed
            $to = $email;
            $subject = "Email Verification";
            $message = "Please verify your email by clicking on this link: " . $verification_link;
            mail($to, $subject, $message); // Send the email
            
            echo "Registration successful! Please check your email to verify your account.";
        } else {
            echo "Error: " . $stmt->error;
        }
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <form method="post" action="">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="text" name="name" placeholder="Name" required>
        <input type="text" name="surname" placeholder="Surname" required>
        <input type="email" name="email" placeholder="Email" required>
        <button type="submit">Register</button>
    </form>
</body>
</html>
