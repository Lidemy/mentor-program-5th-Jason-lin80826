<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $user= getUserfromUsername($_SESSION['username']);
    $username = $user['username'];
  }

  $result = $conn->query("select * from Jason_comments order by id desc");
  if (!$result) {
    die('Error:' . $conn->error);
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>留言板</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <header>
        注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </header>
    <section class='board'>
        <div>
            <?php
                if(!$username) {
            ?> 
                <a class="board__btn" href="register.php">註冊</a>
                <a class="board__btn" href="login.php">登入</a>
            <?php } else { ?>   
                <a class="board__btn" href="logout.php">登出</a>
                <h3>你好!<?php echo $username; ?></h3>
            <?php } ?> 
        </div>
        <h1 class="board__title">Comments</h1>
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
        <form action="handel_add_comment.php" method='POST' class='board__form'>
        <?php
            if($username) {
        ?> 
            <textarea name="content"  rows="5"></textarea>
            <input type="submit" class="board__submitbutton">
        <?php } else { ?> 
            <h3>請登入來發布留言</h3>   
        <?php } ?>     
        </form>
        <div class="board__hr"></div>
        <?php
            while($row = $result->fetch_assoc()) {
        ?>        
        <div class="card">
          <div class="card__avatar">
          </div>
          <div class="card__body">
              <div class="card__info">
                <span class="card__author">
                    <?php echo $row['nickname']; ?>
                </span>
                <span class="card__time">
                    <?php echo $row['create_time']; ?>
                </span>
              </div>
              <p class="card__content"><?php echo $row['content']; ?></p>
          </div>
        </div>
        <?php } ?>
    </section>
</body>
</html>