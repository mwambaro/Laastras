
import React from "react"
import PropTypes from "prop-types"

class SiteHeader extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {supported_languages: JSON.parse(this.props.supported_languages)};
    }

    render()
    {
        let logo_style = {
            fontSize: '40px', 
            fontWeight: 'bold'
        };
        return(
            <div>
                <div id="locale-section" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div>
                                    <table class="table">
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>
        );
    }

    setLocaleLanguage(e)
    {
        if(!e)
        {
            console.log('setLocaleLanguage event object is null');
        }

        let button = e.target;
        if(!button)
        {
            console.log('clicked button object is null');
        }

        // display languages modal
        $('#locale-section').modal('show');
        this.state.supported_languages.map(ls => {
            let innerHtml = `<tr> <td id="${ls.locale}"> ${ls.language} </td> </tr>`;
            $('tbody').append(innerHtml);
            $(`#${ls.locale}`).click(ee => {
                this.sendLocaleSettings(ee);
            });
            $(`#${ls.locale}`).hover(eee => {
                eee.target.style.cursor = 'pointer';
            });
        });
    }

    sendLocaleSettings(e)
    {
        if(!e)
        {
            console.log('sendLocaleSettings event object is null');
            return;
        }
        let langSetting = e.target;
        if(langSetting)
        {
            let locale = langSetting.id;
            let language = langSetting.innerText;
            alert('Language settings to send: ' + JSON.stringify({locale: locale, language: language}));
        }

        $('tbody').empty();
        $('#locale-section').modal('hide');
    }
}

SiteHeader.propTypes = {
    sign_in_url: PropTypes.string,
    sign_in_inner_text: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_up_inner_text: PropTypes.string,
    supported_languages: PropTypes.string // stringified array of {locale: '',  language: ''} hashes
};

export default SiteHeader;