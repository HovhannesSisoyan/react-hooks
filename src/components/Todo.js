import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Todo = (props) => {

    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    //const [todoState, setTodoState] = useState({ userInput: '', todoList: [] })



    useEffect(() => {
        axios.get('https://hook-286c8.firebaseio.com/todos.json')
        .then((res) => {
            console.log(res);
            const todoData = res.data;
                const todos = [];
                for (let key in todoData) {
                    todos.push({id: key, name: todoData[key].name})
                }
                
                setTodoList(todos);
        })
        .catch((err) => {
            console.log(err);
        })
    })

    const inputChangeHandler = (event) => {
        //setTodoState({ userInput: event.target.value, todoList: todoState.todoList });
        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        //setTodoState({ userInput: todoState.userInput, todoList: todoState.todoList.concat(todoState.userInput) });
        setTodoList(todoList.concat(todoName));
        axios.post('https://hook-286c8.firebaseio.com/todos.json',{ name: todoName })
            .then((res => {
                console.log(res);
                

            }))
            .catch(err => {
                console.log(err);
            });
    }

    return <>
                <input
                    type="text"
                    placeholder="Todo"
                    onChange={inputChangeHandler}
                    value={todoName}
                />
                <button type="button" onClick={todoAddHandler}>Add</button>
                <ul>
                    {todoList.map((todo) => (
                        <li key={todo.id}>{todo.name}</li>
                    ))}
                </ul>
           </>    
}

export default Todo;