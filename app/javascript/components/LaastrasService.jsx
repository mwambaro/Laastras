import React from "react"
import PropTypes from "prop-types"

class LaastrasService extends React.Component
{
    constructor(props)
    {
        super(props);
        this.rotation_degrees = 1;

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}} id={this.props.service_title_id}>
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} className="text-center" id="logo-image-square">
                                <img src={this.props.laastras_service_brand_image}
                                     className="img-fluid brand-logo-image"
                                     width="100"
                                     height="100" />
                            </div>
                            <div style={{padding: '10px'}} id={this.props.service_id}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        $(`#${this.props.service_id}`).append(
            this.props.laastras_service_description
        );
        $(`#${this.props.service_title_id}`).append(this.props.laastras_service_title);
        $('.service-marketing-image').on('load', (e) => {
            this.scale_service_marketing_image();
            window.onresize = (ee) => {
                console.log('window resized.');
                this.scale_service_marketing_image();
            };
        });
        setInterval(() => {
            this.rotation_degrees++;
            $('.brand-logo-image').css({
                "transform": `rotate(${this.rotation_degrees}deg)`,
                "-moz-transform": `rotate(${this.rotation_degrees}deg)`,
                "-webkit-transform": `rotate(${this.rotation_degrees}deg)`,
                "-o-transform": `rotate(${this.rotation_degrees}deg)`
            });
        }, 100);

    } // componentDidMount

    scale_service_marketing_image()
    {
        let c_width = $(`#${this.props.service_id}`).width();
        let s_width = $('.service-marketing-image').width();
        let width = s_width > c_width/2 ? (c_width/2) : s_width;
        console.log('c_width: ' + c_width + '; s_width: ' + s_width + '; width: ' + width);
        $('.service-marketing-image').width(width);

    } // scale_service_marketing_image
    
}

LaastrasService.propTypes = {
    laastras_service_title: PropTypes.string,
    laastras_service_brand_image: PropTypes.string,
    laastras_service_description: PropTypes.string,
    service_id: PropTypes.string,
    service_title_id: PropTypes.string
}

export default LaastrasService