import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"
import SocialMediaShare from "./SocialMediaShare"
import LocaleSettings from "./LocaleSettings"

class ToggleNavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.toggleNavbarInnerActionModal = null;
    }

    render()
    {
        let text_style = {
            whiteSpace: 'nowrap',
            fontWeight: 'bold'
        };

        let div_flex_style = {
            backgroundColor: 'white',
            margin: '5px'
        };

        return(
            <div id="toggle-navigation-bar-container">
                <div id="toggle-navbar-dropdown-modal" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="toggle-navbar-modal-close" type="button" className="close" aria-label="Close"
                                        onClick={se => this.onClickToggleNavbarDropdownModalCloseBtn(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody id="toggle-navbar-dropdown-modal-body">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href={this.props.home_action_url}>
                                <img src={this.props.logo_image_url} 
                                     alt="" 
                                     width="80" 
                                     height="60" 
                                     className="d-inline-block align-text-top" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {
                                        this.props.laastras_actions.map((action, idx) => 
                                            <li key={`toggle-navbar-nav-item-${idx}`}
                                                className="nav-item">
                                            <a className="nav-link"
                                               id={`toggle-navbar-nav-item-list-a-${idx}-${action.dropdown_boolean}`}
                                               href={action.url}
                                               onClick={se => this.onClickToggleNavbarNavLink(se)}>
                                                <span style={text_style}> {action.inner_text} </span>
                                            </a>
                                            </li>
                                        )
                                    }
                                </ul>
                                <div className="d-flex">
                                    <div>
                                        <form name="navbar_search_form"
                                              className="d-flex">
                                            <input className="form-control me-2" 
                                                   type="search" 
                                                   placeholder="Search" 
                                                   aria-label="Search"
                                                   style={div_flex_style}/>
                                            <button className="btn btn-outline-success" 
                                                    type="submit"
                                                    style={div_flex_style}>
                                                Search
                                            </button>
                                        </form>
                                    </div>
                                    <div style={div_flex_style}>
                                        <LocaleSettings locale_end_point={this.props.locale_end_point}
                                                        supported_languages={this.props.supported_languages}
                                                        active_language_locale={this.props.active_language_locale}/>
                                    </div>
                                    <div id="toggle-navbar-social-media-share" style={div_flex_style}>
                                        <SocialMediaShare social_media_data={this.props.social_media_data}
                                                          parent_selector={'#toggle-navbar-social-media-share'}
                                                          display_type={'block-list'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.toggleNavbarInnerActionModal = new Modal(
            document.getElementById('toggle-navbar-dropdown-modal')
        );
    }

    onClickToggleNavbarDropdownModalCloseBtn(e)
    {
        this.toggleNavbarInnerActionModal.hide();
        console.log('close button clicked ...');
    }

    onClickToggleNavbarNavLink(e)
    {
        if(typeof(e) === 'undefined')
        {
            console.log('onClickToggleNavbarNavLink: event object is not defined');
            return;
        }
        let anchor = e.target;
        if(!anchor)
        {
            console.log('onClickToggleNavbarNavLink: clicked target is not defined');
            return;
        }
        e.preventDefault();

        let boolean_id = null;
        let href_url = null;
        if(anchor.id)
        {
            boolean_id = anchor.id;
            href_url = anchor.href;
        }
        else
        {
            boolean_id = anchor.parentElement.id;
            href_url =  anchor.parentElement.href;
        }
        if(!boolean_id)
        {
            console.log('Dropdown boolean id could not be inferred. Damn!');
            return;
        }
        
        //console.log(`${anchor.innerText.trim()} (id): ${boolean_id}`);
        let m = boolean_id.match(/-(\d+)-(true|false)$/i);
        if(!m)
        {
            console.log('onClickNavbarNavLink: missing/invalid "dropdown_boolean" data in link object');
            return;
        }

        if(m[2].match(/^true$/i)) // Has dropdown
        {

            let html = "";
            try
            {
                let idx = parseInt(m[1]);
                let action = this.props.laastras_actions[idx];
                let inner_actions = action.data;
                inner_actions.map((action, i) => {
                    html += `
                        <tr>
                            <td>
                                <a href="${action.url}" 
                                   class="nav-link action-inner-link"
                                   id="action-inner-link-${i}">
                                    ${action.inner_text}
                                </a>
                            </td>
                        </tr>
                    `
                });
            }
            catch(error)
            {
                console.log('onClickToggleNavbarNavLink: ' + error);
            }

            $('#toggle-navbar-dropdown-modal-body').empty();
            $('#toggle-navbar-dropdown-modal-body').append(html);
            var modal = this.toggleNavbarInnerActionModal;
            modal.show();
            
            // hijack click event on inner action links just appended
            $('.action-inner-link').on('click', (event) => {
                let link = event.target;
                
                // hide modal
                modal.hide();

                let href = null;
                if(link.id)
                {
                    href = link.href;
                }
                else
                {
                    href =  link.parentElement.href;
                }
                if(href)
                {
                    window.location = href;
                }
            });
        }
        else if(m[2].match(/^false$/i)) // Has no dropdown
        {
            if(!href_url)
            {
                console.log('No url was found.');
            }
            else
            {
                window.location = href_url;
            }
        }
    }
}

ToggleNavigationBar.propTypes = {
    laastras_actions: PropTypes.array, // array of {url: '', inner_text: '', dropdown_boolean: '', data: ''} hashes
    logo_image_url: PropTypes.string,
    supported_languages: PropTypes.array, // array of {locale: '',  language: '', country: ''} hashes 
    locale_end_point: PropTypes.string,
    social_media_data: PropTypes.object,
    home_action_url: PropTypes.string,
    active_language_locale: PropTypes.string
};

export default ToggleNavigationBar;