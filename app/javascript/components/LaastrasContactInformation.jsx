import React from "react"
import PropTypes from "prop-types"

class LaastrasContactInformation extends React.Component 
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}}>
                                {this.props.contact_information_title}
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id="contact-info-text">
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded">
                            <hr />
                            <div className="text-center" style={{padding: '10px'}} id="feedback-info-text">
                                <p style={{fontSize: '22px'}}>
                                    <a href={this.props.feedback.feedback_endpoint} style={{textDecoration: 'none'}}>
                                        {this.props.feedback.feedback_prompt}
                                    </a>
                                </p>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        $('#contact-info-text').append(
            this.props.contact_information_text
        );

    } // componentDidMount

}

LaastrasContactInformation.propTypes = {
    contact_information_title: PropTypes.string,
    contact_information_text: PropTypes.string,
    feedback: PropTypes.object
}

export default LaastrasContactInformation