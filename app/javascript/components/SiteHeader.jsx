
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
    }

    render()
    {
        return(
            <div>
                <div className="row">
                    <div className="col-sm-4"> 
                        <LaastrasLogo />  
                    </div>
                    <div className="col-sm-6">
                        <NavigationBar services_url={this.props.services_url}
                                       services_inner_text={this.props.services_inner_text}
                                       hire_us_url={this.props.hire_us_url}
                                       hire_us_inner_text={this.props.hire_us_inner_text}
                                       donate_url={this.props.donate_url}
                                       donate_inner_text={this.props.donate_inner_text}
                                       sign_in_url={this.props.sign_in_url}
                                       sign_in_inner_text={this.props.sign_in_inner_text}
                                       sign_up_url={this.props.sign_up_url}
                                       sign_up_inner_text={this.props.sign_up_inner_text}/>
                    </div>
                    <div className="col-sm-2">
                        <LocaleSettings locale_end_point={this.props.locale_end_point}
                                        supported_languages={this.props.supported_languages} />
                    </div>
                </div>
            </div>
        );
    }

    
}

SiteHeader.propTypes = {
    sign_in_url: PropTypes.string,
    sign_in_inner_text: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_up_inner_text: PropTypes.string,
    services_inner_text: PropTypes.string,
    services_url: PropTypes.string,
    hire_us_inner_text: PropTypes.string,
    hire_us_url: PropTypes.string,
    donate_inner_text: PropTypes.string,
    donate_url: PropTypes.string,
    supported_languages: PropTypes.string, // stringified array of {locale: '',  language: '', country: ''} hashes 
    locale_end_point: PropTypes.string
};

export default SiteHeader;