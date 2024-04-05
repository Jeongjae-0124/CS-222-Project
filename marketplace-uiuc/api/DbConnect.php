<?php
    class DbConnect {
        private $servername = "localhost:3306";
        private $dbname = "uiucmarketplace_data";
        private $user = "uiucmarketplace_admin";
        private $pass = "Access0131!";
 
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