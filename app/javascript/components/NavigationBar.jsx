import React from "react"
import PropTypes from "prop-types"

class NavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                <div className="row text-center">
                    <div className="col-sm-2"> <a href={this.props.services_url}> {this.props.services_inner_text} </a> </div>
                    <div className="col-sm-2"> <a href={this.props.hire_us_url}> {this.props.hire_us_inner_text} </a> </div>
                    <div className="col-sm-2"> <a href={this.props.donate_url}> {this.props.donate_inner_text} </a> </div>
                    <div className="col-sm-2"> <a href={this.props.sign_in_url}> {this.props.sign_in_inner_text} </a> </div>
                    <div className="col-sm-2"> <a href={this.props.sign_up_url}> {this.props.sign_up_inner_text} </a> </div>                
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
    services_url: PropTypes.string,
    hire_us_inner_text: PropTypes.string,
    hire_us_url: PropTypes.string,
    donate_inner_text: PropTypes.string,
    donate_url: PropTypes.string
};

export default NavigationBar