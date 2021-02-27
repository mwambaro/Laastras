import React from "react"
import PropTypes from "prop-types"

class LocaleSettings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            supported_languages: JSON.parse(this.props.supported_languages)
        };
        this.localeEndPoint = this.props.locale_end_point;
        this.localeInitSetElementId = "";
    }

    render()
    {
        return(
            <div>
                <div id="action-response-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div id="action-response-message" className="text-center">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.actionResponseButton(se)}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="set-locale-spinner-section" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="locale-section" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div>
                                    <table className="table">
                                        <tbody>
                                            {
                                                this.state.supported_languages.map((lc, idx) =>
                                                    <tr key={`locale-section-tr-${idx}`}>
                                                        <td id={lc.locale}
                                                            onClick={se => this.onClickLocaleSectionCell(se)}
                                                            onMouseOver={se => this.onMouseOverLocaleSectionCell(se)}>
                                                            {lc.language} ({lc.country})
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button id="set-locale-button" type="button" className="btn btn-default" onClick={se => this.setLocaleLanguage(se)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    actionResponseButton(e)
    {
        $('#action-response-message').empty();
        $('#action-response-section').modal('hide');
    }

    onMouseOverLocaleSectionCell(e)
    {
        if(typeof(e) === 'undefined')
        {
            console.log('onMouseOverLocaleSectionCell: event object is not defined');
            return;
        }

        let cell = e.target;
        if(!cell)
        {
            console.log('onMouseOverLocaleSectionCell: clicked/tapped cell object is not defined');
            return;
        }

        cell.style.cursor = "pointer";
    }

    onClickLocaleSectionCell(e)
    {
        if(typeof(this) === 'undefined')
        {
            console.log('onClickLocaleSectionCell: "this" object is not defined');
            return;
        }
        if(typeof(e) === 'undefined')
        {
            console.log('onClickLocaleSectionCell: event object is not defined');
            return;
        }

        let cell = e.target;
        if(!cell)
        {
            console.log('onClickLocaleSectionCell: clicked/tapped cell object is not defined');
            return;
        }

        this.sendLocaleSettings(e);
    }

    setLocaleLanguage(e)
    {
        if(typeof(this) === 'undefined')
        {
            console.log('setLocaleLanguage: "this" object is undefined');
            return;
        }
        if(!e)
        {
            console.log('setLocaleLanguage event object is null');
        }

        let button = e.target;
        if(!button)
        {
            console.log('clicked button object is null');
        }
        else
        {
            this.localeInitSetElementId = button.id;
        }
        // display languages modal

        $('#locale-section').modal('show');
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
            let lregex = new RegExp("\s*([^\\(]+)\\(([^\\)]+)\\)");
            let language = langSetting.innerText.trim();
            let country = "";
            try
            {
                let match = language.match(lregex);
                if(match)
                {
                    language = match[1].trim();
                    country = match[2].trim();
                }
            }
            catch(error)
            {
                console.log("sendLocaleSettings: " + error);
            }
            finally
            {
                let localeData = {
                    locale: locale, 
                    language: language, 
                    country: country
                };
                let localeJson = JSON.stringify(localeData);
                console.log('Language settings to send: ' + localeJson);
                $('#locale-section').modal('hide');
                if(this.localeEndPoint)
                {
                    $('#set-locale-spinner-section').modal('show');
                    this.timer = setTimeout(() => {
                        try
                        {
                            $('#set-locale-spinner-section').modal('hide');
                            if(this.timer)
                            {
                                clearTimeout(this.timer);
                                this.timer = null;
                            }
                        }
                        catch(error)
                        {
                            console.log('sendLocaleSettings#setTimeout#clearTimeout: ' + error);
                        }
                    }, 6000);

                    try
                    {
                        $.post(
                            this.localeEndPoint,
                            {locale: localeJson, sender_id: this.localeInitSetElementId},
                            (data, status, xq) => {
                                try
                                {
                                    $('#set-locale-spinner-section').modal('hide');
                                    
                                    let code = parseInt(data.code);
                                    let message = data.message;
                                    let html = "";
                                    if(code === 1) // successfully set
                                    {
                                        html = `
                                            <div class="text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                                </svg>
                                            </div>
                                            <div><p> ${message} </p></div>
                                        `;
                                    }
                                    else if(code === 0) // failed to set
                                    {
                                        html = `
                                            <div class="text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </div>
                                            <div><p> ${message} </p></div>
                                        `;
                                    }
                                    else // unknown code
                                    {
                                        html = `
                                            <div class="text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                </svg>
                                            </div>
                                            <div><p> ${message} </p></div>
                                        `;
                                    }

                                    $('#action-response-message').append(html);

                                    $('#set-locale-spinner-section').modal('hide');
                                    $('#action-response-section').modal('show');
                                }
                                catch(error)
                                {
                                    console.log('sendLocaleSettings#post#success: ' + error);
                                }
                                
                                $('#set-locale-spinner-section').modal('hide');
                            },
                            "json"
                        )
                        .fail(() => {
                            $('#set-locale-spinner-section').modal('hide');
                            
                            let message = "An error occurred while attempting to set language settings."
                            let html = `<div><p> ${message} </p></div>`;
                            $('#action-response-message').append(html);
                            $('#action-response-section').modal('show');
                            
                            console.log(`Post request failed. Data: ${localeJson}; End point: ${this.localeEndPoint}`);
                        });
                        $('#set-locale-spinner-section').modal('hide');
                    }
                    catch(error)
                    {
                        console.log('sendLocaleSettings: ' + error);
                    }
                    finally
                    {
                        $('#set-locale-spinner-section').modal('hide');
                    }
                }
            }

        }
    }
}

LocaleSettings.propTypes = {
    supported_languages: PropTypes.string, // stringified array of {locale: '',  language: '', country: ''} hashes
    locale_end_point: PropTypes.string
};

export default LocaleSettings;