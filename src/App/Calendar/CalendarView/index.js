import React from "react";
import shortid from "shortid";
import {prefixWithZeroIfSingleDigit as fixPrefix} from "../../util/CalendarFormat";
import "./style.css";

const CalendarView = ({events}) => (
    <table id="calendar">
        <tbody id="calendarContain">
        {events.map(event => {
            const date = new Date(event.start.dateTime || event.start.date);
            const time = date.getHours() ? ' ' + fixPrefix(date.getHours()) + ':' + fixPrefix(date.getMinutes()) : '';
            const dateString = fixPrefix(date.getDate()) + '.' + fixPrefix(date.getMonth() + 1) + time;
            return (
                <tr key={shortid.generate()}>
                    <td className="calendarDate">{dateString}</td>
                    <td className="calendarSummary">{event.summary}</td>
                </tr>
            );
        })}
        </tbody>
    </table>
);

export default CalendarView;