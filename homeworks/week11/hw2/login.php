<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
            font-family: MicrosoftJhengHei;
        }
        .wrapper {
            width: 25vw;
            height: 40vh;
            padding: 73px;
            border: solid 1px #000000;
            background-color: var(--white);
            margin: 200px auto;
        }
        .blogs__login {
            width: 100%;
            height: 100%;
        }
        h2 {
            margin: 0px auto;
            width: 33%;
            text-align: center;
            font-size: 32px;
        }
        .login__input  {
            margin-top:20px;
        }
        .login__input p{
            font-size: 14px;
            margin-left: 5px;
        }
        .login__input input{
            width: 100%;
            height: 30px;
            margin-top:10px;
        }
        .blog__submitbutton {
            width: 100%;
            height: 10%;
            margin-top: 100px;
            background-image: linear-gradient(to top, #000000, #434343);
            color: white;  
            cursor: pointer;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <form action="handle_login.php" method='POST' class="blogs__login">
            <h2>Log In</h2>
            <div class="login__input">
                    <p>USERNAME</p>
                    <input type="text" name="username">
            </div>
            <div class="login__input">
                    <p>PASSWORD</p>
                    <input type="password" name="password">
            </div>
            <input type="submit" class="blog__submitbutton">
        </form>
        <?php
            if (!empty($_GET['errCode'])) {
                $code = $_GET['errCode'];
                $msg = 'Error';
                if ($code === '1') {
                $msg = '資料不齊全';
                }
                echo '<h3 class="error">錯誤：' . $msg . '</h2>';
            }
        ?>
    </div>
</body>
</html>