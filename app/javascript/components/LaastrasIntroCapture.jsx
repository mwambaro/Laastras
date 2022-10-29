import React from "react"
import PropTypes from "prop-types"

require("./MobileDevices");

class LaastrasIntroCapture extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let ftd_job_style = {};
        let ftd_job_display = {
            display: 'block'
        };
        let device = $(window).isMobile();
        if(device)
        {
            ftd_job_style = {
                padding: '5px'
            }
        }
        if(this.props.featured_job_offers.length === 0)
        {
            ftd_job_display = {
                display: 'none'
            };
        }

        return(
            
                <div className="shadow-sm p-1 mb-2 bg-white rounded" id="intro-capture-component">
                    <div>
                        <div style={ftd_job_display}>
                            <p><strong>{this.props.job_offers_label}</strong>:</p>
                            <div>
                                <ol>
                                    {
                                        this.props.featured_job_offers.map((job_offer, idx) => 
                                            <li key={`job-offer-${idx}`} style={ftd_job_style}>
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
                            <p><strong>{this.props.key_services_label}</strong>:</p>
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