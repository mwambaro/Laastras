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
    }

    render()
    {
        
        return(
            <div>
                <div>
                    <LaastrasIntroCapture laastras_sample_services={this.props.laastras_sample_services}/>
                </div>
                <hr></hr>
                <div>
                    <MissionKickOff mission_kick_off_data={this.props.mission_kick_off_data}
                                    kick_off_section_title={this.props.kick_off_section_title}/>
                </div>
                <hr></hr>
                <div>
                    <LaastrasVision laastras_vision_html={this.props.laastras_vision_html}
                                    vision_title_inner_text={this.props.vision_title_inner_text}/>
                </div>
            </div>
        );
    }
}

HomeMain.propTypes = {
    laastras_sample_services: PropTypes.array,
    mission_kick_off_data: PropTypes.array,
    kick_off_section_title: PropTypes.string,
    laastras_vision_html: PropTypes.string,
    vision_title_inner_text: PropTypes.string
};

export default HomeMain