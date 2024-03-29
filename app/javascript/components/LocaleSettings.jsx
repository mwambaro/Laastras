import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"
import WaitSpinner from "./WaitSpinner.js"

require("./AppUtilities")

class LocaleSettings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.localeEndPoint = this.props.locale_end_point;
        this.refreshUrl = null;
        this.localeData = null;
        this.state = {
            active_language_locale: this.props.active_language_locale
        };
        this.localeInitSetElementId = "";
        this.actionResponseSectionModal = null;
        this.localeSectionModal = null;
        this.wait_spinner = null;

    } // constructor

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
                                    <button type="button" id="action-response-ok-button" className="btn btn-primary"
                                            onClick={se => this.actionResponseButton(se)}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="locale-section" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="locale-section-modal-close" type="button" className="close" aria-label="Close"
                                        onClick={se => this.onClickLocaleSectionModalCloseBtn(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <table className="table">
                                        <tbody id="locale-settings-tbody">
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={this.props.language_icon} id="set-locale-button" className="img-fluid" width="30px" onClick={se => this.setLocaleLanguage(se)} style={{'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)'}}/>
                </div>
                <div id="locale-spinner"></div>
            </div>
        );

    } // render

    componentDidMount()
    {
        this.setLocaleButtonContents();
        this.setLocaleSettingsLanguages();
        this.actionResponseSectionModal = new Modal(
            document.getElementById('action-response-section')
        );
        this.localeSectionModal = new Modal(document.getElementById('locale-section'));
        this.wait_spinner = new WaitSpinner('locale-spinner');

    } // componentDidMount

    setLocaleSettingsLanguages()
    {
        let html = '';
        let clss = 'locale-settings-language';
        this.props.supported_languages.map((lc, idx) => {
            html += `<tr>
                        <td id="${lc.locale}"
                            class="${clss}">
                            <div>
                                ${this.localeToEmbeddedHtmlForFlag(lc.locale)}
                                <span> ${lc.language} (${lc.country}) </span>
                            </div>
                        </td>
                    </tr>`
        });

        $('#locale-settings-tbody').append(html);
        $(`.${clss}`)
            .on('click', (e) => this.onClickLocaleSectionCell(e))
            .on('mouseover', (e) => this.onMouseOverLocaleSectionCell(e));
    }

    setLocaleButtonContents()
    {
        let html = this.localeToEmbeddedHtmlForFlag(this.state.active_language_locale);

        if(html)
        {
            $('#set-locale-button').empty();
            $('#set-locale-button').append(html);
        }

    } // setLocaleButtonContents

    localeToEmbeddedHtmlForFlag(locale, width=50)
    {
        let html = null;
        if(locale === 'ru_BI')
        {
            html = `
            <img src="https://flagcdn.com/bi.svg"
                 width="${width}"
                 alt="${locale}"> 
            `;
        }
        else if(locale === 'en_US')
        {
            html = `
                <img src="https://flagcdn.com/us.svg" 
                     width="${width}"
                     alt="${locale}" />
            `;
        }
        else if(locale === 'fr_FR')
        {
            html = `
                <img src="https://flagcdn.com/fr.svg" 
                     width="${width}"
                     alt="${locale}" />
            `;
        }
        else if(locale === 'sw_TZ') 
        {
            html = `
            <img src="https://flagcdn.com/tz.svg"
                 width="${width}"
                 alt="${locale}">
            `;
        }
        else if(locale === 'lg_UG') 
        {
            html = `
            <img src="https://flagcdn.com/ug.svg"
                 width="${width}"
                 alt="${locale}">
            `;
        }
        else if(locale === 'rw_RW') 
        {
            html = `
            <img src="https://flagcdn.com/rw.svg"
                 width="${width}"
                 alt="${locale}">
            `;
        }

        return html;

    } // localeToEmbeddedHtmlForFlag

    actionResponseButton(e)
    {
        //console.log('Reloading for locale settings to take effect ... ');
        $('#action-response-message').empty();
        this.actionResponseSectionModal.hide();
        if(this.refreshUrl)
        {
            window.location.assign(this.refreshUrl);
            window.location.reload(true);
        }

        // NOTE: This is where we should set state and leverage React.js responsiveness but
        // we do not know which page is reloading, whether it has this component. Even
        // if we knew, the reload will refresh locale with new data from server, so 
        // no worries.

    } // actionResponseButton

    onClickLocaleSectionModalCloseBtn(e)
    {
        this.localeSectionModal.hide();

    } // onClickLocaleSectionModalCloseBtn

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

    } // onMouseOverLocaleSectionCell

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

    } // onClickLocaleSectionCell

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

        this.localeSectionModal.show();

    } // setLocaleLanguage

    identifyLocaleObjectClicked(event)
    {
        if(!event)
        {
            return null;
        }

        let localeData = null;
        let target = event.target;
        let id = target.id; // td ?
        let inner = target.innerText;
        let src = target.src;
        if(inner && inner != '' && inner != 'undefined') // span
        {
            id = target.parentElement.parentElement.id;
        }
        if(src && src != '' && src != 'undefined') // flag img
        {
            id = target.parentElement.parentElement.id;
        }
        if(!id || id === '' || id === 'undefined') // div ?
        {
            id = target.parentElement.id;
        }
        
        if(id && id != '' && id != 'undefined')
        {
            let locale = id;

            //console.log('Locale: ' + locale);

            let language = $(`#${id} div span`)[0].innerHTML;
            if(!language || language === '' || language === 'undefined')
            {
                console.log('identifyLocaleObjectClicked: failed to get language data; id: ' + id);
                return localeData;
            }
            let lregex = new RegExp("\s*([^\\(]+)\\(([^\\)]+)\\)");
            let match = language.match(lregex);
            if(match)
            {
                language = match[1].trim();
                let country = match[2].trim();
                localeData = {
                    locale: locale, 
                    language: language, 
                    country: country
                };
            }
            else 
            {
                console.log('Language data: "' + language + '" does not match standard regex');
                return localeData;
            }
        }
        else 
        {
            console.log("identifyLocaleObjectClicked: failed to identify id of clicked locale object");
        }

        return localeData;

    } // identifyLocaleObjectClicked

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
            try
            {
                this.localeData = this.identifyLocaleObjectClicked(e);
            }
            catch(error)
            {
                console.log("sendLocaleSettings: " + error);
            }

            if(this.localeData)
            {
                let localeJson = JSON.stringify(this.localeData);
                //console.log('Language settings to send: ' + localeJson);
                this.localeSectionModal.hide();
                if(this.localeEndPoint)
                {   
                    this.wait_spinner.show_wait_spinner();

                    try
                    {
                        this.refreshUrl = window.location.href;
                        var actionResponseMdl = this.actionResponseSectionModal;
                        $.post(
                            this.localeEndPoint,
                            {locale: localeJson, sender_id: this.localeInitSetElementId},
                            (data, status, xq) => {
                                try
                                {
                                    let code = parseInt(data.code);
                                    let message = data.message;
                                    let html = "";
                                    console.log("Locale settings response code: " + data.code);
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
                                        window.location.assign(this.refreshUrl);
                                        window.location.reload(true);
                                    }
                                    else if(code === 0) // failed to set
                                    {
                                        html = `
                                            <div class="feedback-message">
                                                <div class="text-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                    </svg>
                                                </div>
                                                <div><p> ${message} </p></div>
                                            </div>
                                        `;
                                        this.refreshUrl = null;
                                        $('.feedback-message').remove();
                                        $('#action-response-message').append(html);
                                        setTimeout((e) => {
                                            this.wait_spinner.hide_wait_spinner();
                                        }, 1000);
                                        actionResponseMdl.show();
                                    }
                                    else // unknown code
                                    {
                                        html = `
                                            <div class="feedback-message">
                                                <div class="text-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                    </svg>
                                                </div>
                                                <div><p> ${message} </p></div>
                                            </div>
                                        `;
                                        this.refreshUrl = null;
                                        $('.feedback-message').remove();
                                        $('#action-response-message').append(html);

                                        setTimeout((e) => {
                                            this.wait_spinner.hide_wait_spinner();
                                        }, 1000);
                                        actionResponseMdl.show();
                                    }
                                }
                                catch(error)
                                {
                                    console.log('sendLocaleSettings#post#success: ' + error);
                                    setTimeout((e) => {
                                        this.wait_spinner.hide_wait_spinner();
                                    }, 1000);
                                }
                            },
                            "json"
                        )
                        .fail((error) => {
                            setTimeout((e) => {
                                this.wait_spinner.hide_wait_spinner();
                            }, 1000);
                            
                            let message = "An error occurred while attempting to set language settings."
                            let html = `
                                <div class="feedback-message">
                                    <div class="text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" class="bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </div>
                                    <div><p> ${message} </p></div>
                                </div>
                            `;
                            $('.feedback-message').remove();
                            $('#action-response-message').append(html);
                            actionResponseMdl.show();
                            this.refreshUrl = null;
                            console.log(`Post request failed. Data: ${localeJson}; End point: ${this.localeEndPoint}`);
                        });
                    }
                    catch(error)
                    {
                        console.log('sendLocaleSettings: ' + error);
                    }
                    finally
                    {
                        /*setTimeout((e) => {
                            this.wait_spinner.hide_wait_spinner();
                        }, 1000);*/
                    }
                }
            }

        }

    } // sendLocaleSettings
}

LocaleSettings.propTypes = {
    supported_languages: PropTypes.array, // array of {locale: '',  language: '', country: ''} hashes
    locale_end_point: PropTypes.string,
    active_language_locale: PropTypes.string,
    language_icon: PropTypes.string
};

export default LocaleSettings;