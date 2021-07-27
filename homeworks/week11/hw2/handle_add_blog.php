<?php
  session_start();
  require_once('conn.php');

  $username =  $_SESSION['username'];

  if (
    empty($_POST['blog_title']) ||
    empty($_POST['blog_content'])
  ) {
    header('Location: add_blog.php?errCode=1');
    die('資料不齊全');
  }
  $title = $_POST['blog_title'];
  $content = $_POST['blog_content'];

  if ($username !== 'admin') {
    die();
  }
  $sql = "INSERT INTO jason_blog_posts(title, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $title, $content);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>