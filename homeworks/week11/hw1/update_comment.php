<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET['id'];
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $user= getUserfromUsername($_SESSION['username']);
    $username = $user['username'];
  }
  
  $sql = 'SELECT * FROM jason_comments WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
        <h1 class="board__title">Comments</h1>
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                  $msg = '資料不齊全';
                } 
                if ($code === '2') {
                  $msg = '權限不足';
                } 
                echo '<h2 class="error">錯誤：' . $msg . '</h2>';
            }
        ?>
        <form action="handel_update_comment.php" method='POST' class='board__form'>
                <textarea name="content"  rows="5"><?php echo $row['content']; ?></textarea>
                <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
                <input type="submit" class="board__submitbutton"/>
        </form>
    </section>
</body>
</html>