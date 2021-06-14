<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>註冊</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <header>
        注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </header>
    <section class='board'>
        <div>
            <a class="board__btn" href="index.php">回留言板</a>
            <a class="board__btn" href="login.php">登入</a>
        </div>
        <h1 class="board__title">註冊</h1>
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                  $msg = '資料不齊全';
                } else if ($code === '2') {
                  $msg = '帳號已被註冊';
                }
                echo '<h2 class="error">錯誤：' . $msg . '</h2>';
            }
        ?>
        <form action="handle_register.php" method='POST' class='board__form'>
            <div class="board__nickname">
                暱稱:
                <input type="text" name="nickname">
            </div>
            <div class="board__nickname">
                帳號:
                <input type="text" name="username">
            </div>
            <div class="board__nickname">
                密碼:
                <input type="password" name="password">
            </div>
            <input type="submit" class="board__submitbutton">
        </form>
    </section>
</body>
</html>