import React from "react";
import shortid from "shortid";
import "./style.css";

const TodoList = ({todos}) =>
    <div id="todos">
        {todos.map(todo => <div className="todo" key={shortid.generate()}>{todo}</div>)}
    </div>;

export default TodoList;