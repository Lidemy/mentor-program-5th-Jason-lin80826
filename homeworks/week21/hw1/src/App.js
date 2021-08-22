import React from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";

const Button = styled.button`
  padding: 4px;
  color: black;

  & + & {
    margin-left: 4px;
  }
`;

function App() {
  const { useState, useRef } = React;
  const [todos, setTodo] = useState([]);
  const [condition, setCondition] = useState("all");
  const inputEl = useRef(null);
  const id = useRef(0);

  const handleAdd = () => {
    if (!inputEl.current.value) {
      return alert("請輸入內容");
    }
    setTodo([
      ...todos,
      {
        id: id.current,
        content: inputEl.current.value,
        isDone: false,
        isUpdate: false,
      },
    ]);
    id.current++;
    inputEl.current.value = "";
  };

  const handleDelete = (id) => {
    setTodo(todos.filter((todo) => todo.id !== id));
  };

  const handleStatus = (id) => {
    setTodo(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
          isUpdate: false,
        };
      })
    );
  };

  const handleUpdate = (id) => {
    setTodo(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isUpdate: true,
        };
      })
    );
  };

  const completeUpdate = (id, newContent, isDone) => {
    setTodo(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id,
          content: newContent,
          isDone,
          isUpdate: false,
        };
      })
    );
  };

  const deleteALL = () => {
    setTodo([]);
  };

  return (
    <>
      <div className="App">
        <input ref={inputEl} placeholder="請輸入" />
        <button onClick={handleAdd}>新增</button>
        {todos
          .filter((todo) => {
            return condition === "all"
              ? todo
              : condition === "done"
              ? todo.isDone
              : !todo.isDone;
          })
          .map((todo) => {
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                handleDelete={handleDelete}
                handleStatus={handleStatus}
                handleUpdate={handleUpdate}
                completeUpdate={completeUpdate}
              />
            );
          })}
      </div>
      <Button onClick={deleteALL}>清空</Button>
      <Button
        onClick={() => {
          setCondition("all");
        }}
      >
        全部
      </Button>
      <Button
        onClick={() => {
          setCondition("done");
        }}
      >
        已完成
      </Button>
      <Button
        onClick={() => {
          setCondition("pending");
        }}
      >
        未完成
      </Button>
    </>
  );
}

export default App;
