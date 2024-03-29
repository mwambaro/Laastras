import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class PrivacyPolicy extends React.Component
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
                            <div style={{padding: '10px'}} id="privacy-policy-body">
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{zIndex: '99'}}>  
                    <button id="back_btn" 
                            title="Go Back"
                            onClick={(se) => this.leavePrivacyPolicy(se)}
                            style={{
                                display: 'block', 
                                position: 'fixed', 
                                bottom: '20px', 
                                right: '20px', 
                                zIndex: '99', 
                                border: 'none', 
                                outline: 'none', 
                                backgroundColor: 'grey', 
                                color: 'white', 
                                cursor: 'pointer', 
                                padding: '15px', 
                                borderRadius: '10px', 
                                fontSize: '18px'
                            }}>
                        {this.props.go_back_label}
                    </button>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        $('#privacy-policy-body').append(this.props.privacy_policy_body_text);

    } // componentDidMount

    leavePrivacyPolicy(e)
    {
        window.location.assign(this.props.go_back_url);

    } // leavePrivacyPolicy
}

PrivacyPolicy.propTypes = {
    privacy_policy_body_text: PropTypes.string,
    go_back_url: PropTypes.string,
    go_back_label: PropTypes.string
};

export default PrivacyPolicy