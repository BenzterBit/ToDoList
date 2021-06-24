import React, {useState,useEffect} from 'react';
import './App.css';
import Form from './Components/Form';
import ToDoList from './Components/ToDoList';
import Particles from 'react-particles-js';


function App() {

  const particleStyle = {
  particles: {
                number:{
                  value:30, 
                  density:{
                    enable:true,
                    value_area:800

                  }
                }   
    }
  }
  

  const [inputText, setInputText] = useState('');
  const [todos, setTodos]= useState([]);
  const [status,setStatus]=useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(()=>{
    getLocalTodos();
  },[]);
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status]);

  const filterHandler =() =>{
    switch(status){
      case 'completed':
      setFilteredTodos(todos.filter(todo =>  todo.completed === true))
      break;
      case 'Pending':
      setFilteredTodos(todos.filter(todo =>  todo.completed === false))
      break;
      default:
      setFilteredTodos(todos);
      break;
    }

  }

  const saveLocalTodos = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const getLocalTodos =()=>{
    if(localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
  }
  }

  return (
    <div className="App">
    <Particles className="particles" params= {particleStyle}/>
      <header>
        <h1 >Bit's Todo List</h1>
      </header>
      <Form setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
      <ToDoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}/>
    </div>  
  );
}

export default App;
