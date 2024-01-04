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
        $sql = "SELECT * FROM sub_divisions";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $subDivisions = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $subDivisions = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($subDivisions);
        break;

    case "POST":
        $subDivision = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO sub_divisions (id, name, division, towns, villages) VALUES(:id, :name, :division, :towns, :villages)";
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':id', $subDivision->id !== null ? $subDivision->id : null, PDO::PARAM_STR);
        $stmt->bindValue(':name', $subDivision->name !== null ? $subDivision->name : null, PDO::PARAM_STR);
        $stmt->bindValue(':division', $subDivision->division !== null ? $subDivision->division : null, PDO::PARAM_STR);
        $stmt->bindValue(':towns', $subDivision->towns !== null ? $subDivision->towns : null, PDO::PARAM_STR);
        $stmt->bindValue(':villages', $subDivision->villages !== null ? $subDivision->villages : null, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $subDivision = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE sub_divisions SET name = :name, division = :division, towns = :towns, villages = :villages WHERE id = :id";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id', $subDivision->id);
        $stmt->bindParam(':name', $subDivision->name);
        $stmt->bindParam(':division', $subDivision->division);
        $stmt->bindParam(':towns', $subDivision->towns);
        $stmt->bindParam(':villages', $subDivision->villages);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM sub_divisions WHERE id = :id";
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
