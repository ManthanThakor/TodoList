import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import "./Appdark.css";

import Navbar from './components/navbar';
import DarkMode from './components/darkmode'; // Import DarkMode component
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { IoIosSave } from 'react-icons/io';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [theme, setTheme] = useState('light'); // State for theme mode

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever todos change
    saveToLocalStorage(todos);
  }, [todos]);

  useEffect(() => {
    // Set theme class to body based on the current theme
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  const saveToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished((prevShowFinished) => !prevShowFinished);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isComplete: false }];
    setTodos(newTodos);
    setTodo('');
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} /> {/* Pass theme and setTheme as props */}
      <div className="container mx-auto p-6">
        <div className="bg-violet-100 rounded-xl min-h-[80vh] p-8 shadow-lg">
          <h1 className="font-bold text-center text-3xl mb-6">
            iTask - Manage Your Todos At One Place
          </h1>
          <div className="addTodo mb-6">
            <h2 className="text-2xl font-bold mb-4">Add a Todo</h2>
            <div className="flex">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                className="w-full p-3 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 "
                placeholder="Enter your todo"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length <= 3}
                className="bg-violet-800 hover:bg-violet-950 p-3 text-lg font-bold text-white rounded-md disabled:bg-violet-700 transition duration-300 ml-2 flex items-center"
              >
                <IoIosSave className="mr-1" /> Save
              </button>
            </div>
          </div>
          <label className="flex items-center mb-4">
            <input
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
              className="mr-2"
            />
            Show Finished
          </label>
          <h2 className="text-2xl font-bold mb-4">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5">No Todos to display</div>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isComplete) && (
                  <div
                    key={item.id}
                    className="todo flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-3 animate-fadeIn hover:shadow-lg transition duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isComplete}
                        name={item.id}
                        id={item.id}
                        className="w-6 h-6"
                      />
                      <div
                        className={`${
                          item.isComplete ? 'line-through text-gray-400' : ''
                        } break-words w-80`}
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex space-x-2">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-2 text-white rounded-md transition duration-300"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-800 p-2 text-white rounded-md transition duration-300"
                      >
                        <RiDeleteBin2Fill />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
