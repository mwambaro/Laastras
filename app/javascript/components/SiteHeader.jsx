
import React from "react"
import PropTypes from "prop-types"
import NavigationBar from "./NavigationBar"
import LaastrasLogo from "./LaastrasLogo"
import LocaleSettings from "./LocaleSettings"

class SiteHeader extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            parent_max_width: window.innerWidth
        }
        try
        {
            //console.log('Laastras services: ' + this.props.laastras_services);
            this.laastras_services_array = JSON.parse(this.props.laastras_services);
        }
        catch(error)
        {
            console.log('SiteHeader#constructor: ' + error);
        }
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
                        <NavigationBar laastras_services={this.laastras_services_array}
                                       services_inner_text={this.props.services_inner_text}
                                       hire_us_url={this.props.hire_us_url}
                                       hire_us_inner_text={this.props.hire_us_inner_text}
                                       donate_url={this.props.donate_url}
                                       donate_inner_text={this.props.donate_inner_text}
                                       sign_in_url={this.props.sign_in_url}
                                       sign_in_inner_text={this.props.sign_in_inner_text}
                                       sign_up_url={this.props.sign_up_url}
                                       sign_up_inner_text={this.props.sign_up_inner_text}
                                       parent_max_width={this.state.parent_max_width}/>
                    </div>
                    <div id="site-header-lang">
                        <LocaleSettings locale_end_point={this.props.locale_end_point}
                                        supported_languages={this.props.supported_languages} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.reactToParentSizeChange();
        window.addEventListener('resize', e => this.orderElementsOnResize(e)); 
    }

    reactToParentSizeChange(e=null)
    {
        if(typeof(this) === 'undefined')
        {
            console.log('reactToParentSizeChange: "this" object is not defined');
        }

        let max_width = window.innerWidth - $('#site-header-lang').width() - $('#site-header-logo').width();
        //console.log(`Parent max width: ${max_width}`);
        this.setState({
            parent_max_width: max_width
        });
    }

    orderElementsOnResize(e)
    {
        if(typeof(this) === 'undefined')
        {
            console.log('orderElementsOnResize: "this" object is not defined');
        }

        try
        {
            this.reactToParentSizeChange();
        }
        catch(error)
        {
            console.log('orderElementsOnResize: ' + error);
        }
    }
}

SiteHeader.propTypes = {
    sign_in_url: PropTypes.string,
    sign_in_inner_text: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_up_inner_text: PropTypes.string,
    services_inner_text: PropTypes.string,
    laastras_services: PropTypes.string, // JSON string of an array of {url: '', inner_text: ''} hashes
    hire_us_inner_text: PropTypes.string,
    hire_us_url: PropTypes.string,
    donate_inner_text: PropTypes.string,
    donate_url: PropTypes.string,
    supported_languages: PropTypes.string, // stringified array of {locale: '',  language: '', country: ''} hashes 
    locale_end_point: PropTypes.string
};

export default SiteHeader;