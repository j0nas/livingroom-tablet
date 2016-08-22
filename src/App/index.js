import React, { Component } from 'react';

import firebase from 'firebase';

class App extends Component {
	constructor() {
		super();
		this.state = {
			messages: []
		}
	}

	pushToFirebase() {
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

		msgRef.on('value', function(snapshot) {
			const messageKeys = Object.keys(snapshot.val());
			const messageStrings = messageKeys.map(key => snapshot.val()[key].message);
			console.log(messageStrings);

			thisRef.setState({
				messages: messageStrings
			});
		});
	}

	render() {
		return (
			<div className="App">
			<div id="messagesDiv">
				{this.state.messages.map(msg => <div key={msg + Math.random()}>{msg}</div>)}
			</div>
			<input type="text" id="baseinput"></input>

			<button onClick={this.pushToFirebase}>PUSH</button>
			</div>
			);
	}
}

export default App;
