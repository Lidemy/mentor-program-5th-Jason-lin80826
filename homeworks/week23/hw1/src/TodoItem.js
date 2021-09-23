import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  deleteTodo,
  status,
  updateTodo,
  completeUpdate,
} from './redux/todoSlice';

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

export default function TodoItem({ todo }) {
  const { id, isDone, isUpdate } = todo;
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState('');

  const handleClick = () => {
    dispatch(completeUpdate({ id, newContent }));
  };
  return (
    <TodoItemWrapper>
      <input
        onChange={(e) => {
          setNewContent(e.target.value);
        }}
        defaultValue={todo.content}
        style={isUpdate ? { display: 'block' } : { display: 'none' }}
      />
      {isUpdate ? (
        ''
      ) : (
        <TodoContent isDone={isDone}>{todo.content}</TodoContent>
      )}
      <TodoButtonWrapper>
        {isUpdate ? (
          <Button onClick={handleClick}>完成</Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(updateTodo(id));
            }}
          >
            編輯
          </Button>
        )}
        <Button
          onClick={() => {
            dispatch(status(id));
          }}
        >
          {isDone ? '已完成' : '未完成'}
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteTodo(id));
          }}
        >
          刪除
        </Button>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
