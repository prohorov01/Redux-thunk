// todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodo, createTodo, deleteTodo } from "../components/Api/Api";


export const fetchTodosAsync = createAsyncThunk("todo/fetchTodos", async () => {
  return await fetchTodo();
});

export const addTodoAsync = createAsyncThunk("todo/addTodo", async (text) => {
  return await createTodo(text);
});

export const removeTodoAsync = createAsyncThunk("todo/removeTodo", async (id) => {
  await deleteTodo(id);
  return id;
});

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
