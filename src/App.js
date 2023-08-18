import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodosAsync, addTodoAsync, removeTodoAsync } from "./features/todoSlice";
import TodoItem from "./components/TodoItem";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const status = useSelector((state) => state.todo.status);
  const error = useSelector((state) => state.todo.error);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      dispatch(addTodoAsync(input));
      setInput("");
    }
  };

  const handleTodoDone = (id) => {
    dispatch(removeTodoAsync(id));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Список заміток</h1>
      <form className="App-form" onSubmit={handleAddTodo}>
        <MyInput type="text" value={input} onInput={(e) => setInput(e.target.value)} />
        <MyButton type="submit">Додати</MyButton>
      </form>
      <div className="Todos">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            id={todo.id}
            onCheck={handleTodoDone}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
