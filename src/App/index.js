import React, {Component} from "react";
import Calendar from "./Calendar";
import Shoutbox from "./Shoutbox";
import XkcdStrip from "./XkcdStrip";

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
                <Calendar/>
                <Shoutbox/>
                <XkcdStrip/>
            </div>
        );
    }
}
export default App;
