import React, {Component} from "react";
import "./style.css";

class Calendar extends Component {
    constructor() {
        super();

        this.refresh = this.refresh.bind(this);
        this.refreshComponentEvery = 1000 * 60 * 30;
        setTimeout(this.refresh, this.refreshComponentEvery);
    }

    refresh() {
        const calendarDiv = document.getElementById('calendarContainer');
        const iframe = calendarDiv.childNodes[0];

        calendarDiv.removeChild(iframe);
        this.forceUpdate();
        calendarDiv.appendChild(iframe);
        this.forceUpdate();
        setTimeout(this.refresh, this.refreshComponentEvery);
    }


    render() {
        return (
            <div id="calendarContainer">
                <iframe id="calendar"
                        src="https://calendar.google.com/calendar/embed?mode=WEEK&amp;height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;src=supershadypeople%40gmail.com&amp;color=%231B887A&amp;ctz=Europe%2FOslo"
                        frameBorder="0" scrolling="no"/>
            </div>
        );
    }
}

export default Calendar;