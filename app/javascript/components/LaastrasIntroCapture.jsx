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
                        <p>
                            <p><u>{this.props.job_offers_label}</u>:</p>
                            <p>
                                <ol>
                                    <li>
                                        <a href={this.props.project_manager_assistant_offer_url}> 
                                            {this.props.project_manager_assistant} 
                                        </a>
                                    </li>
                                </ol>
                            </p>
                        </p>
                        <p>
                            <p><u>{this.props.key_services_label}</u>:</p>
                            <p>
                                <ul>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[0]} width="50" className="img-fluid" />
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[0]}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[1]} width="50" className="img-fluid" />
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[1]}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[2]} width="50" className="img-fluid" />
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[3]}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[3]} width="50" className="img-fluid" />
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[2]}
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[4]}
                                        </p>
                                    </li>
                                </ul>
                            </p>
                        </p>
                    </p>
                </div>
            </div>
        );
    }
}

LaastrasIntroCapture.propTypes = {
    laastras_sample_services: PropTypes.array,
    laastras_e_logo_urls: PropTypes.array,
    job_offers_label: PropTypes.string,
    project_manager_assistant_offer_url: PropTypes.string,
    project_manager_assistant: PropTypes.string,
    key_services_label: PropTypes.string
};

export default LaastrasIntroCapture