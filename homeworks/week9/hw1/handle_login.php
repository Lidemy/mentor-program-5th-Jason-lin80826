<?php
  session_start();
  require_once('conn.php');
  require_once("utils.php");

  if (
    empty($_POST['username']) ||
    empty($_POST['password'])
  ) {
    header('Location: login.php?errCode=1');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = sprintf(
    "select * from Jason_users where username='%s' and password='%s'",
    $username,
    $password
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }
  if ($result->num_rows) {
    $_SESSION['username'] = $username;
    header("Location: index.php");
  } else {
    header("Location: login.php?errCode=2");
  }
?>