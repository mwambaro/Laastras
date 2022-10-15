import React from "react"
import PropTypes from "prop-types"

class LaastrasService extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div class="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}}>
                                {this.props.laastras_service_title}
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} className="text-center">
                                <img src={this.props.laastras_service_brand_image}
                                     className="img-fluid"/>
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

    } // componentDidMount
    
}

LaastrasService.propTypes = {
    laastras_service_title: PropTypes.string,
    laastras_service_brand_image: PropTypes.string,
    laastras_service_description: PropTypes.string,
    service_id: PropTypes.string
}

export default LaastrasService