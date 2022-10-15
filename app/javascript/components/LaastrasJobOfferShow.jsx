import React from "react"
import PropTypes from "prop-types"

class LaastrasJobOfferShow extends React.Component
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
                                {this.props.job_offer_title}
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id="job-offer-id">
                            </div>
                            <div className="d-flex flex-row justify-content-center">
                                <button type="button" 
                                        className="btn btn-primary" 
                                        style={{padding: '10px'}}
                                        onClick={(se) => this.apply_for_job(se)}>
                                    {this.props.apply_label}
                                </button>
                                {
                                    this.props.close_label != null ? 
                                    (
                                        <button type="button" 
                                                className="btn btn-primary" 
                                                style={{padding: '10px', marginLeft: '10px'}}
                                                onClick={(se) => this.close_job(se)}>
                                            {this.props.close_label}
                                        </button>
                                    ):
                                    (
                                        <div></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        $('#job-offer-id').append(this.props.job_offer_description);

    } // componentDidMount

    apply_for_job(e)
    {
        window.location = this.props.application_url;

    } // apply_for_job

    close_job(e)
    { 
        if(this.props.close_job_url)
        {
            window.location = this.props.close_job_url;
        }

    } // close_job

}

LaastrasJobOfferShow.propTypes = {
    job_offer_title: PropTypes.string,
    apply_label: PropTypes.string,
    close_label: PropTypes.string,
    close_job_url: PropTypes.string,
    job_offer_description: PropTypes.string,
    application_url: PropTypes.string
}

export default LaastrasJobOfferShow