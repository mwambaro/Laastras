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
            fontSize: '40px', 
            fontWeight: 'bold'
        };
        
        return(
            <div>
                <div>
                    <span className="shadow-lg p-3 mb-5 bg-white rounded" style={logo_style}>
                        Laastras
                    </span> 
                </div>
            </div>
        );
    }
}

LaastrasLogo.propTypes = {};

export default LaastrasLogo;