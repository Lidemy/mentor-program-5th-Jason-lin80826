<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $page = 1;
  if (!empty($_GET['page'])) {
      $page = intval($_GET['page']);
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $user= get_user($_SESSION['username']);
    $username = $user['username'];
  }
  
  $sql = 'SELECT * FROM jason_blog_posts ORDER BY id DESC LIMIT ? OFFSET ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $items_per_page, $offset);
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
              <?php if($username === 'admin') { ?>
                <li><a href="admin.php">管理後臺</a></li> 
                <li><a href="add_blog.php">新增文章</a></li>
              <?php } ?>    
              <?php if($username) { ?> 
                <li><a href="handle_logout.php">登出</a></li>
              <?php } else {?>  
                <li><a href="login.php">登入</a></li>
              <?php } ?>    
            </ul>
        </div>
    </nav>
    <section class="banner">
            <div>存放技術之地</div>
            <div>Welcome to my blog</div>
    </section>
    <div class="blogs__container">
        <div class="posts">
          <?php while($row = $result->fetch_assoc()) { ?>
           <article class="post">
                <div class="post__header">
                  <?php echo escape($row['title']) ?>
                </div>
                <div class="post__info">
                  <?php echo escape($row['create_time']) ?>
                </div>
                <div class="post__content hidden">
                  <?php echo $row['content'] ?>
                </div>  
                <a class="btn-read-more" href="#">READ MORE</a>
           </article>
          <?php } ?>     
        </div>
      </div>
      <?php
        $sql = "SELECT COUNT(id) AS count FROM jason_blog_posts ";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count = $row['count'];
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="paginator">
              <?php if($page != 1) { ?>               
                <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
              <?php } ?> 
              <?php if($page != $total_page) { ?> 
                <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
              <?php } ?>   
      </div>
      <footer>
        Copyright © 2020 Who's Blog All Rights Reserved.
      </footer> 
</body>
</html>