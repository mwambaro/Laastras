import React from "react"
import PropTypes from "prop-types"

class AboutOurMission extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                <div id="about-our-mission-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
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
    }

    componentDidMount()
    {
        $('#about-our-mission-body').append(this.props.about_our_mission_body_text);
        $('#about-our-mission-section').modal('show');
    }

    leaveAboutOurMission(e)
    {
        $('#about-our-mission-section').modal('hide');
        // go back
        window.location.assign('/laastras/home');
    }
}

AboutOurMission.propTypes = {
    about_our_mission_body_text: PropTypes.string
};

export default AboutOurMission