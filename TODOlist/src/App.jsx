import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);



  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos =JSON.parse(localStorage.getItem("todos"));
      settodos(todos);

    }
  }, [])
  
const  savetols = (params) => {
  localStorage.setItem("todos", JSON.stringify())
}


  const handleEdit = (e, id) => {
let t = todos.filter(i=>i.id === id)
settodo(t[0].todo);
let newTodos = todos.filter(item =>{
  return item.id !== id;
});
settodos(newTodos);
savetols()
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isComplete: false }]);
    settodo("");
    console.log(todos);

    savetols()
  };

  const handleDelete = (id) => {
let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    savetols()
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    console.log(index);
    let newtodos = [...todos];
    newtodos[index].isComplete = !newtodos[index].isComplete;
    settodos(newtodos);
    savetols()
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
              Save

            </button>
          </div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length == 0 && <div className="m-5">No Todo display</div>}
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
                  <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>

                  </div>
                  <div className="buttons">
                    <button onClick={(e) =>handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1" >
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
