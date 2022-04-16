import React from "react"
import PropTypes from "prop-types"

class TermsOfUse extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                <div id="terms-of-use-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-right">
                                <button type="button" className="close" aria-label="Close"
                                        onClick={(se) => this.leaveTermsOfUse(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="terms-of-use-body">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.leaveTermsOfUse(se)}>
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
        $('#terms-of-use-body').append(this.props.terms_of_use_body_text);
        $('#terms-of-use-section').modal('show');
    }

    leaveTermsOfUse(e)
    {
        $('#terms-of-use-section').modal('hide');
        // go back
        window.location.assign('/laastras/home');
    }
}

TermsOfUse.propTypes = {
    terms_of_use_body_text: PropTypes.string
};

export default TermsOfUse