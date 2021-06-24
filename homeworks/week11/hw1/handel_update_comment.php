<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_POST['id'];
  $content = $_POST['content'];
  $username= $_SESSION['username'];
  $access =  get_role($username);
  if (
    empty($_POST['content'])
  ) {
    header('Location: update_comment.php?errCode=1&id='.$_POST['id']);
    die('資料不齊全');
  }

  if ($access['update_any'] === '1') {
    $where = "";
  } else if ($access['update_own'] === '1') {
    $where = "AND username = ?";
  } else {
    header('Location: update_comment.php?errCode=2&id='.$_POST['id']);
    die('權限不足');
  }

  $sql = "UPDATE jason_comments SET content = ? WHERE id = ? " . $where;
  $stmt = $conn->prepare($sql);
  
  if ($access['update_any'] === '1') {
    $stmt->bind_param('si', $content, $id);
  } else if ($access['update_own'] === '1') {
    $stmt->bind_param('sis', $content, $id, $username);
  } 
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>