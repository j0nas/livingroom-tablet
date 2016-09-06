import React, {Component} from "react";
import Calendar from "./Calendar";
import XkcdStrip from "./XkcdStrip";
import Todos from "./Todos";

class App extends Component {
    constructor() {
        super();
        this.HARD_REFRESH_EVERY = 1000 * 60 * 29;
    }

    componentDidMount() {
        setTimeout(() => location.reload(), this.HARD_REFRESH_EVERY)
    }

    render() {
        return (
            <div className="App">
                <Todos/>
                <Calendar/>
                <XkcdStrip/>
            </div>
        );
    }
}
export default App;
