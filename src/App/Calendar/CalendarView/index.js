import React from "react";
import shortid from "shortid";
import {prefixWithZeroIfSingleDigit as fixPrefix} from "../../util/CalendarFormat";
import "./style.css";

const CalendarView = ({events}) => (
    <table id="calendar">
        <tbody id="calendarContain">
        {events.map(event => {
            const date = new Date(event.start.dateTime || event.start.date);
            const today = new Date();
            const time = event.start.dateTime ? ' ' + fixPrefix(date.getHours()) + ':' + fixPrefix(date.getMinutes()) : '';

            const eventOccursThisMonthAndYear = (today.getMonth() + today.getFullYear()) - (date.getMonth() + date.getFullYear()) === 0;
            const todayOrTomorrow = date.getDate() - today.getDate();
            const isItToday = eventOccursThisMonthAndYear && todayOrTomorrow === 0;

            let dateString = fixPrefix(date.getDate()) + '.' + fixPrefix(date.getMonth() + 1);
            if (eventOccursThisMonthAndYear)
                switch (todayOrTomorrow) {
                    case 0:
                        dateString = "Today";
                        break;
                    case 1:
                        dateString = "Tomorrow";
                        break;
                    default:
                        break;
                }

            return (
                <tr key={shortid.generate()} className={isItToday ? "calendarEventToday" : ""}>
                    <td className="calendarDate">{dateString}</td>
                    <td className="calendarTime">{time}</td>
                    <td className="calendarSummary">{event.summary}</td>
                </tr>
            );
        })}
        </tbody>
    </table>
);

export default CalendarView;