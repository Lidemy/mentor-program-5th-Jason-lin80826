/* eslint-disable */
import $ from 'jQuery'
import { addComment, getAllComments } from './api.js'
import { escape, appendComments, appendStyle } from './utils'
import { getCss, getForm } from './template'

window.jQuery = $
window.$ = $

export default function init(options) {
  let page = 1
  let siteKey = ''
  let apiUrl = ''
  let containElement = null
  let isLoading = false
  let isDone = false
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  apiUrl = options.apiUrl

  commentsClassName = `${siteKey}-comments`
  commentsSelector = '.' + commentsClassName
  formClassName = `${siteKey}-add-comment-form`
  formSelector = '.' + formClassName

  containElement = $(options.containerSelector)
  containElement.append(getForm(formClassName, commentsClassName))
  appendStyle(getCss(commentsClassName))

  getAllComments(isLoading, apiUrl, siteKey, page, (data) => {
    isLoading = false
    if (!data.ok) {
      alert(data.message)
      return
    }
    const comments = data.discussions
    appendComments(commentsSelector, comments, (responseCount) => {
      if (responseCount === 0) {
        isDone = true
      }
    })
  })
$(formSelector).submit((event) => {
    event.preventDefault()
    if (isLoading) return
    isLoading = true
    const nickNameDom = $(`${formSelector} input[name=nickname]`)
    const contentDom = $(`${formSelector} textarea[name=content]`)
    const inputData = {
      site_key: siteKey,
      nickname: nickNameDom.val(),
      content: contentDom.val()
    }
    addComment(apiUrl, inputData, (data) => {
      isLoading = false
      if (!data.ok) {
        alert(data.message)
        return
      }
      nickNameDom.val('')
      contentDom.val('')
      $(commentsSelector).prepend(
            `<div class="card mt-3">
                <div class="card-body">
                    <h5 class="card-title">${escape(inputData.nickname)}</h5>
                    <p class="card-text">${escape(inputData.content)}</p>
                </div>
            </div>`
      )
    })
  })
  $(document).ready(() => {
    $(commentsSelector).scroll(() => {
	    if ($(commentsSelector).scrollTop() + $(commentsSelector).height() > $(commentsSelector).outerHeight() - 30) {
		  if (!isLoading && !isDone) {
			  page++
			  getAllComments(isLoading, apiUrl, siteKey, page, (data) => {
				  if (!data.ok) {
					 alert(data.message)
					 return
				  }
				  const comments = data.discussions
				  appendComments(commentsSelector, comments, (responseCount) => {
					 if (responseCount === 0) {
						 isDone = true
					 }
				  })
				})
		   }
	    }
    })
  })
}