import React, {Component} from "react";
import CalendarView from "./CalendarView";

import "./google-api-client";
import "./style.css";

/* global gapi */
class Calendar extends Component {

    constructor() {
        super();
        this.state = {
            authorized: false,
            events: []
        };

        this.refresh = this.refresh.bind(this);
        this.REFRESH_EVERY = 1000 * 60 * 30;
        setTimeout(this.refresh, this.REFRESH_EVERY);

        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.handleAuthClick = this.handleAuthClick.bind(this);
        this.handleAuthResult = this.handleAuthResult.bind(this);
        this.checkAuth = this.checkAuth.bind(this);

        this.CLIENT_ID = '110694361053-v51kj7qvl1ena7smbngnocskpms10edo.apps.googleusercontent.com';
        this.SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
    }

    componentDidMount() {
        if (!this.state.authorized) {
            gapi.load("auth", () => gapi.auth.init(() => this.checkAuth(true)));
        }
    }

    checkAuth(immediate) {
        gapi.auth.authorize({
            'client_id': this.CLIENT_ID,
            'scope': this.SCOPES.join(' '),
            'immediate': immediate
        }, this.handleAuthResult);
    }

    handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            this.setState({authorized: true}, () =>
                gapi.load("client", () =>
                    gapi.client.load('calendar', 'v3', this.listUpcomingEvents)));
        }
    }

    handleAuthClick() {
        this.checkAuth(false);
        return false;
    }

    listUpcomingEvents() {
        const request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'singleEvents': true,
            'orderBy': 'startTime'
        });

        request.execute(resp => this.setState({events: resp.items}));
    }

    refresh() {
        const calendarContainer = document.getElementById('calendarContainer');
        const calendar = calendarContainer.childNodes[1];

        calendarContainer.removeChild(calendar);
        this.forceUpdate();
        calendarContainer.appendChild(calendar);
        this.forceUpdate();
        setTimeout(this.refresh, this.REFRESH_EVERY);
    }

    render() {
        return (
            <div id="calendarContainer">
                <div id="authorize-div" style={{display: this.state.authorized ? "none" : "block"}}>
                    <span>Authorize access to Google Calendar API </span>
                    <button id="authorize-button" onClick={this.handleAuthClick}>Authorize</button>
                </div>
                <CalendarView events={this.state.events} />
            </div>
        );
    }
}

export default Calendar;