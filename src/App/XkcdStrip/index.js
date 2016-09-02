import React, {Component} from "react";
import fetchJsonp from "fetch-jsonp";
import "./style.css";

class XkcdComponent extends Component {
    constructor() {
        super();
        this.state = {
            imgUrl: ""
        };
    }

    componentDidMount() {
        fetchJsonp("https://dynamic.xkcd.com/api-0/jsonp/comic")
            .then(res => res.json())
            .then(data =>
                this.setState({
                    imgUrl: data.img.replace('http:', 'https:'),
                    imgTitle: data.alt,
                    imgAlt: data.title
                })
            );
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