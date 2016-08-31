import React from "react";
import shortid from "shortid";
import "./style.css";

const MessagesList = ({messages}) =>
    <div id="messages">
        {messages.map(msg => <div className="message" key={shortid.generate()}>{msg}</div>)}
    </div>;

export default MessagesList;