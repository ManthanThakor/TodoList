import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  const handleEdit = () => {
    // Add edit logic here
  };

  const handleAdd = () => {
    settodos([...todos, { todo, isComplete: false }]);
    settodo("");
    console.log(todos);
  };

  const handledelete = () => {
    // Add delete logic here
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="rounded-xl bg-violet-100 min-h-[80vh] p-5 mx-16 my-5">
          <div className="addTodo my-5">
            <h2 className="text-lg font-bold">Add a Todo</h2>
            <input onChange={handleChange} value={todo} type="text" className="w-1/2" />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
            >
              Add
            </button>
          </div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.map(item =>{

          return(  <div className="todo flex w-1/4 my-3 justify-between">
            <input type="checkbox" value={todo.isComplete} name="" id="" />
              <div className={item.isComplete ? "":"line-through"}>{item.todo}</div>
              <div className="buttons">
                <button
                  onClick={handleEdit}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={handledelete}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  Delete
                </button>
              </div>
            </div>
             ) })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
