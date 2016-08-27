import React, {Component} from "react";
import Calendar from "./Calendar";
import Shoutbox from "./Shoutbox";
import "./style.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Calendar/>
                <Shoutbox/>
            </div>
        );
    }
}

export default App;
