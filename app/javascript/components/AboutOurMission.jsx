import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class AboutOurMission extends React.Component
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
                            <div style={{padding: '10px', color: 'blue'}}>
                                <h3>{this.props.about_our_mission_title}</h3>
                            </div>
                            <div style={{padding: '10px'}} id="about-our-mission-info-text">
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{zIndex: '99'}}>  
                    <button id="back_btn" 
                            title="Go Back"
                            onClick={(se) => this.leaveAboutOurMission(se)}
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
        $('#about-our-mission-info-text').append(
            this.props.about_our_mission_text
        );

    } // componentDidMount

    leaveAboutOurMission(e)
    {
        // go back
        window.location.assign(this.props.go_back_url);

    } // leaveAboutOurMission
}

AboutOurMission.propTypes = {
    about_our_mission_title: PropTypes.string,
    about_our_mission_text: PropTypes.string,
    go_back_url: PropTypes.string, // /laastras/home#laastras-home-footer
    go_back_label: PropTypes.string
};

export default AboutOurMission