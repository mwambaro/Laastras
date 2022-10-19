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
                    <div style={text_body_p_style}>
                        <div>
                            <p><u>{this.props.job_offers_label}</u>:</p>
                            <div>
                                <ol>
                                    {
                                        this.props.featured_job_offers.map((job_offer, idx) => 
                                            <li key={`job-offer-${idx}`}>
                                                <a href={job_offer.show_url} style={{textDecoration: 'none'}}> 
                                                    {job_offer.title}
                                                </a>
                                            </li>
                                        )
                                    }
                                </ol>
                            </div>
                        </div>
                        <div>
                            <p><u>{this.props.key_services_label}</u>:</p>
                            <div>
                                <ul>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[0].image_url} 
                                                 width="50" 
                                                 className="img-fluid brand-logo-image"
                                                 data-url={this.props.laastras_e_logo_urls[0].service_url}/>
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[0]}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[1].image_url} 
                                                 width="50" 
                                                 className="img-fluid brand-logo-image"
                                                 data-url={this.props.laastras_e_logo_urls[1].service_url} />
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[1]}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[2].image_url} 
                                                 width="50" 
                                                 className="img-fluid brand-logo-image"
                                                 data-url={this.props.laastras_e_logo_urls[2].service_url} />
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[3]}
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            <img src={this.props.laastras_e_logo_urls[3].image_url} 
                                                 width="50" 
                                                 className="img-fluid brand-logo-image"
                                                 data-url={this.props.laastras_e_logo_urls[3].service_url} />
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[2]}
                                        </p>
                                        <p>
                                            {this.props.laastras_sample_services[4]}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } // render 

    componentDidMount()
    {
        $('.brand-logo-image').on('click', (e) => {
            window.location = $(e.target).attr('data-url');
        });
        $('.brand-logo-image').on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        });

    } // componentDidMount

}

LaastrasIntroCapture.propTypes = {
    laastras_sample_services: PropTypes.array,
    laastras_e_logo_urls: PropTypes.array,
    job_offers_label: PropTypes.string,
    featured_job_offers: PropTypes.array,
    key_services_label: PropTypes.string
};

export default LaastrasIntroCapture