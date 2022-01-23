import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState, useReducer, useRef } from 'react';
import './index.css' ;

const initial = [
    {
      id: 1,
      title: "ToDo 1 : ",
      complete: false,
      editMode: false,
      textValue: "Click here to edit",
    },
    {
      id: 2,
      title: "ToDo 2 : ",
      complete: false,
      editMode: false,
      textValue: "Click here to edit",
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
                title: "ToDo " + newNum + " : ",
                complete: false,
                editMode: false,
                textValue: "Click here to edit",
            }
            //console.log(...state,newTodo);
            const newState = [...state,newTodo]
            return newState;   
        case "EDIT":
            //console.log(action.id);
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, editMode: !todo.editMode};
                } else {
                    return todo;
            }
            });
        case "SAVE":
            //console.log(action.id);
            //console.log(action.textValue);
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, textValue: action.textValue};
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
const [inputValue, setInputValue] = useState("Click here to edit");

const handleCompleted = (todo) => { dispatch({ type: "COMPLETE", id: todo.id }); };
const handleAdd = () => { dispatch({ type: "ADD"}); };
const handleEdit = (todo) => { dispatch( { type: "EDIT", id: todo.id})};
const handleSave = (todo,text) => { dispatch( { type: "SAVE", id: todo.id, textValue: text})};

return(
    <>
        <h1>Claire's ToDo List</h1>
        <div id="todoList" >
        <div id="values" >
        {todos.map((todo) => (
            <div key={todo.id}>
            <label onDoubleClick={() => handleEdit(todo)}>
                <label>
                    <input
                        type="checkbox"
                        checked={todo.complete}
                        onChange={() => handleCompleted(todo)}
                    />
                {todo.title}
                </label>
                <label >
                    <input id="editBox"
                        type= "text"
                        //value = {inputValue}
                        hidden= {!todo.editMode}
                        //onChange={(e) => setInputValue(e.target.value)}
                        value= {todo.textValue}
                        onChange={(e) => handleSave(todo,e.target.value)}
                    />
                    <button hidden={!todo.editMode} onClick={() => handleEdit(todo)}>Save</button>
                {!todo.editMode ? todo.textValue : ""}
                </label>
            </label>
            </div>
        ))}
        </div>
        <button id="add" onClick={handleAdd}>+</button>
        </div>
    </>
);
}

ReactDOM.render(<Todo />, document.getElementById("root"));
  
