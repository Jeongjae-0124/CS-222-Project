<?php
    class DbConnect {
        private $servername = "localhost";
        private $dbname = "uiucmarketplace_data";
        private $user = "root";
        private $pass = "";
 
        public function connect() {
            try {
                $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch (\Exception $e) {
                echo "Database Error: " . $e->getMessage();
            }
        }
         
    }
?>