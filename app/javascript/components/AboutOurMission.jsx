import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class AboutOurMission extends React.Component
{
    constructor(props)
    {
        super(props);
        this.aboutOurMissionSectionModal = null;

    } // constructor

    render()
    {
        return(
            <div>
                <div id="about-our-mission-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true"
                     onBlur={(se) => this.onFocusOutHandler(se)}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-right">
                                <button type="button" className="close" aria-label="Close"
                                        onClick={(se) => this.leaveAboutOurMission(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="about-our-mission-body">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.leaveAboutOurMission(se)}>
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
        $('#about-our-mission-body').append(this.props.about_our_mission_body_text);
        this.aboutOurMissionSectionModal = new Modal(
            document.getElementById('about-our-mission-section')
        );
        this.aboutOurMissionSectionModal.show();

        window.addEventListener('click', (event) => {
            let object = event.target;
            let id = 'about-our-mission-section';
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

    leaveAboutOurMission(e)
    {
        this.aboutOurMissionSectionModal.hide();
        // go back
        window.location.assign('/laastras/home');

    } // leaveAboutOurMission

    onFocusOutHandler(e)
    {
        window.location.assign('/laastras/home');

    } // onFocusOutHandler
}

AboutOurMission.propTypes = {
    about_our_mission_body_text: PropTypes.string
};

export default AboutOurMission