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
        $sql = "SELECT * FROM divisions";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $divisions = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $divisions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($divisions);
        break;

    case "POST":
        $division = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO divisions (id, name, region) VALUES(:id, :name, :region)";
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':id', $division->id !== null ? $division->id : null, PDO::PARAM_STR);
        $stmt->bindValue(':name', $division->name !== null ? $division->name : null, PDO::PARAM_STR);
        $stmt->bindValue(':region', $division->region !== null ? $division->region : null, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $division = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE divisions SET name = :name, region = :region WHERE id = :id";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id', $division->id);
        $stmt->bindParam(':name', $division->name);
        $stmt->bindParam(':region', $division->region);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM divisions WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
?>
