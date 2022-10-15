import React from "react"
import PropTypes from "prop-types"

class LaastrasDonate extends React.Component 
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
                                {this.props.money_transfer_option_title}
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id={this.props.option_id}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        $(`#${this.props.option_id}`).append(
            this.props.money_transfer_option_description
        );

    } // componentDidMount

}

LaastrasDonate.propTypes = {
    money_transfer_option_title: PropTypes.string,
    money_transfer_option_description: PropTypes.string,
    option_id: PropTypes.string
}

export default LaastrasDonate