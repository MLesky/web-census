<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM admin";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $admins = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($admins);
        break;

    case "POST":
        $admin = json_decode(file_get_contents('php://input'));
        $hashedPassword = password_hash($admin->password, PASSWORD_DEFAULT); // Hash the password
        $sql = "INSERT INTO admin (username, password) VALUES(:username, :password)";
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':username', $admin->username !== null ? $admin->username : null, PDO::PARAM_STR);
        $stmt->bindValue(':password', $hashedPassword !== null ? $hashedPassword : null, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Admin created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create admin.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $admin = json_decode(file_get_contents('php://input'));
        $hashedPassword = password_hash($admin->password, PASSWORD_DEFAULT); // Hash the password
        $sql = "UPDATE admin SET password = :password WHERE username = :username";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':username', $admin->username);
        $stmt->bindParam(':password', $hashedPassword);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Admin updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update admin.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM admin WHERE username = :username";
        $admin = json_decode(file_get_contents('php://input'));

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $admin->username);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Admin deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete admin.'];
        }
        echo json_encode($response);
        break;
}
?>
