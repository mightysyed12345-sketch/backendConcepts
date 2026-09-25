
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './stylee.css';

export default function todolist()  {
    let [todos,setTodos]=useState([{task:"sample Task", id:uuidv4()}]);
    let [newTodo,setNewTodo]=useState("");
    let addNewTask=()=>{
        setTodos([...todos,{task:newTodo,id:uuidv4()}]);
        setNewTodo("");
    }
    let updateTodoValue=(event)=>  {
        setNewTodo(event.target.value);
    };
    let deleteTodo=(id)=>{
        setTodos((prevTodos)=>{
            return prevTodos.filter((todo)=>todo.id !== id);
        })
    }
    return(
        <div>
            <h4><b>Todo List</b></h4>
            <input placeholder="add a Task" value={newTodo} onChange={updateTodoValue}></input><br></br>
            <button onClick={addNewTask}>Add a Task</button>
            <br></br><br></br><br></br>

            <hr></hr>
            <h4>Tasks Todo</h4>
            <ul>
                {
                    todos.map((todo)=>(
                        <li key={todo.id}>
                            <span>{todo.task}</span>
                            &nbsp;&nbsp;&nbsp;

                            <button onClick={()=>deleteTodo(todo.id)}>delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

