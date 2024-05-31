import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);
  
  const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isComplete: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocalStorage(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="rounded-xl bg-violet-100 min-h-[80vh] p-5 mx-16 my-5">
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold">Add a Todo</h2>
            <input onChange={handleChange} value={todo} type="text" className="w-1/2" />
            <button onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
            >
              Save
            </button>
          </div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="m-5">No Todo display</div>}
            {todos.map(item => {
              return (
                <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isComplete}
                      name={item.id}
                      id={item.id}
                    />
                    <div className={item.isComplete ? "line-through break-words w-80" : " break-words w-80"}>{item.todo}</div>
                  </div>
                  <div className="buttons flex h-full">
                    <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1" >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
