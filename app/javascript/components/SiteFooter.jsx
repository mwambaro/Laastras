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
        this.setParentMaxWidth();

    } // constructor

    render()
    {

        return(
            <div id="site-footer-component" 
                 className="shadow-lg p-3 mb-5 bg-white rounded">
                <div id="site-footer-copy-right" className="text-center"> 
                    &copy; {this.props.copy_right_text}
                </div>
                <div id="site-footer-div-links" className="text-center">
                    <SiteFooterLinks footer_actions={this.props.footer_actions}
                                     parent_selector={'#site-footer-div-links'}
                                     parent_max_width={this.site_footer_links_parent_max_width}/>
                </div>
                <div id="site-footer-div-social-media-share" className="text-center">
                    <SocialMediaShare social_media_data={this.props.social_media_data}
                                      parent_selector={'#site-footer-div-social-media-share'}
                                      display_type={null}
                                      parent_max_width={this.site_footer_social_media_parent_max_width}/>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        this.hCenterComponents();
        window.addEventListener('resize', e => this.onResizeHandler(e));
        this.setParentMaxWidth();
        this.setState({
            rerender: 2
        });

    } // componentDidMount

    componentDidUpdate()
    {
        this.hCenterComponents();

    } // componentDidUpdate

    hCenterComponents()
    {
        $('#site-footer-div-links').hcenter()
        $('#site-footer-div-social-media-share').hcenter();
    } // hCenterComponents

    setParentMaxWidth()
    {
        let display = $('#site-footer-component').css('display');
        if(display === 'flex')
        {
            this.site_footer_links_parent_max_width = window.innerWidth 
                                                      - $('#site-footer-copy-right').outerWidth()
                                                      - $('#site-footer-div-social-media-share').outerWidth();
            this.site_footer_social_media_parent_max_width = window.innerWidth 
                                                             - $('#site-footer-copy-right').outerWidth()
                                                             - $('#site-footer-div-links').outerWidth();
        }
        else
        {
            this.site_footer_links_parent_max_width = window.innerWidth;
            this.site_footer_social_media_parent_max_width = window.innerWidth;
        }

    } // setParentMaxWidth

    onResizeHandler(e)
    {
        this.setParentMaxWidth();
        this.setState({
            rerender: this.state.rerender+1
        });

    } // onResizeHandler
}

SiteFooter.propTypes = {
    social_media_data: PropTypes.object,
    footer_actions: PropTypes.array,
    copy_right_text: PropTypes.string
};

export default SiteFooter