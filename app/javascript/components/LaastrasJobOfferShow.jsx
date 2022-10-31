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
                        <div className="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}}
                                 id={this.props.html_ids.offer_title_html_id}>
                                {this.props.job_offer_title}
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id={this.props.html_ids.offer_html_id}>
                            </div>
                            <div className="d-flex flex-row justify-content-center">
                                <button type="button" 
                                        className="btn btn-primary" 
                                        style={{padding: '10px'}}
                                        onClick={(se) => this.apply_for_job(se)}>
                                    {this.props.apply_label}
                                </button>
                                <button type="button" 
                                        className="btn btn-primary" 
                                        style={{padding: '10px', marginLeft: '10px', display: 'none'}}
                                        onClick={(se) => this.close_job(se)}
                                        id={this.props.html_ids.close_button_id}>
                                    {this.props.close_label}
                                </button>
                                <button type="button" 
                                        className="btn btn-primary" 
                                        style={{padding: '10px', marginLeft: '10px', display: 'none'}}
                                        onClick={(se) => this.feature_job(se)}
                                        id={this.props.html_ids.feature_job_button_id}>
                                    {this.props.feature_labels.feature_label}
                                </button>
                                <button type="button" 
                                        className="btn btn-primary" 
                                        style={{padding: '10px', marginLeft: '10px', display: 'none'}}
                                        onClick={(se) => this.unfeature_job(se)}
                                        id={this.props.html_ids.unfeature_job_button_id}>
                                    {this.props.feature_labels.unfeature_label}
                                </button>
                                <button type="button" 
                                        className="btn btn-primary" 
                                        style={{padding: '10px', marginLeft: '10px', display: 'none'}}
                                        onClick={(se) => this.archive_job(se)}
                                        id={this.props.html_ids.archive_job_button_id}>
                                    {this.props.feature_labels.archive_label}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        $(`#${this.props.html_ids.offer_html_id}`).append(this.props.job_offer_description);
        if(this.props.close_label != null && this.props.close_label != '')
        {
            $(`#${this.props.html_ids.close_button_id}`).css({display: 'block'});
        }
        if(this.props.feature_labels.feature_label != null && this.props.feature_labels.feature_label != '')
        {
            $(`#${this.props.html_ids.feature_job_button_id}`).css({display: 'block'});
        }
        if(this.props.feature_labels.unfeature_label != null && this.props.feature_labels.unfeature_label != '')
        {
            $(`#${this.props.html_ids.unfeature_job_button_id}`).css({display: 'block'});
        }
        if(this.props.feature_labels.archive_label != null && this.props.feature_labels.archive_label != '')
        {
            $(`#${this.props.html_ids.archive_job_button_id}`).css({display: 'block'});
        }

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

    feature_job(e)
    { 
        if(this.props.feature_job_url)
        {
            window.location = this.props.feature_job_url;
        }

    } // feature_job

    unfeature_job(e)
    { 
        if(this.props.unfeature_job_url)
        {
            window.location = this.props.unfeature_job_url;
        }

    } // feature_job

    archive_job(e)
    { 
        if(this.props.archive_job_url)
        {
            window.location = this.props.archive_job_url;
        }

    } // archive_job

}

LaastrasJobOfferShow.propTypes = {
    job_offer_title: PropTypes.string,
    apply_label: PropTypes.string,
    close_label: PropTypes.string,
    close_job_url: PropTypes.string,
    feature_labels: PropTypes.object, // {feature_label:, unfeature_label:, archive_label:}
    feature_job_url: PropTypes.string,
    unfeature_job_url: PropTypes.string,
    job_offer_description: PropTypes.string,
    application_url: PropTypes.string,
    html_ids: PropTypes.object // {offer_html_id:, offer_title_html_id:,}
}

export default LaastrasJobOfferShow