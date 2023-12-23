<?php
/**
 * Database Connection
 */
class DbConnect {
    private $server = 'localhost';
    private $dbname = 'if0_35599442_census_db';
    private $user = 'root';
    private $pass = '';

    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Log message to the error log
            error_log("Connected to the database successfully");

            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}
?>
