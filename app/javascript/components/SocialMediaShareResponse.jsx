import React from "react"
import PropTypes from "prop-types"
require("./CenterElement");

class SocialMediaShareResponse extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        let div_style = {
            backgroundColor: 'white'
        };

        return(
            <div id="social-media-share-response-main-div" style={div_style}></div>
        );

    } // render

    componentDidMount()
    {
        this.appendResponseHtml();

    } // componentDidMount

    appendResponseHtml()
    {
        let html = null;

        if(this.props.status === 'success') // success
        {
            html = `
                <div class="row" style="background-color: white; padding: 10px" id="verbose-message-div">
                    <div class="col-sm-1 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                    </div>
                    <div class="col-sm-11"> <p> ${this.props.log_message} </p> </div>
                </div>
                <div> <a href="${this.props.back_url}"> ${this.props.back_label} </a> </div>`;
        }
        else // failure
        {
            html = `
                <div class="row" id="verbose-message-div">
                    <div class="col-sm-1 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    <div class="col-sm-11"> <p> ${this.props.log_message} </p> </div>
                </div>
                <div> <a href="${this.props.back_url}"> ${this.props.back_label} </a> </div>`;
        }

        if(html)
        {
            $('#social-media-share-response-main-div').append(html);
        }

    } // appendResponseHtml
}

SocialMediaShareResponse.propTypes = {
    status: PropTypes.string,
    back_url: PropTypes.string,
    log_message: PropTypes.string,
    back_label: PropTypes.string
}

export default SocialMediaShareResponse