import React from "react"
import PropTypes from "prop-types"
import LaastrasLocaleSettings from "./LocaleSettings"

class LaastrasNavigationBar extends React.Component 
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    { 
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href={this.props.home_action_url}>
                            <img src={this.props.logo_image_url} 
                                 alt="Laastras" 
                                 width="80" 
                                 className="d-inline-block align-text-top img-fluid" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {
                                    this.props.laastras_actions.map((action, idx) =>
                                        <li key={`nav-item-${idx}`} className="nav-item">
                                            {
                                                action.dropdown_boolean === 'true' ?
                                                (
                                                    <div>
                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link dropdown-toggle" href="#" id={`navbarDropdownMenuLink${idx}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {action.inner_text}
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby={`navbarDropdownMenuLink${idx}`}>
                                                                {
                                                                    action.data.map((a, i) =>
                                                                        <div key={`dropdown-item-${idx}${i}`}>
                                                                            <li key={`dropdown-item-${idx}${i}`}>
                                                                                <a className="dropdown-item" href={a.url}>{a.inner_text}</a>
                                                                            </li>
                                                                        </div>
                                                                    )
                                                                }
                                                            </ul>
                                                        </li>
                                                    </div>
                                                ) :
                                                (<a className="nav-link" href={action.url}>{action.inner_text}</a>)
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                            <div className="d-flex flex-row justify-content-end">
                                {
                                    this.props.laastras_user_is_logged_in === 'true' ? 
                                    (
                                        <div className="d-flex flex-row justify-content-end">
                                            <div>
                                                <button 
                                                    className="btn btn-primary" 
                                                    type="button"
                                                    style={{
                                                        backgroundColor: 'black',
                                                        margin: '5px',
                                                        fontColor: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                    onClick={(se) => this.onClickSignOutButton(se)}
                                                    id="sign-out-btn">
                                                    {this.props.sign_out_label}
                                                </button>
                                            </div>
                                            <div id="profile-image-div"> 
                                                <img src={this.props.profile_photo_url}
                                                    id="laastras-user-profile-photo"
                                                    className="img-fluid"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        display: 'inline-block'
                                                    }}/>
                                            </div>
                                        </div>
                                    ):
                                    (
                                        <div id="log-in-log-out-btn" 
                                            className="d-flex flex-row justify-content-end">
                                            <button 
                                                className="btn btn-primary" 
                                                type="button"
                                                style={{
                                                    backgroundColor: 'black',
                                                    margin: '5px',
                                                    fontColor: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                                onClick={(se) => this.onClickSignInButton(se)}>
                                                {this.props.sign_in_label}
                                            </button>
                                            <button 
                                                className="btn btn-primary" 
                                                type="button"
                                                style={{
                                                    backgroundColor: 'black',
                                                    margin: '5px',
                                                    fontColor: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                                onClick={(se) => this.onClickSignUpButton(se)}>
                                                {this.props.sign_up_label}
                                            </button>
                                        </div>
                                    )
                                }
                                
                                <div 
                                    style={{
                                        //backgroundColor: 'white',
                                        margin: '5px'
                                    }}
                                    id="locale-area-icon-div"
                                    onMouseOver={(se) => this.onMouseOverLocaleSection(se)}>
                                    <LaastrasLocaleSettings locale_end_point={this.props.locale_end_point}
                                                        supported_languages={this.props.supported_languages}
                                                        active_language_locale={this.props.active_language_locale}
                                                        language_icon={this.props.language_icon}/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );

    } // render

    componentDidMount()
    {
        this.manageProfilePhoto();
        
    } // componentDidMount

    onMouseOverLocaleSection(e)
    {
        e.target.style.cursor = 'pointer';

    } // onMouseOverLocaleSection

    onClickSignInButton(e)
    {
        window.location = this.props.sign_in_url;

    } // onClickSignInButton

    onClickSignUpButton(e)
    {
        window.location = this.props.sign_up_url;

    } // onClickSignUpButton

    onClickSignOutButton(e)
    {
        window.location = this.props.sign_out_url;

    } // onClickSignUpButton

    manageProfilePhoto()
    {
        $('#laastras-user-profile-photo').hover((e) => {
            e.target.style.cursor = 'pointer';
        });
        $('#laastras-user-profile-photo').on('click', (e) => {
            window.location = this.props.show_profile_url;
        })
    }


} // LaastrasNavigationBar

LaastrasNavigationBar.propTypes = {
    laastras_navigation_bar_actions: PropTypes.array, // array of {url: '', inner_text: '', dropdown_boolean: '', data: ''} hashes
    supported_languages: PropTypes.array, // array of {locale: '',  language: '', country: ''} hashes 
    locale_end_point: PropTypes.string,
    active_language_locale: PropTypes.string,
    sign_in_label: PropTypes.string,
    sign_in_url: PropTypes.string,
    sign_up_label: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_out_label: PropTypes.string,
    sign_out_url: PropTypes.string,
    laastras_user_is_logged_in: PropTypes.string,
    profile_photo_url: PropTypes.string,
    show_profile_url: PropTypes.string,
    language_icon: PropTypes.string
}

export default LaastrasNavigationBar