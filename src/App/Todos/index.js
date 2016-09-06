import React, {Component} from "react";
import firebase from "firebase";
import TodosList from "./TodosList";
import "../Shoutbox/style.css";
import "./style.css";

class Todos extends Component {
    constructor() {
        super();
        this.state = {
            todos: []
        };

        //this.pushToFirebase = this.pushToFirebase.bind(this);
    }

    componentDidMount() {
        try {
            firebase.initializeApp({
                apiKey: "AIzaSyBeXvLz0iuYBk2Nm3pgV2XzADh6w6ioUlE",
                authDomain: "livingroom-tablet.firebaseapp.com",
                databaseURL: "https://livingroom-tablet.firebaseio.com",
                storageBucket: "livingroom-tablet.appspot.com",
            });
        } catch (e) {
        }

        const todoRef = firebase.database().ref('todos');
        todoRef.on('value', snapshot => {
            const todoKeys = Object.keys(snapshot.val());
            const todoStrings = todoKeys.map(key => snapshot.val()[key].todo);

            this.setState({todos: todoStrings});
        });
    }

    pushToFirebase(e) {
        const KEY_ENTER = 13;
        if (e.keyCode !== KEY_ENTER) {
            return;
        }

        const todoInput = document.getElementById('todoInput');
        firebase.database().ref('todos').push({todo: todoInput.value});
        todoInput.value = "";
    }

    render() {
        return (
            <div className="messagesDiv">
                <TodosList todos={this.state.todos}/>
                <div className="controls">
                    <input onKeyDown={this.pushToFirebase}
                           type="text"
                           id="todoInput"
                           className="baseinput"
                           placeholder="New To-Do ..."/>
                </div>
            </div>
        );
    }
}

export default Todos;