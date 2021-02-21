
import React from "react"
import PropTypes from "prop-types"

class SiteHeader extends React.Component
{
    render()
    {
        let logo_style = {
            fontSize: '40px', 
            fontWeight: 'bold'
        };
        return(
            <div className="row">
                <div className="col-sm-9"> 
                    <div>
                        <span className="shadow-lg p-3 mb-5 bg-white rounded" style={logo_style}>
                            Laastras
                        </span> 
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="row text-center">
                        <div className="col-sm-4"> <a href={this.props.sign_in_url}> {this.props.sign_in_inner_text} </a> </div>
                        <div className="col-sm-4"> <a href={this.props.sign_up_url}> {this.props.sign_up_inner_text} </a> </div>
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-default" onClick={se => this.setLocaleLanguage(se)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    setLocaleLanguage(e)
    {
        if(!e)
        {
            return;
        }

        let button = e.target;
        if(!button)
        {
            return;
        }

        // display languages modal
        alert('Display languages modal, please! ' + this.props.supported_languages);
    }
}

SiteHeader.propTypes = {
    sign_in_url: PropTypes.string,
    sign_in_inner_text: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_up_inner_text: PropTypes.string,
    supported_languages: PropTypes.string
};

export default SiteHeader;