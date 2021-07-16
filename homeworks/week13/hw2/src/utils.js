export function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function appendComments(commentDOM, comments, cb) {
  let responseCount = 0
  for (const comment of comments) {
    responseCount++
    $(commentDOM).append(
            `<div class='card mt-3'>
                <div class='card-body'>
                    <h5 class='card-title'>${escape(comment.nickname)}</h5>
                    <p class='card-text'>${escape(comment.content)}</p>
                </div>
            </div>`
    )
  }
  cb(responseCount)
}

export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)
}
