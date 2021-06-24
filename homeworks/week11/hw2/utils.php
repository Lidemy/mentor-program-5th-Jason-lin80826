<?php
    require_once("conn.php");

    function get_user($username) {
        global $conn;
        $sql = sprintf("SELECT * FROM jason_blog_users WHERE username='%s'", $username);
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        return $row;
    }

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }
?>
<script>
    window.onload = () => {
        const posts = document.querySelector('.posts')
        posts.addEventListener('click', (event) => {
            if(event.target.classList.contains('btn-read-more')) {
                event.preventDefault()
                if (event.target.innerText === 'READ MORE' && event.target.previousSibling.previousSibling.scrollHeight > '200' ) {
                    event.target.previousSibling.previousSibling.classList.remove("hidden") 
                    event.target.innerText = '收起來'     
                } else if (event.target.innerText === '收起來'){
                    event.target.previousSibling.previousSibling.classList.add("hidden") 
                    event.target.innerText = 'READ MORE'     
                }
            }
        })
    }
</script>