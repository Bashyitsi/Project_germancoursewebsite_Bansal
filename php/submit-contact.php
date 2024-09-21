<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['mail'];
    $message = $_POST['message'];
    $additional = $_POST['additional'];

    // Simple email validation
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $to = "deutchconnecta@gmail.com";
        $subject = "New Contact Form Submission";
        $body = "First Name: $fname\nLast Name: $lname\nEmail: $email\nMessage: $message\nAdditional: $additional";

        if (mail($to, $subject, $body)) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send message.";
        }
    } else {
        echo "Invalid email address.";
    }
}
?>

<form action="submit-contact.php" method="POST">
    First Name: <input type="text" name="fname" required><br>
    Last Name: <input type="text" name="lname" required><br>
    Email: <input type="email" name="mail" required><br>
    Message: <input type="text" name="message" required><br>
    Additional Details: <textarea name="additional"></textarea><br>
    <button type="submit">Send Message</button>
</form>
