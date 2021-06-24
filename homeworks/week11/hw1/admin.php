<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $user= getUserfromUsername($_SESSION['username']);
    $username = $user['username'];
  }
  if ($username !== 'admin') {
    header("Location: index.php");
    die();
  }
  $sql = 'SELECT * FROM jason_users WHERE username NOT IN (?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s',$username);
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
    <link rel="stylesheet" href="./index.css">
    <title>admin</title>
</head>
<body>
    <header>
        注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </header>
    <div>
        <a class="board__btn" href="index.php">回留言板</a>
    </div>
    <div class="wrapper">
        <table>
            <tr>
                <th>帳號</th>
                <th>暱稱</th>
                <th>權限</th>
                <th>修改權限</th>
            </tr>
            <?php
                while($row = $result->fetch_assoc()) {
            ?>  
            <tr>
                <td><?php echo $row['username']; ?></td>
                <td><?php echo $row['nickname']; ?></td>
                <td><?php echo $row['role_id']; ?></td>
                <td><a href="update_access.php?id=<?php echo $row['id']?>">編輯</a></td>
            </tr>
            <?php } ?>            
        </table>
    </div>
</body>
</html>