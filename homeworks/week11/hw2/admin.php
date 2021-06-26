<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_SESSION['username'])) {
    header("Location: index.php");
  }
  $sql = 'SELECT * FROM jason_blog_posts ORDER BY id DESC';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="normalize.css" />
    <link rel="stylesheet" href="index.css" />
    <script src="ckeditor/ckeditor.js"></script>
    <title>blog</title>
</head>
<body>
    <nav class="header__nav">
        <div class="nav__left">
          <ul>
              <li id="first"><a href="index.php">Who's Blog</a></li>
              <li><a href="blogsList.php">文章列表</a></li>
              <li>分類專區</li>
              <li>關於我</li>
          </ul>
        </div>
        <div class="nav__right">
            <ul>
                <li><a href="admin.php">管理後臺</a></li>  
                <li><a href="add_blog.php">新增文章</a></li>
                <li><a href="handle_logout.php">登出</a></li>
            </ul>
        </div>
    </nav>
    <section class="banner">
            <div>存放技術之地-後台</div>
            <div>Welcome to my blog</div>
    </section>
    <div class="blogs__container">
        <div class="posts">
            <?php while($row = $result->fetch_assoc()) { ?>
                <div class="admin__header">
                    <?php echo escape($row['title']) ?>
                    <div class="admin__action">
                            <?php echo $row['create_time'] ?>
                            <a class="post__action" href="edit_blog.php?id=<?php echo escape($row['id'])?>">編輯</a>
                            <a class="post__action" href="delete_blog.php?id=<?php echo escape($row['id'])?>">刪除</a>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>    
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer> 
</body>
</html>