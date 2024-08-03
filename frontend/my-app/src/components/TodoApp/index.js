import { useState } from 'react'
import "./index.css"
import TodoItem from "../TodoItem";
import { useEffect } from 'react'
import Header from '../Header';



const TodoApp = () => {
  const [todoList, setTodoList] = useState([])
  const [task, setTask] = useState('')
  const [status, setStatus] = useState(false)

  const jwtToken = localStorage.getItem('jwtToken');

  let getDetails = async () => {

    const apiUrl = 'http://localhost:3005/todos/'
    const options = {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      },
    }
    const res = await fetch(apiUrl, options)
    if (res.ok) {
      const data = await res.json()
      setTodoList(data)

    }
  }

  useEffect(() => {

    getDetails()

  })


  const addTodo = async (event) => {
    event.preventDefault();
    const newTodo = {
      description: task,
      status: status,
    };


    const apiUrl = 'http://localhost:3005/todos/';
    const options = {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo),
    };
    try {
      const res = await fetch(apiUrl, options);
      if (res.ok) { // Check for successful response

        getDetails()
        setStatus(false)
        setTask(''); // Clear the input field after success
        // Fetch and display existing tasks (implement this)
      } else {
        console.error('Error adding todo:', await res.text());
        // Handle errors (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      // Handle network errors
    }
  };
  const delFunc = async (idVal) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwtToken}`,
      }
    }
    const response = await fetch(`http://localhost:3005/todos/${idVal}`, options)
    const deltextData = await response.text()
    if (deltextData === 'deleted') {
      getDetails()
    }
  }
  const updateApi = async (id, updObj) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updObj)
    }
    const response = await fetch(`http://localhost:3005/todos/${id}`, options)
    const resUpd = await response.text()

    if (resUpd === 'updated') {
      getDetails()
    }

  }

  const createTodo = (event) => {
    setTask(event.target.value)
  }
  return (
    <div className='app'>
      <Header />
      <div className="app">

        <h1 className="todo-head">Todo List</h1>
        <form onSubmit={addTodo}>
          <div>
            <input className="input-box" type="text" onChange={createTodo} value={task} placeholder='Add A Task' />
            <button className="add-btn" type="submit">
              Add
            </button>
          </div>
        </form>
        <ul className="todo-list">
          {todoList.length > 0 ? (
            todoList.map(eachItem => <TodoItem key={eachItem.id} todoItem={eachItem} delFunc={delFunc} updateApi={updateApi} />)
          ) : (
            <p>No Todos Yet</p>
          )}
        </ul>

      </div>
    </div>

  );
};

export default TodoApp;