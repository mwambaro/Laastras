
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
            this.laastras_actions_array = JSON.parse(this.props.laastras_actions);
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
                        <NavigationBar laastras_actions={this.laastras_actions_array}
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
    laastras_actions: PropTypes.string, // stringified array of {url:, inner_text:, dropdown_boolean:, data: json-array-of-hashes} hashes
    supported_languages: PropTypes.string, // stringified array of {locale: '',  language: '', country: ''} hashes 
    locale_end_point: PropTypes.string
};

export default SiteHeader;