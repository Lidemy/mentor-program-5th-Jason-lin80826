export function getCss(commentsClassName) {
  return `
    .container {
        margin-top: 50px;
    }
    .${commentsClassName} {
        height: 300px;
        overflow-y:auto
    }
    `
}
export function getForm(className, commentsClassName) {
  return `
    <div>
        <form  method="POST" class="${className}">
            <div class="mb-3">
                <label class="form-label">暱稱</label>
                <input type="text" class="form-control" name='nickname' placeholder="請輸入暱稱">
            </div>
            <div class="mb-3">
                <label class="form-label">留言內容</label>
                <textarea class="form-control" name='content' rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">留言</button>
        </form>
        <div class="${commentsClassName}">
        </div>
    </div>
    `
}
