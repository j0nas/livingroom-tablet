import React, {Component} from "react";

import "./style.css";

class XkcdComponent extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl: ""
        };
    }

    componentDidMount() {
        const $ = require('jquery');
        $.ajax({
            url: "https://dynamic.xkcd.com/api-0/jsonp/comic?callback=?",
            dataType: "json",
            jsonpCallback: "xkcddata",
            success: data =>
                this.setState({
                    imgUrl: data.img,
                    imgTitle: data.alt,
                    imgAlt: data.title
                })
        });
    }

    render() {
        return (
            <div id="xkcd-img-container">
                <img src={this.state.imgUrl} title={this.state.imgTitle} alt={this.state.imgAlt} id="xkcd-image"/>
            </div>
        );
    }
}

export default XkcdComponent;