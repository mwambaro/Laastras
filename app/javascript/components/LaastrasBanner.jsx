import React from "react" 
import PropTypes from "prop-types"
import LaastrasBannerPitch from "./LaastrasBannerPitchMessage"
import LaastrasBannerImg from "./LaastrasBannerImage"
import LaastrasBannerHtm from "./LaastrasBannerHtml"


require("./MobileDevices");

class LaastrasBanner extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.initial_banner_width = 0;
        this.state = {
            banner_width: 0,
            banner_width_at_switch_time: 0
        };
        this.event_name = 'pitch-message-event';
        window.addEventListener('switch-banners', (e) => {
            this.setState({
                banner_width: e.data.banner_width,
                banner_width_at_switch_time: e.data.banner_width_at_switch_time
            });
        })

    } // constructor 

    render()
    {
        let e = React.createElement;

        let elt = null;
        let device = $(window).isMobile();
        let width = $(window).width();
        if(
            device || 
            (
                width < this.state.banner_width && 
                this.state.banner_width_at_switch_time < this.state.banner_width
            )
        ){
            elt = e(
                'div',
                {
                    id: 'laastras-banner'
                },
                e(
                    LaastrasBannerPitch, 
                    {
                        laastras_banner_pitch_message_event: this.event_name,
                        laastras_banner_pitch_message: this.props.laastras_banner_pitch_message,
                        home_url: this.props.home_url,
                        home_label: this.props.home_label
                    }
                ),
                e(
                    LaastrasBannerImg, 
                    {
                        event_name: this.event_name,
                        fire_pitch_message_event: this.fire_pitch_message_event,
                        switch_banners_event: this.switch_banners,
                        laastras_banner_image: this.props.laastras_banner_image,
                    }
                )
            );
        }
        else 
        {
            elt = e(
                'div',
                {
                    id: 'laastras-banner'
                },
                e(
                    LaastrasBannerPitch, 
                    {
                        laastras_banner_pitch_message_event: this.event_name,
                        laastras_banner_pitch_message: this.props.laastras_banner_pitch_message,
                        home_url: this.props.home_url,
                        home_label: this.props.home_label
                    }
                ),
                e(
                    LaastrasBannerHtm, 
                    {
                        event_name: this.event_name,
                        fire_pitch_message_event: this.fire_pitch_message_event,
                        switch_banners_event: this.switch_banners,
                        laastras_logo_url: this.props.laastras_logo_url,
                        e_grocery_logo_url: this.props.e_grocery_logo_url,
                        e_card_logo_url: this.props.e_card_logo_url,
                        e_logistics_logo_url: this.props.e_logistics_logo_url,
                        e_alliances_logo_url: this.props.e_alliances_logo_url,
                        e_homocracy_logo_url: this.props.e_homocracy_logo_url,
                        from: this.props.from,
                        democracy: this.props.democracy,
                        to: this.props.to,
                        homocracy: this.props.homocracy
                    }
                )
            );
        }

        return elt;

    } // render

    componentDidMount()
    {} // componentDidMount

    fire_pitch_message_event(event_name, banner_container_id)
    {
        let event = new Event(
            event_name,
            {
                bubbles: true,
                cancelable: false,
                composed: true
            }
        );

        event.data = null;

        let elt = document.getElementById(banner_container_id);
        if(elt)
        {
            elt.dispatchEvent(event);
        }

    } // fire_pitch_message_event

    switch_banners(ids)
    {
        let width = $(window).width();
        let brands_width = 0;
        ids.map((id) => {
            brands_width += $(`#${id}`).width(); 
        });

        if(brands_width>width) // switch to banner_image from banner_html 
        {
            $(window).fire_event(
                'switch-banners', 'laastras-banner', {
                    banner_width: brands_width,
                    banner_width_at_switch_time: width
                }
            );
        }

    } // switch_banners

}

LaastrasBanner.propTypes = {
    // Banner Pitch
    laastras_banner_pitch_message: PropTypes.string,
    home_url: PropTypes.string,
    home_label: PropTypes.string,
    // Banner Html
    laastras_logo_url: PropTypes.string,
    e_grocery_logo_url: PropTypes.string,
    e_card_logo_url: PropTypes.string,
    e_logistics_logo_url: PropTypes.string,
    e_alliances_logo_url: PropTypes.string,
    e_homocracy_logo_url: PropTypes.string,
    from: PropTypes.string,
    democracy: PropTypes.string,
    to: PropTypes.string,
    homocracy: PropTypes.string,
    // Banner Image
    laastras_banner_image: PropTypes.string
}

export default LaastrasBanner