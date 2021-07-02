<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    if (empty($_POST['token'])) {
        $json = array(
            "ok" => false ,
            "message" => "請輸入token"
        );

        $response = json_encode($json);
        echo $response;
        die();
    };

    $token = $_POST['token'];

    $sql = "SELECT * FROM jason_todolist WHERE token = ? ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $token);
    $result = $stmt->execute();
    if (!$result) {
        $json = array(
            "ok" => false ,
            "message" => $conn->error
        );
        $response = json_encode($json);
        echo $response;
        die();
    };
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $data = $row['todos'];
    $json = array(
        "ok" => true,
        "message" => "載入成功",
        "todos"=>$data
    );
    $response = json_encode($json);
    echo $response;
?>