import React, { Component } from 'react';

import firebase from 'firebase';

class App extends Component {
	pushToFirebase() {
		const baseInput = document.getElementById('baseinput');
		firebase.database().ref('message').push({message: baseInput.value});
		baseinput.value = "";
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
	}

	render() {
		return (
			<div className="App">
			<input type="text" id="baseinput"></input>

			<button onClick={this.pushToFirebase}>PUSH</button>
			</div>
			);
	}
}

export default App;
