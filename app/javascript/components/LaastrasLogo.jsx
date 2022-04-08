import React from "react"
import PropTypes from "prop-types"

class LaastrasLogo extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let logo_style = {
            fontSize: '30px', 
            fontWeight: 'bold'
        };
        
        return(
            <div className="row">
                <div className="col-sm-8"> 
                    <img src="/assets/Logo-01.png" alt="Laas Logo"/>
                </div>
                <div className="col-sm-4">
                    <span id="logo-span" className="shadow-lg p-3 mb-5 bg-white rounded" style={logo_style}>
                        tras
                    </span> 
                </div>
            </div>
        );
    }
}

LaastrasLogo.propTypes = {};

export default LaastrasLogo;