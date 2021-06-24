<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $user= get_user($_SESSION['username']);
    $username = $user['username'];
  }
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
              <?php if($username === 'admin') { ?>
                <li><a href="admin.php">管理後臺</a></li> 
              <?php } else { ?>  
                <li><a href="add_blog.php">新增文章</a></li>
              <?php } ?>     
                <li><a href="handle_logout.php">登出</a></li>
            </ul>
        </div>
    </nav>
    <section class="banner">
            <div>存放技術之地</div>
            <div>Welcome to my blog</div>
    </section>
    <div class="blogs__container">
        <div class="posts">
           <article class="post">
            <form action="handle_add_blog.php" method='POST' class="blogs__login">
                    <div class="post__header">
                    <div>發表文章: </div>
                    </div>  
                    <div class="add__input">
                        <input type="text" placeholder="請輸入文章標題..." name="blog_title">
                    </div>
                    <textarea name="blog_content" id="editor"></textarea>
                    <?php
                        if (!empty($_GET['errCode'])) {
                            $code = $_GET['errCode'];
                            $msg = 'Error';
                            if ($code === '1') {
                            $msg = '資料不齊全';
                            }
                            echo '<h2 class="error">錯誤：' . $msg . '</h2>';
                        }
                    ?>
                    <input type="submit" class="add__submitbutton" value ="發表文章">
                </form>  
                <script>
                        ClassicEditor
                            .create( document.querySelector( '#editor' ) )
                            .catch( error => {
                                console.error( error );
                            } );
                </script>  
           </article>     
        </div>
    </div>    
    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer> 
</body>
</html>