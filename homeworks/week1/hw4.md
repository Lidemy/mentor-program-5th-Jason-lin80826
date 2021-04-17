## 跟你朋友介紹 Git
Git 為一種版本控制的工具，使用時需要先在欲版控的資料夾輸入 `git init` 來入加入版本控制，此時在你的資料夾會多了一個叫做 .git 的資料夾。
Git 將 "尚未被提交" 的檔案分成三個區塊，由上而下分別是
1. **Changes to be committed**（將要提交的檔案）
2. **Changes not staged for commit**（被更動但尚未要提交的檔案）
3. **Untracked files**（未被追蹤的檔案）  

當我們初始化過後，資料內原有的檔案都會是 **Untracked files** 此時我們需要輸入`git add .`便可以將所有檔案一次全部變為 **Changes to be committed**，若之後有更改檔案的話狀態會變為 **Changes not staged for commit** 則需要再輸入一次 `git add .`來將狀態變回準備 commit 的狀態，然後`git commit`指令就會形成一個 「儲存庫」。 

所以我們一般的流程會是 :
1. git init
2. git add .
3. 修改檔案
4. git add . 
5. git commit -m 'commit message'

當你本地的程式碼都修改滿意後，可以將這個被 git 版控的資料夾推上遠端的儲存庫 例如: GitHub ，便可以與他人分享或是共同協作
*  `git remote add origin 'repo url'` 建立與端儲存庫的連結
* `git push origin master` 將本地檔案推上遠端
* `git pull origin master` 將遠端檔案拉下來本地
