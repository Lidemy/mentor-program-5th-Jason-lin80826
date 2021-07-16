
export function getAllComments(isLoading, apiUrl, siteKey, page, cb) {
  isLoading = true
  $.ajax({
    url: `${apiUrl}/api_comments.php?site_key=${siteKey}&page=${page}`,
    context: document.body
  }).done((data) => {
    cb(data)
  })
}
export function addComment(apiUrl, inputData, cb) {
  $.ajax({
    url: `${apiUrl}/api_add_comments.php`,
    type: 'POST',
    data: inputData
  }).done((data) => {
    cb(data)
  })
}
