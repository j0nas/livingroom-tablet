import React, {Component} from 'react';
import firebase from 'firebase';
import "./style.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        };

        this.pushToFirebase = this.pushToFirebase.bind(this);
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

    componentDidMount() {
        const firebase = require('firebase');
        const config = {
            apiKey: "AIzaSyBeXvLz0iuYBk2Nm3pgV2XzADh6w6ioUlE",
            authDomain: "livingroom-tablet.firebaseapp.com",
            databaseURL: "https://livingroom-tablet.firebaseio.com",
            storageBucket: "livingroom-tablet.appspot.com",
        };
        firebase.initializeApp(config);

        const msgRef = firebase.database().ref('message');
        const thisRef = this;

        msgRef.on('value', function (snapshot) {
            const messageKeys = Object.keys(snapshot.val());
            const messageStrings = messageKeys.map(key => snapshot.val()[key].message);

            thisRef.setState({
                messages: messageStrings
            }, () => {
                const messagesDiv = document.getElementById("messagesDiv");
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                console.log("received message");
            });
        });
    }

    render() {
        return (
            <div className="App">
                <iframe id="calendar"
                    src="https://calendar.google.com/calendar/embed?mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=supershadypeople%40gmail.com&amp;color=%231B887A&amp;ctz=Europe%2FOslo"
                    frameborder="0" scrolling="no"></iframe>

                <div id="messagesDiv">
                    <div id="messages">
                        {this.state.messages.map(msg => <div className="message" key={msg + Math.random()}>{msg}</div>)}
                    </div>
                    <div className="controls">
                        <input onKeyDown={this.pushToFirebase} type="text" id="baseinput"
                               placeholder="Type a message..."/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
