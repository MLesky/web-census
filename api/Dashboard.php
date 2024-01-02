<?php

$host = "localhost";
$dbname = "if0_35599442_census_db";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Function to fetch data for the Gender Pie Chart
function getGenderPieChartData($pdo) {
    $query = "SELECT gender, COUNT(*) as count FROM users GROUP BY gender";
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

// Function to fetch data for the Head Counts by Regions Bar Chart
function getRegionBarChartData($pdo) {
    $query = "SELECT region, id FROM users";
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}



// Function to fetch data for the Total People, Children, and Old People by Region
function getTotalPeopleByRegion($pdo) {
    $query = "SELECT 
                region,
                COUNT(*) as total_people,
                SUM(CASE WHEN age > 50 THEN 1 ELSE 0 END) as total_old_people,
                SUM(CASE WHEN age > 21 AND age < 31 THEN children ELSE 0 END) as total_children
              FROM users
              GROUP BY region";
    
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

// Function to fetch data for the Head Counts by Age Group Bar Chart
function getHeadCountByAgeGroup($pdo) {
    $query = "SELECT age, COUNT(*) as count FROM users GROUP BY aged";
    
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

// Function to fetch data for the Yearly Increase Line Chart
function getYearlyIncreaseData($pdo) {
    $query = "SELECT 
                YEAR(registration_date) as year,
                COUNT(*) as count
              FROM users
              GROUP BY YEAR(registration_date)";
    
    $statement = $pdo->prepare($query);
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

// Simulating an asynchronous API call
if ($_GET['action'] === 'GET_DASHBOARD_DATA') {
    try {
        // Fetch data for each chart
        $genderPieChartData = getGenderPieChartData($pdo);
        $regionBarChartData = getRegionBarChartData($pdo);
        $totalPeopleByRegionData = getTotalPeopleByRegion($pdo);
        $headCountByAgeGroupData = getHeadCountByAgeGroup($pdo);
        $yearlyIncreaseData = getYearlyIncreaseData($pdo);

        // Combine all data into a single array
        $dashboardData = array(
            "genderPieChartData" => $genderPieChartData,
            "regionBarChartData" => $regionBarChartData,
            "totalPeopleByRegionData" => $totalPeopleByRegionData,
            "headCountByAgeGroupData" => $headCountByAgeGroupData,
            "yearlyIncreaseData" => $yearlyIncreaseData,
            // Add more data arrays for other charts
        );

        // Return the data as JSON
        header('Content-Type: application/json');
        echo json_encode($dashboardData);
        exit();
    } catch (PDOException $e) {
        // Handle database errors
        die("Error fetching data: " . $e->getMessage());
    }
}
?>
