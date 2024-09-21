<?php
session_start(); // Start the session
include 'db.php'; // Include database connection

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php"); // Redirect to login if not logged in
    exit();
}

$username = $_SESSION['username']; // Get the logged-in user's username
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>
    <p>This is your dashboard.</p>
    
    <!-- Add more content here, like user-specific information -->
    
    <form method="POST" action="logout.php">
        <button type="submit">Logout</button>
    </form>
</body>
</html>
