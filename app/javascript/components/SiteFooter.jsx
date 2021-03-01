import React from "react"
import PropTypes from "prop-types"
import SocialMediaShare from "./SocialMediaShare"
import SiteFooterLinks from "./SiteFooterLinks"

require("./CenterElement");

class SiteFooter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            rerender: 0
        };
    }

    render()
    {

        return(
            <div id="site-footer-component" 
                 className="shadow-lg p-3 mb-5 bg-white rounded">
                <div className="text-center"> 
                    &copy; {this.props.copy_right_text}
                </div>
                <div id="site-footer-div-links" className="text-center">
                    <SiteFooterLinks footer_actions={this.props.footer_actions}
                                     parent_selector={'#site-footer-div-links'}/>
                </div>
                <div id="site-footer-div-social-media-share" className="text-center">
                    <SocialMediaShare social_media_data={this.props.social_media_data}
                                      parent_selector={'#site-footer-div-social-media-share'}
                                      display_type={null}/>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.hCenterComponents();
        window.addEventListener('resize', e => this.onResizeHandler(e));
    }

    componentDidUpdate()
    {
        this.hCenterComponents();
    }

    hCenterComponents()
    {
        $('#site-footer-div-links').hcenter()
        $('#site-footer-div-social-media-share').hcenter();
    }

    onResizeHandler(e)
    {
        this.setState({
            rerender: 1
        });
    }
}

SiteFooter.propTypes = {
    social_media_data: PropTypes.object,
    footer_actions: PropTypes.array,
    copy_right_text: PropTypes.string
};

export default SiteFooter