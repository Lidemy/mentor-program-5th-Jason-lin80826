<?php
    require_once("conn.php");

    function get_user($username) {
        global $conn;
        $sql = "SELECT * FROM jason_users WHERE username= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s',$username);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row;
    }

    function get_role($username) {
        global $conn;
        $sql = "SELECT * FROM jason_users LEFT JOIN jason_roles ON jason_users.role_id = jason_roles.id WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s',$username);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row;
    }

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }
?>