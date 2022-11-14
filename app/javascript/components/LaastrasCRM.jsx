import React from "react"
import PropTypes from "prop-types"

class LaastrasCRM extends React.Component
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
                    <div className="col-md-10">
                        <div className="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}} id={this.props.service_title_id}>
                            </div>
                            <hr />
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
            this.props.laastras_crm_description
        );
        $(`#${this.props.service_title_id}`).append(this.props.laastras_crm_title);

    } // componentDidMount
    
}

LaastrasCRM.propTypes = {
    laastras_crm_title: PropTypes.string,
    laastras_crm_description: PropTypes.string,
    service_id: PropTypes.string,
    service_title_id: PropTypes.string
}

export default LaastrasCRM