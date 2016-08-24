import React, {Component} from "react";
import "./style.css";

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            display: "block"
        };

        this.refresh = this.refresh.bind(this);
//        setTimeout(this.refresh, 3000);
    }

    refresh() {
        const display = this.state.display === "none" ? "block" : "none";
        this.setState({display: display});
        setTimeout(this.refresh, 3000);
    }


    render() {
        return <div  style={{display: this.state.display}}>
            <iframe id="calendar"
                    src="https://calendar.google.com/calendar/embed?mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=supershadypeople%40gmail.com&amp;color=%231B887A&amp;ctz=Europe%2FOslo"
                    frameBorder="0" scrolling="no" />
        </div>;
    }
}

export default Calendar;