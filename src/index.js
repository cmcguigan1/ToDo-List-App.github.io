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

const fixNumbers = (array) => {
    let tempId = 0;
    let tempArray = [];
    array.map((todo) => { tempArray.push({...todo, id: ++tempId}) });
    return tempArray; 
}


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
            let newNum = 1;
            if(state.length>0){
                const lastTodo = state[state.length - 1];
                newNum = lastTodo.id + 1; 
            }
            const newTodo = {
                id: newNum, 
                title: "ToDo " + newNum + " : ",
                complete: false,
                editMode: false,
                textValue: "Click here to edit",
            }
            let newState = [...state,newTodo]
            newState = fixNumbers(newState);
            return newState;   
        case "EDIT":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, editMode: !todo.editMode};
                } else {
                    return todo;
            }
            });
        case "SAVE":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, textValue: action.textValue};
                } else {
                    return todo;
            }
            }); 
        case "DELETE":
            let temp = [];
            let marker = 0;
            state.map((todo) => {
                if (todo.id === action.id) {
                    return;
                }
                else{
                    let tempVal = ++marker;
                    temp.push({...todo, id: tempVal, title: "ToDo " + tempVal + " : "});
                }    
            });
            temp = fixNumbers(temp);
            return temp;       
        default:
            return state;  
    }
};


function Todo(){
const [todos, dispatch] = useReducer(reducer, initial);

const handleCompleted = (todo) => { dispatch({ type: "COMPLETE", id: todo.id }); };
const handleAdd = () => { dispatch({ type: "ADD"}); };
const handleEdit = (todo) => { dispatch( { type: "EDIT", id: todo.id})};
const handleSave = (todo,text) => { dispatch( { type: "SAVE", id: todo.id, textValue: text})};
const handleDelete = (todo) => { dispatch( {type: "DELETE", id: todo.id })};

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
                        hidden= {!todo.editMode}
                        value= {todo.textValue}
                        onChange={(e) => handleSave(todo,e.target.value)}
                    />
                    <button hidden={!todo.editMode} onClick={() => handleEdit(todo)}>Save</button>
                {!todo.editMode ? todo.textValue : ""}
                </label>
            </label>
            <button className="delete" key={"btn" + todo.id} onClick={() => handleDelete(todo)}>x</button>
            </div>
        ))}
        </div>
        <button id="add" onClick={handleAdd}>+</button>
        </div>
    </>
);
}

ReactDOM.render(<Todo />, document.getElementById("root"));
  
