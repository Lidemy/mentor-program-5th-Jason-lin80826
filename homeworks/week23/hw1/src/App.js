import React, { useState, useRef } from 'react';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { all, done, pending } from './redux/filterSlice';
import { addTodo, deleteAll } from './redux/todoSlice';

const Button = styled.button`
  padding: 4px;
  color: black;

  & + & {
    margin-left: 4px;
  }
`;

function App() {
  const todo = useSelector((state) => state.todo.value);
  const filter = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const id = useRef(0);

  return (
    <>
      <div className="App">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="請輸入"
        />
        <button
          onClick={() => {
            if (!input.trim()) {
              return alert('請輸入內容');
            }
            dispatch(
              addTodo({
                id: id.current,
                content: input,
                isDone: false,
                isUpdate: false,
              })
            );
            setInput('');
            id.current++;
          }}
        >
          新增
        </button>
        {todo
          .filter((todo) => {
            return filter === 'all'
              ? todo
              : filter === 'done'
              ? todo.isDone
              : !todo.isDone;
          })
          .map((todo) => {
            return <TodoItem todo={todo} key={todo.id} />;
          })}
      </div>
      <Button
        onClick={() => {
          dispatch(deleteAll());
        }}
      >
        清空
      </Button>
      <Button
        onClick={() => {
          dispatch(all());
        }}
      >
        全部
      </Button>
      <Button
        onClick={() => {
          dispatch(done());
        }}
      >
        已完成
      </Button>
      <Button
        onClick={() => {
          dispatch(pending());
        }}
      >
        未完成
      </Button>
    </>
  );
}

export default App;
