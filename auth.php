<?php
session_start();
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chatbot_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$action = $_POST['action'] ?? '';

if ($action == 'register') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $captcha = $_POST['captcha'] ?? '';
    $captcha_code = $_POST['captcha_code'] ?? '';
    
    if ($captcha !== $captcha_code) {
        echo json_encode(["success" => false, "message" => "Invalid captcha code"]);
        exit;
    }
    
    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit;
    }
    
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result();
    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        exit;
    }
    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Registration successful! Please login."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
}

if ($action == 'login') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    
    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "All fields are required"]);
        exit;
    }
    
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            echo json_encode(["success" => true, "message" => "Login successful!", "username" => $row['username']]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "No account found with this email"]);
    }
}

$conn->close();
