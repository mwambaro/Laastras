import React from "react"
import PropTypes from "prop-types"

class CookiesPolicy extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                <div id="cookies-policy-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-right">
                                <button type="button" className="close" aria-label="Close"
                                        onClick={(se) => this.leaveCookiesPolicy(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="cookies-policy-body">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.leaveCookiesPolicy(se)}>
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
        $('#cookies-policy-body').append(this.props.cookies_policy_body_text);
        $('#cookies-policy-section').modal('show');
    }

    leaveCookiesPolicy(e)
    {
        $('#cookies-policy-section').modal('hide');
        // go back
        window.location.assign('/laastras/home');
    }
}

CookiesPolicy.propTypes = {
    cookies_policy_body_text: PropTypes.string
};

export default CookiesPolicy