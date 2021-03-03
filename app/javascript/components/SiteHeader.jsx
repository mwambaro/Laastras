
import React from "react"
import PropTypes from "prop-types"
import NavigationBar from "./NavigationBar"
import LaastrasLogo from "./LaastrasLogo"
import LocaleSettings from "./LocaleSettings"
import SocialMediaShare from "./SocialMediaShare"

require("./CenterElement");

class SiteHeader extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            rerender: 0
        };
        this.setParentMaxWidth();
    }

    render()
    {
        let header_style = {
            display: 'flex'
        }

        return(
            <div>
                <div id="parent-site-header" style={header_style}>
                    <div id="site-header-logo"> 
                        <LaastrasLogo />  
                    </div>
                    <div id="site-header-navbar">
                        <NavigationBar laastras_actions={this.props.laastras_actions}
                                       parent_selector={'#site-header-navbar'}
                                       display_type={null}
                                       parent_max_width={this.parent_max_width}/>
                    </div>
                    <div id="site-header-lang">
                        <LocaleSettings locale_end_point={this.props.locale_end_point}
                                        supported_languages={this.props.supported_languages} />
                    </div>
                    <div id="site-header-social-media-share">
                        <SocialMediaShare social_media_data={this.props.social_media_data}
                                          parent_selector={'#site-header-social-media-share'}
                                          display_type={'block-list'}/>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.vCenterComponents();
        window.addEventListener('resize', e => this.onResizeHandler(e)); 

        this.setParentMaxWidth();
        this.setState({
            rerender: 2
        });

    }

    componentDidUpdate()
    {
        this.vCenterComponents();
    }

    vCenterComponents()
    {
        $('#site-header-logo').vcenter();
        $('#site-header-navbar').vcenter();
        $('#site-header-lang').vcenter();
        $('#site-header-social-media-share').vcenter();
    }

    setParentMaxWidth()
    {
        let display = $('#parent-site-header').css('display');
        if(display === 'flex')
        {
            this.parent_max_width = window.innerWidth - $('#site-header-logo').outerWidth() 
                                                      - $('#site-header-lang').outerWidth() 
                                                      - $('#site-header-social-media-share').outerWidth(); 
        }
        else 
        {
            this.parent_max_width = window.innerWidth;
        }
    }

    onResizeHandler(e)
    {
        this.setParentMaxWidth();
        this.setState({
            rerender: this.state.rerender+1
        });
    }
}

SiteHeader.propTypes = {
    laastras_actions: PropTypes.array, // array of {url:, inner_text:, dropdown_boolean:, data: json-array-of-hashes} hashes
    supported_languages: PropTypes.array, // array of {locale: '',  language: '', country: ''} hashes 
    locale_end_point: PropTypes.string,
    social_media_data: PropTypes.object
};

export default SiteHeader;