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
                    <div className="col-md-8 shadow p-3 mb-5 bg-body rounded">
                        <div className="justify-content-center">
                            <img src={this.props.profile_photo_url} 
                                className="img-fluid"
                                style={{
                                    height: '250px',
                                    width: '250px',
                                    borderRadius: '50%',
                                    display: 'inline-block'
                                }}
                            />
                        </div>
                        <hr/>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <a href={this.props.job_offer_description_url}>
                                                {this.props.job_offer_title_label}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.props.full_name_label}
                                            <br/>
                                            {`${this.props.laastras_user.first_name} ${this.props.laastras_user.last_name}`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.props.email_label}
                                            <br/>
                                            {this.props.laastras_user.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.props.phone_number_label}
                                            <br/>
                                            {this.props.laastras_jsker.phone_number}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {this.props.location_label}
                                            <br/>
                                            {this.props.laastras_jsker.location}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href={this.props.cv_url}>
                                                {this.props.cv_label}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href={this.props.cover_letter_url}>
                                                {this.props.cover_letter_label}
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );

    } // render

}

LaastrasJobSeekerShow.propTypes = {
    profile_photo_url: PropTypes.string,
    job_offer_description_url: PropTypes.string,
    job_offer_title_label: PropTypes.string,
    full_name_label: PropTypes.string,
    laastras_user: PropTypes.object,
    phone_number_label: PropTypes.string,
    laastras_jsker: PropTypes.object,
    location_label: PropTypes.string,
    cv_url: PropTypes.string,
    cv_label: PropTypes.string,
    cover_letter_url: PropTypes.string,
    cover_letter_label: PropTypes.string
}

export default LaastrasJobSeekerShow;