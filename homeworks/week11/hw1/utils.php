<?php
    require_once("conn.php");

    function getUserfromUsername($username) {
        global $conn;
        $sql = sprintf("select * from jason_users where username='%s'", $username);
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row;
    }

    function get_role($username) {
        global $conn;
        $sql = sprintf("SELECT * FROM jason_users LEFT JOIN jason_roles ON jason_users.role_id = jason_roles.id WHERE username='%s'", $username);
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row;
    }

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }
?>