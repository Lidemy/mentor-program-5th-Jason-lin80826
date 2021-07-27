<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET['id'];
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $user= get_user($_SESSION['username']);
    $username = $user['username'];
    $access = get_role($username);
  }

  if($access['is_admin'] !== '1') {
    header("Location: index.php");
    die();
  }
  
  $sql = 'SELECT * FROM jason_users WHERE id = ?';
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
    <title>修改角色</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <header>
        注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </header>
    <section class='board'>
        <div>
            <a class="board__btn" href="index.php">回留言板</a>
        </div>
        <div>
        <h1 class="board__title">修改角色</h1>
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                    $msg = '資料不齊全';
                } else if ($code === '2') {
                    $msg = '沒這種角色';
                }
                echo '<h2 class="error">錯誤：' . $msg . '</h2>';
            }
        ?>
        <form action="handel_update_access.php" method='POST' class='board__form'>
            <table>
                <tr>
                    <th>帳號</th>
                    <th>暱稱</th>
                    <th>權限</th>
                </tr>
                <tr>
                    <td><?php echo $row['username']; ?></td>
                    <td><?php echo $row['nickname']; ?></td>
                    <td><input type="text" name="role_id" value="<?php echo $row['role_id'] ?>" /></td>
                </tr>          
            </table>
            <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
            <input type="submit" class="board__submitbutton"/>
        </form>
    </section>
</body>
</html>