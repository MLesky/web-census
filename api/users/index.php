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
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users (id, first_name, second_name, sur_name, gender, date_of_birth, place_of_birth, boys_blw_22, girls_blw_22, boys_abv_21, girls_abv_21, sub_division, town_village) VALUES(:id, :first_name, :second_name, :sur_name, :gender, :date_of_birth, :place_of_birth, :boys_blw_22, :girls_blw_22, :boys_abv_21, :girls_abv_21, :sub_division, :town_village)";
        $stmt = $conn->prepare($sql);

        
        //$stmt->bindParam(':first_name', $user->firstName);
        $stmt->bindValue(':id', ($user->id !== null || $user->id == '') ? $user->id : null, PDO::PARAM_STR);
        $stmt->bindValue(':first_name', $user->firstName !== null ? $user->firstName : null, PDO::PARAM_STR);
        $stmt->bindParam(':second_name', $user->secondName);
        $stmt->bindParam(':sur_name', $user->surname);
        $stmt->bindParam(':gender', $user->gender);
        $stmt->bindParam(':date_of_birth', $user->dateOfBirth);
        $stmt->bindParam(':place_of_birth', $user->placeOfBirth);
        $stmt->bindParam(':boys_blw_22', $user->boysBlw_22);
        $stmt->bindParam(':girls_blw_22', $user->girlsBlw_22);
        $stmt->bindParam(':boys_abv_21', $user->boysAbv_21);
        $stmt->bindParam(':girls_abv_21', $user->girlsAbv_21);
        $stmt->bindParam(':sub_division', $user->subDivision);
        $stmt->bindParam(':town_village', $user->townVillage);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE users SET first_name = :first_name, second_name = :second_name, sur_name = :sur_name, gender = :gender, date_of_birth = :date_of_birth, place_of_birth = :place_of_birth, boys_blw_22 = :boys_blw_22, girls_blw_22 = :girls_blw_22, boys_abv_21 = :boys_abv_21, girls_abv_21 = :girls_abv_21, sub_division = :sub_division, town_village = :town_village WHERE id = :id";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':first_name', $user->firstName);
        $stmt->bindParam(':second_name', $user->secondName);
        $stmt->bindParam(':sur_name', $user->surname);
        $stmt->bindParam(':gender', $user->gender);
        $stmt->bindParam(':date_of_birth', $user->dateOfBirth);
        $stmt->bindParam(':place_of_birth', $user->placeOfBirth);
        $stmt->bindParam(':boys_blw_22', $user->boysBlw_22);
        $stmt->bindParam(':girls_blw_22', $user->girlsBlw_22);
        $stmt->bindParam(':boys_abv_21', $user->boysAbv_21);
        $stmt->bindParam(':girls_abv_21', $user->girlsAbv_21);
        $stmt->bindParam(':sub_division', $user->subDivision);
        $stmt->bindParam(':town_village', $user->townVillage);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
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
