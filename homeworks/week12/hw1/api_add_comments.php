<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    if (
        empty($_POST['site_key']) ||
        empty($_POST['nickname']) ||
        empty($_POST['content'])
    ) {
        $json = array(
            "ok" => false ,
            "message" => "Pleaes input missing fields"
        );

        $response = json_encode($json);
        echo $response;
        die();
    };
    
    $site_key = $_POST['site_key'];
    $nickname = $_POST['nickname'];
    $content = $_POST['content'];

    $sql = "INSERT INTO  jason_discussions (site_key, nickname, content) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss',$site_key, $nickname, $content);
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
        "message" => "success"
    );
    $response = json_encode($json);
    echo $response;
    die();
?>