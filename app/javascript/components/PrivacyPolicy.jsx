import React from "react"
import PropTypes from "prop-types"

class PrivacyPolicy extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                <div id="privacy-policy-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-right">
                                <button type="button" className="close" aria-label="Close"
                                        onClick={(se) => this.leavePrivacyPolicy(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="privacy-policy-body">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.leavePrivacyPolicy(se)}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        $('#privacy-policy-body').append(this.props.privacy_policy_body_text);
        $('#privacy-policy-section').modal('show');
    }

    leavePrivacyPolicy(e)
    {
        $('#privacy-policy-section').modal('hide');
        // go back
        window.location.assign('/laastras/home');
    }
}

PrivacyPolicy.propTypes = {
    privacy_policy_body_text: PropTypes.string
};

export default PrivacyPolicy