import React from "react"
import PropTypes from "prop-types"
import NavigationBarDropdownItem from "./NavigationBarDropdownItem"

class NavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        //console.log('Services count: ' + this.props.laastras_services.length);
        
        return(
            <div>
                <div>
                    <nav id="navigation-bar-nav" className="navbar navbar-expand-sm navbar-dark bg-dark">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-items" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar-items">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                        {this.props.services_inner_text} 
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        {
                                            this.props.laastras_services.map((service, idx) => 
                                                <NavigationBarDropdownItem 
                                                    key={`navbar-dropdown-item-${idx}`}
                                                    url={service.url}
                                                    inner_text={service.inner_text}
                                                    index={idx}
                                                    count_hint={this.props.laastras_services.length}/>
                                            )
                                        }
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={this.props.hire_us_url}> {this.props.hire_us_inner_text} </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={this.props.donate_url}> {this.props.donate_inner_text} </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={this.props.sign_in_url}> {this.props.sign_in_inner_text} </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href={this.props.sign_up_url}> {this.props.sign_up_inner_text} </a>
                                </li>
                            </ul>
                        </div>
                    </nav>                
                </div>
            </div>
        );
    }
}

NavigationBar.propTypes = {
    sign_in_url: PropTypes.string,
    sign_in_inner_text: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_up_inner_text: PropTypes.string,
    services_inner_text: PropTypes.string,
    laastras_services: PropTypes.array, // array of {url: '', inner_text: ''} hashes
    hire_us_inner_text: PropTypes.string,
    hire_us_url: PropTypes.string,
    donate_inner_text: PropTypes.string,
    donate_url: PropTypes.string
};

export default NavigationBar