<?php
    require_once('conn.php');
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    
    if (empty($_GET['site_key'])) {
        $json = array(
            "ok" => false ,
            "message" => "Pleaes input sitekey"
        );

        $response = json_encode($json);
        echo $response;
        die();
    };
    $page = $_GET['page'];
    $items_per_page = 5;
    $offset = ($page - 1) * $items_per_page;
    $site_key = $_GET['site_key'];

    $sql = "SELECT nickname, content, create_time FROM jason_discussions WHERE site_key = ? " . 
    "ORDER BY id DESC " . 
    "limit? offset?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sii',$site_key, $items_per_page, $offset);
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
    $discussions = array();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()) {
        array_push($discussions,array(
            "nickname" => $row['nickname'],
            "content" => $row['content'],
            "create_time" => $row['create_time']
        ));
    }
    $json = array(
        "ok" => true,
        "discussions" => $discussions
    );
    $response = json_encode($json);
    echo $response;
?>