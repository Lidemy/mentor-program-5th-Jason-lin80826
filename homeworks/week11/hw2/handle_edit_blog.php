<?php
  session_start();
  require_once('conn.php');

  if (
    empty($_POST['blog_title']) ||
    empty($_POST['blog_content']) ||
    empty($_POST['id'])
  ) {
    header('Location: edit_blog.php?errCode=1');
    die('資料不齊全');
  }
  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $title = $_POST['blog_title'];
  $content = $_POST['blog_content'];
  
  if ($username !== 'admin') {
    header("Location: index.php"); 
    die();
  }
  $sql = "UPDATE jason_blog_posts SET title =?, content = ? WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>