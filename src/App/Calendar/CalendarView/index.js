import React from "react";
import shortid from "shortid";
import {prefixWithZeroIfSingleDigit as fixPrefix} from "../../util/CalendarFormat";
import "./style.css";

const CalendarView = ({events}) => (
    <span id="calendar">
        <div id="calendarContain">
        {events.map((event, i) => {
            const date = new Date(event.start.dateTime || event.start.date);
            const time = date.getHours() ? ' ' + fixPrefix(date.getHours()) + ':' + fixPrefix(date.getMinutes()) : '';
            const dateString = fixPrefix(date.getDate()) + '.' + fixPrefix(date.getMonth() + 1) + time;
            return <div key={shortid.generate()}>{dateString + ' - ' + event.summary}</div>;
        })}
        </div>
    </span>
);

export default CalendarView;