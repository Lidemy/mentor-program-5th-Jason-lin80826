<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $username = $_SESSION['username'];
  $access = get_role($username);
  if($access['is_admin'] !== '1') {
    header("Location: index.php");
    die();
  }

  $id = $_POST['id'];
  $role_id = $_POST['role_id'];
  $sql = "SELECT * FROM jason_roles WHERE id = ? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i',$role_id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  
  if (
    empty($_POST['role_id'])
  ) {
    header('Location: update_access.php?errCode=1&id='.$_POST['id']);
    die('資料不齊全');
  } 
  if ($result->num_rows === 0) {
    header('Location: update_access.php?errCode=2&id='.$_POST['id']);
    die('沒這種角色');
  }

  $sql = "UPDATE jason_users SET role_id = ? WHERE id = ? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $role_id, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>