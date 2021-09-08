import React from "react";
import styled from "styled-components";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px black solid;
  margin-top: 5px;
`;

const TodoContent = styled.div`
  color: rgb(2, 40, 77);
  ${(props) =>
    props.isDone === true &&
    `
    color: red;
    text-decoration:line-through;
  `}
`;
const TodoButtonWrapper = styled.div``;

const Button = styled.button`
  padding: 4px;
  color: black;

  &:hover {
    color: red;
  }

  & + & {
    margin-left: 4px;
  }
`;

export default function TodoItem(props) {
  const { useRef } = React;
  const { todo, handleDelete, handleStatus, handleUpdate, completeUpdate } =
    props;
  const { id, isDone, isUpdate } = todo;

  const content = useRef("");

  const handleClick = () => {
    const newContent = content.current.value;
    completeUpdate(id, newContent, isDone);
  };
  return (
    <TodoItemWrapper>
      <input
        ref={content}
        defaultValue={todo.content}
        style={isUpdate ? { display: "block" } : { display: "none" }}
      />
      {isUpdate ? (
        ""
      ) : (
        <TodoContent isDone={isDone}>{todo.content}</TodoContent>
      )}
      <TodoButtonWrapper>
        {isUpdate ? (
          <Button onClick={handleClick}>完成</Button>
        ) : (
          <Button
            onClick={() => {
              handleUpdate(id);
            }}
          >
            編輯
          </Button>
        )}
        <Button
          onClick={() => {
            handleStatus(id);
          }}
        >
          {isDone ? "已完成" : "未完成"}
        </Button>
        <Button
          onClick={() => {
            handleDelete(id);
          }}
        >
          刪除
        </Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
