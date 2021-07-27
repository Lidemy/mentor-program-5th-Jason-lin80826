<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user= get_user($username);
  $access = get_role($username);
  if (
    empty($_GET['id'])
  ) {
    header("Location: index.php");
    die('資料不齊全');
  }

  if ($access['delete_any'] === '1') {
    $where = "";
  } else if ($access['delete_own'] === '1') {
    $where = "AND username = ?";
  } else {
    header("Location: index.php");
    die();
  }

  $sql = "UPDATE jason_comments SET is_deleted = 1 WHERE id = ? " . $where;
  $stmt = $conn->prepare($sql);
  
  if ($access['delete_any'] === '1') {
    $stmt->bind_param('i', $id);
  } else if ($access['delete_own'] === '1') {
    $stmt->bind_param('is', $id, $username);
  } 
  $result = $stmt->execute();

  header("Location: index.php");
?>