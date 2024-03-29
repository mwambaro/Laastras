import React from "react"
import PropTypes from "prop-types"

class LaastrasJobSeekerShow extends React.Component
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
                        <div className="shadow-sm p-3 mb-5 bg-body rounded" id={this.props.job_seeker_html_id}>
                            <div className="justify-content-center">
                                <div style={{padding: '10px'}}>
                                    <img src={this.props.profile_photo_url} 
                                        className="img-fluid"
                                        style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '50%',
                                            display: 'inline-block'
                                        }}
                                    />
                                </div>
                                <div style={{padding: '10px'}}>
                                    <strong>{this.props.evaluator.status_label}:</strong>
                                    <span style={{color: 'green', fontWeight: 'bold'}}>
                                        {` ${this.props.evaluator.status}`}
                                    </span>
                                </div>
                            </div>
                            <hr/>
                            <div>
                                <div style={{padding: '10px', backgroundColor: '#faf5f5'}}>
                                    <a href={this.props.job_offer_description_url} style={{textDecoration: 'none'}}>
                                        {this.props.job_offer_title_label}
                                    </a>
                                </div>
                                <div style={{padding: '10px'}}>
                                    <div><strong>{this.props.full_name_label}:</strong></div>
                                    <div>
                                        {`${this.props.laastras_user.first_name} ${this.props.laastras_user.last_name}`}
                                    </div>
                                </div>
                                <div style={{padding: '10px', backgroundColor: '#faf5f5'}}>
                                    <div><strong>{this.props.email_label}:</strong></div>
                                    <div>
                                        <a href={`mailto:${this.props.laastras_user.email}`} style={{textDecoration: 'none'}}>
                                            {this.props.laastras_user.email}
                                        </a>
                                    </div>
                                </div>
                                <div style={{padding: '10px'}}>
                                    <div><strong>{this.props.phone_number_label}:</strong></div>
                                    <div>
                                        {this.props.laastras_jsker.phone_number}
                                    </div>
                                </div>
                                <div style={{padding: '10px', backgroundColor: '#faf5f5'}}>
                                    <div><strong>{this.props.location_label}:</strong></div>
                                    <div>{this.props.laastras_jsker.location}</div>
                                </div>
                                <div style={{padding: '10px'}}>
                                    <a href={this.props.cv_url} style={{textDecoration: 'none'}}>
                                        {this.props.cv_label}
                                    </a>
                                </div>
                                <div style={{padding: '10px', backgroundColor: '#faf5f5'}}>
                                    <a href={this.props.cover_letter_url} style={{textDecoration: 'none'}}>
                                        {this.props.cover_letter_label}
                                    </a>
                                </div>
                            </div>
                            {
                                this.props.evaluator.evaluated === false ?
                                (
                                    <div className="d-flex flex-row justify-content-center" id="evaluator-btn-div">
                                        <button type="button" 
                                                className="btn btn-primary" 
                                                style={{margin: '10px'}}
                                                onClick={(se) => this.select_job_seeker(se)}>
                                            {this.props.evaluator.select_label}
                                        </button>
                                        <button type="button" 
                                                className="btn btn-primary" 
                                                style={{margin: '10px'}}
                                                onClick={(se) => this.reject_job_seeker(se)}>
                                            {this.props.evaluator.reject_label}
                                        </button>
                                    </div>
                                ): 
                                (<div></div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {} // componentDidMount

    select_job_seeker(e)
    { 
        window.location = this.props.evaluator.select_url;

    } // select_job_seeker 

    reject_job_seeker(e)
    {
        window.location = this.props.evaluator.reject_url;

    } // reject_job_seeker

}

LaastrasJobSeekerShow.propTypes = {
    profile_photo_url: PropTypes.string,
    job_offer_description_url: PropTypes.string,
    job_offer_title_label: PropTypes.string,
    email_label: PropTypes.string,
    full_name_label: PropTypes.string,
    laastras_user: PropTypes.object,
    phone_number_label: PropTypes.string,
    laastras_jsker: PropTypes.object,
    location_label: PropTypes.string,
    cv_url: PropTypes.string,
    cv_label: PropTypes.string,
    cover_letter_url: PropTypes.string,
    cover_letter_label: PropTypes.string,
    job_seeker_html_id: PropTypes.string,
    evaluator: PropTypes.object
}

export default LaastrasJobSeekerShow;