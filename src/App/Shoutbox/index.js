import React, {Component} from "react";
import firebase from "firebase";
import MessagesList from "./MessageList";
import "./style.css";

class Shoutbox extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };

        this.pushToFirebase = this.pushToFirebase.bind(this);
    }

    componentDidMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBeXvLz0iuYBk2Nm3pgV2XzADh6w6ioUlE",
            authDomain: "livingroom-tablet.firebaseapp.com",
            databaseURL: "https://livingroom-tablet.firebaseio.com",
            storageBucket: "livingroom-tablet.appspot.com",
        });

        const msgRef = firebase.database().ref('message');
        msgRef.on('value', snapshot => {
            const messageKeys = Object.keys(snapshot.val());
            const messageStrings = messageKeys.map(key => snapshot.val()[key].message);

            this.setState({messages: messageStrings}, () => {
                const messagesDiv = document.getElementById("messagesDiv");
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
        });
    }

    pushToFirebase(e) {
        const KEY_ENTER = 13;
        if (e.keyCode !== KEY_ENTER) {
            return;
        }

        const baseInput = document.getElementById('baseinput');
        firebase.database().ref('message').push({message: baseInput.value});
        baseInput.value = "";
    }


    render() {
        return (
            <div id="messagesDiv">
                <MessagesList messages={this.state.messages} />
                <div className="controls">
                    <input onKeyDown={this.pushToFirebase} type="text" id="baseinput"
                           placeholder="Type a message..."/>
                </div>
            </div>
        );
    }
}

export default Shoutbox;