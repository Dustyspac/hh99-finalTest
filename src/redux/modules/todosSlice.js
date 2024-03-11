import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (todoData, { rejectWithValue }) => {
    try {
      await waitTwoSeconds();
      return todoData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (todoId, { rejectWithValue }) => {
    try {
      await waitTwoSeconds();
      return todoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter(todo => todo.id !== action.payload);
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
