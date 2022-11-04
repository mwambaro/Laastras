import React from "react" 
import PropTypes from "prop-types"
import LaastrasNavigationBar from "./LaastrasNavigationBar"
import LaastrasIntroCapture from "./LaastrasIntroCapture"
import MissionKickOff from "./MissionKickOff"
import LaastrasVision from "./LaastrasVision"
import SiteFooter from "./SiteFooter"

require("./AppUtilities");

class LaastrasHome extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {resize: 0};
        this.height_set_event = 'height-has-been-set';

    } // constructor 

    render()
    {
        return(
            <div className="container-fluid">
                <header>
                    <LaastrasNavigationBar
                        laastras_actions={this.props.laastras_navigation_bar.laastras_actions}
                        logo_image_url={this.props.laastras_navigation_bar.logo_image_url}
                        laastras_user_is_logged_in={this.props.laastras_navigation_bar.laastras_user_is_logged_in}
                        supported_languages={this.props.laastras_navigation_bar.supported_languages} 
                        locale_end_point={this.props.laastras_navigation_bar.locale_end_point}
                        active_language_locale={this.props.laastras_navigation_bar.active_language_locale}
                        sign_in_label={this.props.laastras_navigation_bar.sign_in_label}
                        sign_in_url={this.props.laastras_navigation_bar.sign_in_url}
                        sign_up_label={this.props.laastras_navigation_bar.sign_up_label}
                        sign_up_url={this.props.laastras_navigation_bar.sign_up_url}
                        sign_out_label={this.props.laastras_navigation_bar.sign_out_label}
                        sign_out_url={this.props.laastras_navigation_bar.sign_out_url}
                        profile_photo_url={this.props.laastras_navigation_bar.profile_photo_url}
                        show_profile_url={this.props.laastras_navigation_bar.show_profile_url}
                        home_action_url={this.props.laastras_navigation_bar.home_action_url}
                        language_icon={this.props.laastras_navigation_bar.language_icon}
                    />
                </header>

                <main role="main" style={{margin: '0px'}}>
                    <div className="row" style={{margin: '0px', display: 'flex', justifyContent: 'center'}}>
                        <div className="col-md-6" style={{margin: '0px'}} id="intro-capture">
                            <LaastrasIntroCapture
                                laastras_sample_services={this.props.laastras_intro_capture.laastras_sample_services}
                                laastras_e_logo_urls={this.props.laastras_intro_capture.laastras_e_logo_urls}
                                job_offers_label={this.props.laastras_intro_capture.job_offers_label}
                                featured_job_offers={this.props.laastras_intro_capture.featured_job_offers}
                                key_services_label={this.props.laastras_intro_capture.key_services_label}
                            />
                        </div>
                        <div className="col-md-6" style={{margin: '0px'}} id="mission-milestones-outer">
                            <MissionKickOff
                                mission_kick_off_data={this.props.mission_kick_off.mission_kick_off_data}
                                kick_off_section_title={this.props.mission_kick_off.kick_off_section_title}
                                click_or_tap_image_text={this.props.mission_kick_off.click_or_tap_image_text}
                                height_set_event={this.height_set_event}
                            />
                        </div>
                    </div>
                    <LaastrasVision 
                        vision_title_inner_text={this.props.laastras_vision.vision_title_inner_text}
                        laastras_vision_html={this.props.laastras_vision.laastras_vision_html}
                    />
                </main>
                <footer id="laastras-home-footer">
                    <SiteFooter
                        footer_actions={this.props.footer.footer_actions}
                        social_media_data={this.props.footer.social_media_data}
                        copy_right_text={this.props.footer.copy_right_text}
                    />
                </footer>
            </div>
        );

    } // render

    componentDidMount()
    {
        this.scale_home_sizes();
        $(window).on('resize', (e) => {
            setTimeout((e) => {
                this.setState({
                    resize: (this.state.resize+1)
                })
            }, 1000);
        });

        $(window).fire_event(
            this.height_set_event, 
            'mission-milestones-outer', 
            null
        );

    } // componentDidMount

    componentDidUpdate()
    {
        this.scale_home_sizes();
        $(window).fire_event(
            this.height_set_event, 
            'mission-milestones-outer', 
            null
        );

    } // componentDidUpdate

    scale_home_sizes()
    {
        let left = $('#mission-kick-off-component').offset().left;
        let width = $('#intro-capture-component').width();
        let height = $('#intro-capture-component').height();
        if(true)//(left>width) // fix height
        {   
            $('#mission-kick-off-component').height(height);
        }
        else 
        {
            let sm_h = Math.ceil(height/2);
            $('#mission-kick-off-component').height(sm_h);
        }

    } // scale_home_sizes

} // LaastrasHome 

LaastrasHome.propTypes = {
    laastras_navigation_bar: PropTypes.object,
    laastras_intro_capture: PropTypes.object,
    mission_kick_off: PropTypes.object,
    laastras_vision: PropTypes.object,
    footer: PropTypes.object
}

export default LaastrasHome