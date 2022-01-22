import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState, useReducer } from 'react';
import './index.css' ;

/*function List() {

    return (
        <>
        <h1>Claire's ToDo List</h1>
        <ul>
            <li key="one">Todo 1:</li>
        </ul>
        <button onClick={() => Add()}>+</button>
        </>
    )
}

function Add(){
    const [counter, setCounter] = useState(1);
    const [todo, setTodo] = useState("");

    //useEffect( () => { todo = [...todo, todo], [todo]);

    return (
        <li key={counter}>Todo {counter}:</li>
    );
}*/
const initial = [
    {
      id: 1,
      title: "Todo 1",
      complete: false,
    },
    {
      id: 2,
      title: "Todo 2",
      complete: false,
    },
];

const reducer = (state, action) => {
    switch (action.type) {
        case "COMPLETE":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, complete: !todo.complete };
                } else {
                    return todo;
            }
        });
        case "ADD":
            //console.log(state);
            const lastTodo = state[state.length - 1];
            const newNum = lastTodo.id + 1; 
            const newTodo = {
                id: newNum, 
                title: "Todo " + newNum,
                complete: false
            }
            //console.log(...state,newTodo);
            const newState = [...state,newTodo]
            return newState;   

        default:
            return state;  
    }
};


function Todo(){
const [todos, dispatch] = useReducer(reducer, initial);

const handleCompleted = (todo) => { dispatch({ type: "COMPLETE", id: todo.id }); };
const handleAdd = () => { dispatch({ type: "ADD"}); };

return(
    <>
        <h1>Claire's ToDo List</h1>
        {todos.map((todo) => (
            <div key={todo.id}>
            <label>
                <input
                    type="checkbox"
                    checked={todo.complete}
                    onChange={() => handleCompleted(todo)}
                />
            {todo.title}
          </label>
        </div>
        ))}
        <button id="add" onClick={handleAdd}>+</button>
    </>
);
}

ReactDOM.render(<Todo />, document.getElementById("root"));
  
