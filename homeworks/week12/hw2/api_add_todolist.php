<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    $input = json_decode(file_get_contents('php://input'), true);

    function generateToken() {
        $s = '';
        for($i=1; $i<=16; $i++) {
          $s .= chr(rand(65,90));
        }
        return $s;
    }    

    if (!isset($input['todos'])) {
        $json = array(
            "ok" => false ,
            "message" => "Pleaes input missing fields"
        );

        $response = json_encode($json);
        echo $response;
        die();
    };
    $todos = json_encode($input['todos']);
    $token = generateToken();

    $sql = "INSERT INTO  jason_todolist (token , todos) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $token, $todos);
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

    $json = array(
        "ok" => true,
        "message" => "success",
        "token"=>$token
    );
    $response = json_encode($json);
    echo $response;
?>