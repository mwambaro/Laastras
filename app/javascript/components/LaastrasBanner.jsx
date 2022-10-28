import React from "react" 
import PropTypes from "prop-types"
import LaastrasBannerPitch from "./LaastrasBannerPitchMessage"
import LaastrasBannerImg from "./LaastrasBannerImage"
import LaastrasBannerHtm from "./LaastrasBannerHtml"


require("./MobileDevices");
require("./AppUtilities");

class LaastrasBanner extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            banner_width: 0
        };
        this.event_name = 'pitch-message-event';
        this.device = false;

    } // constructor 

    render()
    {
        let e = React.createElement;

        let elt = null;
        this.device = $(window).isMobile();
        let width = $(window).width();
        let display_style_sm = {
            display: 'block'
        };
        let display_style_md = {
            display: 'block'
        };

        if(
            this.device || 
            (
                width < this.state.banner_width
            )
        ){
            display_style_sm = {
                display: 'block', 
                margin: '0',
                padding: '0'
            };
            display_style_md = {display: 'none'};
        }
        else 
        {
            display_style_md = {
                display: 'block',
                margin: '0',
                padding: '0'
            };
            display_style_sm = {display: 'none'};
        }

        return(
            <div className="container-fluid" id="banners-div" style={{margin: '0', padding: '0'}}>
                <LaastrasBannerPitch
                    laastras_banner_pitch_message_event={this.event_name}
                    laastras_banner_pitch_message={this.props.laastras_banner_pitch_message}
                    home_url={this.props.home_url}
                    home_label={this.props.home_label} />
                <div id="laastras-banner-html" style={display_style_md}>
                    <LaastrasBannerHtm
                        event_name={this.event_name}
                        fire_pitch_message_event={this.fire_pitch_message_event}
                        switch_banners_event={this.switch_banners}
                        laastras_logo_url={this.props.laastras_logo_url}
                        e_grocery_logo_url={this.props.e_grocery_logo_url}
                        e_card_logo_url={this.props.e_card_logo_url}
                        e_logistics_logo_url={this.props.e_logistics_logo_url}
                        e_alliances_logo_url={this.props.e_alliances_logo_url}
                        e_homocracy_logo_url={this.props.e_homocracy_logo_url}
                        from={this.props.from}
                        democracy={this.props.democracy}
                        to={this.props.to}
                        homocracy={this.props.homocracy} />
                </div>
                <div id="laastras-banner-image" style={display_style_sm}>
                    <LaastrasBannerImg
                        event_name={this.event_name}
                        fire_pitch_message_event={this.fire_pitch_message_event}
                        switch_banners_event={this.switch_banners}
                        laastras_banner_image={this.props.laastras_banner_image} />
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        document.getElementById('banners-div').addEventListener('switch-banners', (e) => {
            this.adjust_banners(e.data.banner_width);
        })
    } // componentDidMount

    adjust_banners(brands_width)
    {
        if(this.device)
        {
            return;
        }

        let banner_image = document.getElementById('laastras-banner-image');
        let banner_html = document.getElementById('laastras-banner-html');
        let width = $(window).width();

        if(brands_width>width) //switch to banner_image from banner_html 
        {
            if(banner_image)
            {
                banner_image.style.display = 'block';
            }
            if(banner_html)
            {
                banner_html.style.display = 'none';
            }
        }
        else 
        {
            if(banner_image)
            {
                banner_image.style.display = 'none';
            }
            if(banner_html)
            {
                banner_html.style.display = 'block';
            }
        }

    } // adjust_banners

    fire_pitch_message_event(event_name, banner_container_id)
    {
        $(window).fire_event(
            event_name, banner_container_id, null
        );

    } // fire_pitch_message_event

    switch_banners(ids, ev_id)
    {
        if(ev_id === 'laastras-banner-image')
        {
            return;
        }

        let brands_width = 0;
        ids.map((id) => {
            brands_width += $(`#${id}`).width(); 
        });

        $(window).fire_event(
            'switch-banners', ev_id, {
                banner_width: brands_width
            }
        );

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