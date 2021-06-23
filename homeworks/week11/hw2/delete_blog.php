<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  if (
    empty($_GET['id'])
  ) {
    header("Location: index.php");
    die('資料不齊全');
  }
  if ($username !== 'admin') {
    header("Location: index.php");
    die();
  }
  $sql = "DELETE FROM jason_blog_posts WHERE id = ? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>