import { useEffect, useState } from "react"
import "./styles.css"
import  NewTodoForm  from "./components/todoForm"
import TodoList from "./components/todoList"


export default function App() {
  const [todos, setTodos] = useState([])

  async function login() {  
    fetch("http://127.0.0.1:8000/v1/monitors/login",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: "test_35_@airs.macromill.com",
          password: "password"
      })
    }).then(async response => {
      const loginResponse = await response.json()
      localStorage.setItem("accessToken", loginResponse.data.accessToken);
      console.log("00000000000000000000000000000000000000",loginResponse.data.accessToken);
    }).catch(err => {
      console.log(err)
    });
  }

  async function listInterviews() {  
    fetch("http://10.10.17.86:8000/v1/monitors/campaigns?status=2",{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.stringify(localStorage.getItem("accessToken"))
      },
    }).then(async response => {
      const listResponse = await response.json()
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",localStorage.getItem("accessToken"));
      console.log(listResponse);
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(()=>{
     login()
     setTimeout(() => listInterviews(), 5000);
  },[])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10), title: title, completed: false}
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id!== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>
      <h1 className="header">TODO List</h1>
      <TodoList 
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  )
}




// VS Code Extensions
// ES7+ React/Redux/React-Native snippets
// Prettier
// VSCode React Refactor
// Simple React Snippets\
// Stylelint
// GitLens
