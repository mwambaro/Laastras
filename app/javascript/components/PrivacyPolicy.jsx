import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class PrivacyPolicy extends React.Component
{
    constructor(props)
    {
        super(props);
        this.privacyPolicySectionModal = null;

    } // constructor

    render()
    {
        return(
            <div>
                <div id="privacy-policy-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true"
                     onBlur={(se) => this.onFocusOutHandler(se)}>
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

    } // render

    componentDidMount()
    {
        $('#privacy-policy-body').append(this.props.privacy_policy_body_text);
        this.privacyPolicySectionModal = new Modal(
            document.getElementById('privacy-policy-section')
        );
        this.privacyPolicySectionModal.show();

        window.addEventListener('click', (event) => {
            let object = event.target;
            let id = 'privacy-policy-section';
            if(event)
            {
                if(object.id != id)
                {
                    let parent = object.parentElement;
                    let isChild = false;
                    while(parent)
                    {
                        if(parent.id === id)
                        {
                            isChild = true;
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    if(!isChild)
                    { 
                        this.onFocusOutHandler(event);
                    }
                }
            }
        });

    } // componentDidMount

    leavePrivacyPolicy(e)
    {
        this.privacyPolicySectionModal.hide();
        // go back
        window.location.assign('/laastras/home');

    } // leavePrivacyPolicy

    onFocusOutHandler(e)
    {
        window.location.assign('/laastras/home');

    } // onFocusOutHandler
}

PrivacyPolicy.propTypes = {
    privacy_policy_body_text: PropTypes.string
};

export default PrivacyPolicy