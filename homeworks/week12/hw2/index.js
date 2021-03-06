$(document).ready(() => {
  function escape(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  let isEditing = false
  let isLoading = false
  let state = 'all'
  let uncompleted
  const todoList = $('.todo-list')
  getStatus()
  // 新增todo
  $('#button-addon2').click(() => {
    const inputValue = $('.form-control').val()
    if (!inputValue) return
    const todoItem = `                
    <div class='todo-item mt-3 '>
        <input type='checkbox' >
        <span>${escape(inputValue)}</span>
        <input class='edit-text hidden' type='text'>
        <div class='action'>
            <button type='button' class='btn btn-success edit'>編輯</button>
            <button type='button' class='btn btn-danger'>刪除</button>
        </div>
    </div>`
    todoList.append(todoItem)
    $('.form-control').val('')
    getStatus()
  })
  // 標記todo
  todoList.on('click', 'input[type=checkbox]', (e) => {
    $(e.target).next().toggleClass('mark')
    getStatus(state)
  })
  // 刪除todo
  todoList.on('click', '.btn-danger', (e) => {
    $(e.target).parent().parent().remove()
    getStatus()
  })
  // 編輯todo
  todoList.on('click', '.edit', (e) => {
    if (isEditing) return
    isEditing = true
    const todoContent = $(e.target).parent().prev().prev()
    const editor = $(e.target).parent().prev()
    todoContent.hide()
    editor.val(todoContent.text())
    editor.removeClass('hidden')
  })
  // 結束編輯todo
  $(window).click((e) => {
    if (!isEditing) return
    const editinput = $('.todo-list').find('.edit-text').not('.hidden')
    const targetArea = editinput.parent()
    if (!targetArea.is(e.target) && targetArea.has(e.target).length === 0) {
      const editContent = editinput.val()
      editinput.addClass('hidden')
      editinput.prev().show()
      editinput.prev().html(editContent)
      isEditing = false
    }
  })
  // 清空todo
  $('.delete-alltask').click((e) => {
    e.preventDefault()
    const allTodoItem = $('.todo-item')
    allTodoItem.children('span.mark').parent().remove()
    state === 'completed' ? getStatus('completed') : getStatus()
  })
  function getStatus(state) {
    const checkboxs = $('input[type=checkbox]')
    uncompleted = checkboxs.not(':checked').length
    console.log(uncompleted)
    $('.uncompleted').text(uncompleted)
    const allTodoItem = $('.todo-item')
    allTodoItem.children('span').parent().show()
    if (state === 'active') {
      allTodoItem.children('span.mark').parent().hide()
    } else if (state === 'completed') {
      allTodoItem.children('span:not(.mark)').parent().hide()
    }
  }
  $('.active-task').click((e) => {
    e.preventDefault()
    state = 'active'
    getStatus(state)
  })
  $('.all-task').click((e) => {
    e.preventDefault()
    state = 'all'
    getStatus(state)
  })
  $('.completed-task').click((e) => {
    e.preventDefault()
    state = 'completed'
    getStatus(state)
  })
  $('.save').click(() => {
    const todos = []
    const allTodoItem = $('.todo-item')
    const todoitems = allTodoItem.children('span')
    $.each(todoitems, (index, value) => {
      const todoObject = {}
      todoObject.mark = value.classList.contains('mark') ? '1' : '0'
      todoObject.text = value.innerHTML
      todos.push(todoObject)
    })
    const todoJson = { todos }
    $.ajax({
      url: './api_add_todolist.php',
      data: JSON.stringify(todoJson),
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json;charset=utf-8'
    }).done((data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      alert(`這是你的識別:${data.token}`)
    })
  })
  $('.load').click(() => {
    if (isLoading) return
    isLoading = true
    const token = $('#token-name').val()
    const data = { token }
    $.ajax({
      url: './api_todolist.php',
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      type: 'POST',
      data
    }).done((data) => {
      isLoading = false
      if (!data.ok) {
        alert(data.message)
        return
      }
      let { todos } = data
      todos = JSON.parse(todos)
      todoList.html('')
      for (const todo of todos) {
        if (todo.mark === '1') {
          todoList.append(`
                    <div class='todo-item mt-3 '>
                        <input type='checkbox' checked>
                        <span class='mark'>${escape(todo.text)}</span>
                        <input class='edit-text hidden' type='text'>
                        <div class='action'>
                            <button type='button' class='btn btn-success edit'>編輯</button>
                            <button type='button' class='btn btn-danger'>刪除</button>
                        </div>
                    </div>
                `)
        } else {
          todoList.append(`
                    <div class='todo-item mt-3 '>
                        <input type='checkbox' >
                        <span>${escape(todo.text)}</span>
                        <input class='edit-text hidden' type='text'>
                        <div class='action'>
                            <button type='button' class='btn btn-success edit'>編輯</button>
                            <button type='button' class='btn btn-danger'>刪除</button>
                        </div>
                    </div>
                `)
        }
      }
      getStatus()
    })
  })
})
