import React from "react"
import PropTypes from "prop-types"

class LaastrasIntroCapture extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        // background-color: #303037; #0971b8; #c13ead
        let outer_box_style = {
            backgroundColor: '#303037', 
            borderRadius: '5px'
        };
        let text_body_div_style = {
            padding: '3px', 
            margin: '3px'
        };
        let text_body_p_style = {
            fontSize: '18px', 
            color: '#ededed', 
            padding: '3px'
        };

        let capture_text = "";
        this.props.laastras_sample_services.map((service, idx) => {
            if(idx === this.props.laastras_sample_services.length-1)
            {
                capture_text += service;
            }
            else
            {
                capture_text += `${service} • `;
            }
        });

        return(
            <div className="justify-content-center" 
                 style={outer_box_style}>
                <div style={text_body_div_style}>
                    <p style={text_body_p_style}>
                        <ul>
                        {
                            this.props.laastras_sample_services.map((service, idx) =>
                                <li key={`capture-${idx}`}>
                                    {service}
                                </li>
                            )
                        }
                        </ul>
                    </p>
                </div>
            </div>
        );
    }
}

LaastrasIntroCapture.propTypes = {
    laastras_sample_services: PropTypes.array
};

export default LaastrasIntroCapture