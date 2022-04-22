import React from "react"
import PropTypes from "prop-types"
import LaastrasIntroCapture from "./LaastrasIntroCapture"
import LaastrasVision from "./LaastrasVision"
import MissionKickOff from "./MissionKickOff"

class HomeMain extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        let div_container_style = {
            margin: '5px'
        }

        return(
            <div>
                <div style={div_container_style}>
                    <LaastrasIntroCapture laastras_sample_services={this.props.laastras_sample_services}/>
                </div>
                
                <div style={div_container_style}>
                    <MissionKickOff mission_kick_off_data={this.props.mission_kick_off_data}
                                    kick_off_section_title={this.props.kick_off_section_title}
                                    click_or_tap_image_text={this.props.click_or_tap_image_text}/>
                </div>
                
                <div style={div_container_style}>
                    <LaastrasVision laastras_vision_html={this.props.laastras_vision_html}
                                    vision_title_inner_text={this.props.vision_title_inner_text}/>
                </div>
            </div>
        );

    } // render
}

HomeMain.propTypes = {
    laastras_sample_services: PropTypes.array,
    mission_kick_off_data: PropTypes.array,
    kick_off_section_title: PropTypes.string,
    click_or_tap_image_text: PropTypes.string,
    laastras_vision_html: PropTypes.string,
    vision_title_inner_text: PropTypes.string
};

export default HomeMain