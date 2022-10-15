import React from "react"
import PropTypes from "prop-types"

class LaastrasContactInformation extends React.Component 
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
                                {this.props.contact_information_title}
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id="contact-info-text">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        $('#contact-info-text').append(
            this.props.contact_information_text
        );

    } // componentDidMount

}

LaastrasContactInformation.propTypes = {
    contact_information_title: PropTypes.string,
    contact_information_text: PropTypes.string
}

export default LaastrasContactInformation