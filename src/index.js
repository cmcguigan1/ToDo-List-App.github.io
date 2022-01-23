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
      title: "Todo 1 : ",
      complete: false,
      editMode: false,
    },
    {
      id: 2,
      title: "Todo 2 : ",
      complete: false,
      editMode: false,
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
                title: "Todo " + newNum + " : ",
                complete: false,
                editMode: false,
            }
            //console.log(...state,newTodo);
            const newState = [...state,newTodo]
            return newState;   
        case "EDIT":
            console.log(action.id);
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, editMode: !todo.editMode };
                } else {
                    return todo;
            }
            });
        case "SAVE":
            console.log(action.id);
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, hidden: true };
                } else {
                    return todo;
            }
            });    
        default:
            return state;  
    }
};


function Todo(){
const [todos, dispatch] = useReducer(reducer, initial);

const handleCompleted = (todo) => { dispatch({ type: "COMPLETE", id: todo.id }); };
const handleAdd = () => { dispatch({ type: "ADD"}); };
const handleEdit = (todo) => { dispatch( { type: "EDIT", id: todo.id})};
const handleSave = (todo) => { dispatch( { type: "SAVE", id: todo.id})};

return(
    <>
        <h1>Claire's ToDo List</h1>
        <div id="todoList" >
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
            <label onDoubleClick={() => handleEdit(todo)}>
                <input id="editBox"
                    type= "text"
                    hidden= {!todo.editMode}
                />
                <button hidden={true} onClick={() => handleSave(todo)}>Save</button>
            Click here to edit
            </label>
        </div>
        ))}
        <button id="add" onClick={handleAdd}>+</button>
        </div>
    </>
);
}

ReactDOM.render(<Todo />, document.getElementById("root"));
  
