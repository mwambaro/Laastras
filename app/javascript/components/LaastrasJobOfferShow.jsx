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
        let close_display_style = 'flex';
        let close_class = 'col-sm-3 d-flex flex-row justify-content-center';
        let feature_display_style = 'flex';
        let feature_class = 'col-sm-3 d-flex flex-row justify-content-center';
        let apply_display_style = 'flex';
        let apply_class = 'col-sm-3 d-flex flex-row justify-content-center';
        if(
            this.props.job_offer_actions.feature_label === null || 
            this.props.job_offer_actions.feature_label === ''
        ){
            feature_display_style = 'none';
            feature_class = '';
        }
        if(
            this.props.job_offer_actions.close_label === null || 
            this.props.job_offer_actions.close_label === ''
        ){
            close_display_style = 'none';
            close_class = '';
        }
        if(
            this.props.job_offer_actions.archived === 'true' &&
            this.props.job_offer_actions.admin === 'false'
        ){
            apply_display_style = 'none';
            apply_class = '';
        }

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
                            <div>
                                <div className="row justify-content-center">
                                    <div className={apply_class}>
                                        <button type="button" 
                                                className="btn btn-primary" 
                                                style={{padding: '5px', margin: '5px', display: apply_display_style}}
                                                onClick={(se) => this.apply_for_job_or_show_applicants(se)}>
                                            {this.props.job_offer_actions.apply_label}
                                        </button>
                                    </div>
                                    <div className={close_class}>
                                        <button type="button" 
                                                className="btn btn-primary" 
                                                style={{padding: '5px', margin: '5px', display: close_display_style}}
                                                onClick={(se) => this.close_or_archive_job(se)}
                                                id={this.props.html_ids.close_button_id}>
                                            {this.props.job_offer_actions.close_label}
                                        </button>
                                    </div>
                                    <div className={feature_class}>
                                        <button type="button" 
                                                className="btn btn-primary" 
                                                style={{padding: '5px', margin: '5px', display: feature_display_style}}
                                                onClick={(se) => this.feature_or_unfeature_job(se)}
                                                id={this.props.html_ids.feature_job_button_id}>
                                            {this.props.job_offer_actions.feature_label}
                                        </button>
                                    </div>
                                </div>
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

    } // componentDidMount

    apply_for_job_or_show_applicants(e)
    {
        window.location = this.props.job_offer_actions.application_url;

    } // apply_for_job_or_show_applicants

    close_or_archive_job(e)
    { 
        if(this.props.job_offer_actions.close_job_url)
        {
            window.location = this.props.job_offer_actions.close_job_url;
        }

    } // close_or_archive_job

    feature_or_unfeature_job(e)
    { 
        if(this.props.job_offer_actions.feature_job_url)
        {
            window.location = this.props.job_offer_actions.feature_job_url;
        }

    } // feature_or_unfeature_job

}

LaastrasJobOfferShow.propTypes = {
    job_offer_title: PropTypes.string,
    job_offer_actions: PropTypes.object, // {apply_label:, application_url:, close_label:, close_job_url:, feature_label:, feature_job_url:}
    apply_label: PropTypes.string,
    close_label: PropTypes.string,
    close_job_url: PropTypes.string,
    feature_label: PropTypes.string,
    feature_job_url: PropTypes.string,
    job_offer_description: PropTypes.string,
    application_url: PropTypes.string,
    html_ids: PropTypes.object // {offer_html_id:, offer_title_html_id:,}
}

export default LaastrasJobOfferShow