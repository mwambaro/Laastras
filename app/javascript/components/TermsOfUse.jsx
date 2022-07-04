import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class TermsOfUse extends React.Component
{
    constructor(props)
    {
        super(props);
        this.termsOfUseSectionModal = null;

    } // constructor

    render()
    {
        return(
            <div>
                <div id="terms-of-use-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true"
                     onBlur={(se) => this.onFocusOutHandler(se)}>
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

    } // render

    componentDidMount()
    {
        $('#terms-of-use-body').append(this.props.terms_of_use_body_text);
        this.termsOfUseSectionModal = new Modal(
            document.getElementById('terms-of-use-section')
        );
        this.termsOfUseSectionModal.show();

    } // componentDidMount

    leaveTermsOfUse(e)
    {
        this.termsOfUseSectionModal.hide();
        // go back
        window.location.assign('/laastras/home#laastras-home-footer');

    } // leaveTermsOfUse

    onFocusOutHandler(e)
    {
        window.location.assign('/laastras/home#laastras-home-footer');

    } // onFocusOutHandler
}

TermsOfUse.propTypes = {
    terms_of_use_body_text: PropTypes.string
};

export default TermsOfUse