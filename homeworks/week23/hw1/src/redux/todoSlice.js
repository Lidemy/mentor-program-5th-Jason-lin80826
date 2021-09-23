import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload);
    },
    completeUpdate: (state, action) => {
      console.log(action.payload);
      state.value.forEach((item) => {
        if (item.id === action.payload.id) {
          item.content = action.payload.newContent;
          item.isUpdate = !item.isUpdate;
        }
      });
    },
    updateTodo: (state, action) => {
      state.value.forEach((item) => {
        if (item.id === action.payload) {
          item.isUpdate = !item.isUpdate;
        }
      });
    },
    status: (state, action) => {
      state.value.forEach((item) => {
        if (item.id === action.payload) {
          item.isDone = !item.isDone;
        }
      });
    },
    deleteTodo: (state, action) => {
      state.value.splice(
        state.value.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteAll: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  updateTodo,
  deleteTodo,
  status,
  deleteAll,
  completeUpdate,
} = todoSlice.actions;

export default todoSlice.reducer;
