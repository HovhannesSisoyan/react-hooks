import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';


const Todo = (props) => {

   // const [todoName, setTodoName] = useState('');
 //   const [submittedTodo, setSubmittedTodo] =useState(null);
    
//  const [todoList, setTodoList] = useState([]);
//const [todoState, setTodoState] = useState({ userInput: '', todoList: [] })
const todoInputRef = useRef();

const todoListReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return state.concat(action.payload);
        case 'SET':
            return action.payload;
        case 'REMOVE': 
            return state.filter((todo) => todo.id !== action.payload);
        default: 
            return state;
            }
        };

        const [todoList, dispatch] = useReducer(todoListReducer, []);


        useEffect(() => {
        axios.get('https://hook-286c8.firebaseio.com/todos.json')
        .then((res) => {
            console.log(res);
            const todoData = res.data;
                const todos = [];
                for (let key in todoData) {
                    todos.push({id: key, name: todoData[key].name})
                }
                
                dispatch({type: 'SET', payload: todos});
        });
       
        return () => {
            console.log('Cleanup')
        }
    }, [])
/*
    useEffect(() => {
        if(submittedTodo) {
        dispatch({type: 'ADD', payload: submittedTodo});
        }
    },[submittedTodo]);
*/

   // const inputChangeHandler = (event) => {
        //setTodoState({ userInput: event.target.value, todoList: todoState.todoList });
     //   setTodoName(event.target.value);
    //};

    const todoAddHandler = () => {
        //setTodoState({ userInput: todoState.userInput, todoList: todoState.todoList.concat(todoState.userInput) });
        const todoName = todoInputRef.current.value
        
        axios.post('https://hook-286c8.firebaseio.com/todos.json',{ name: todoName })
            .then((res => {
                setTimeout(() => {
                    const todoItem = {id: res.data.name, name: todoName};
                    dispatch({type: 'ADD', payload: todoItem})
                } ,3000)
                
                console.log(res);
            }))
            .catch(err => {
                console.log(err);
            });
    };

    const todoRemoveHandler = todoId => {
        axios.delete(`https://hook-286c8.firebaseio.com/todos/${todoId}.json`)
        .then( res =>
            dispatch({type: 'REMOVE', payload: todoId})
        )
        .catch(err => console.log(err));
        
    }


    return <>
                <input
                    type="text"
                    placeholder="Todo"
                    ref={todoInputRef}
                />
                <button type="button" onClick={todoAddHandler}>Add</button>
                <ul>
                    {todoList.map(todo => (
                        <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>
                    ))}
                </ul>
           </>    
}

export default Todo;

