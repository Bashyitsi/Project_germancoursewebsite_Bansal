<?php
include 'db.php'; // Include your database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    // Check if the email exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND verified = 0");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $token = bin2hex(random_bytes(32)); // Generate a new token
        $stmt = $conn->prepare("UPDATE users SET token = ? WHERE email = ?");
        $stmt->bind_param("ss", $token, $email);
        $stmt->execute();

        // Prepare the verification link
        $verification_link = "http://deutschconnectacademy.com/user_management/verify.php?token=" . $token;

        // Send the verification email
        $subject = "Resend Email Verification";
        $message = "Please verify your email by clicking on this link: " . $verification_link;
        $headers = "From: noreply@deutschconnectacademy.com";

        if (mail($email, $subject, $message, $headers)) {
            echo "Verification email has been resent! Please check your inbox.";
        } else {
            echo "Error sending email. Please try again.";
        }
    } else {
        echo "This email is either not registered or already verified.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resend Verification Email</title>
</head>
<body>
    <form method="post" action="">
        <input type="email" name="email" placeholder="Enter your email" required>
        <button type="submit">Resend Verification Email</button>
    </form>
</body>
</html>
