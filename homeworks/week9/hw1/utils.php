<?php
    require_once("conn.php");

    function getUserfromUsername($username) {
        global $conn;
        $sql = sprintf("select * from Jason_users where username='%s'", $username);
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row;
    }
?>