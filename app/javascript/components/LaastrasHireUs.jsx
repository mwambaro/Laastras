import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class LaastrasHireUs extends React.Component
{
    constructor(props)
    {
        super(props);
        this.expertiseDetailsSectionModal = null;

    } // constructor

    render()
    {
        let expertise_item_style = {
            padding: '5px',
            color: 'blue'
        };

        return(
            <div className="container-fluid">
                <div id="expertise-details-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-right">
                                <button type="button" className="close" aria-label="Close"
                                        onClick={(se) => this.leaveExpertiseDetails(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="expertise-details-body">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.leaveExpertiseDetails(se)}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-sm p-1 mb-2 bg-body rounded">
                            <p style={{padding: '5px'}} id="expertise-capture">
                            </p>
                            <ul>
                                <li style={expertise_item_style}
                                    id="software-engineering"
                                    className="expertise-field"> 
                                    {this.props.expertise_fields.software_engineering_expertise}
                                </li>
                                <li style={expertise_item_style}
                                    id="business-ideation"
                                    className="expertise-field"> 
                                    {this.props.expertise_fields.business_ideation_expertise}
                                </li>
                                <li style={expertise_item_style}
                                    id="policy-making"
                                    className="expertise-field"> 
                                    {this.props.expertise_fields.policy_making_expertise} 
                                </li>
                                <li style={expertise_item_style}
                                    id="tech-evangelization"
                                    className="expertise-field"> 
                                    {this.props.expertise_fields.tech_evangelization_expertise}
                                </li>
                            </ul>
                        </div>
                        <div className="shadow-sm p-1 mb-2 bg-body rounded">
                            <div style={{
                                    marginTop: '10px', 
                                    marginBottom: '10px',
                                    color: '#1b6b07', 
                                    fontSize: '25px', 
                                    fontWeigt: 'bold'
                            }}>
                                {this.props.detailed_cv.cv_title}
                            </div>
                            <div id="detailed-cv-data"></div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        this.expertiseDetailsSectionModal = new Modal(
            document.getElementById('expertise-details-section')
        );
        $('#expertise-capture').append(
            `${this.props.expertise_fields.expertise_capture}:`
        );
        $('.expertise-field').on('click', (e) => {
            this.expertiseFieldClicked(e);
        })
        .on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        });
        $('#detailed-cv-data').append(
            this.props.detailed_cv.detailed_cv_data
        );

    } // componentDidMount

    leaveExpertiseDetails(e)
    {
        this.expertiseDetailsSectionModal.hide();
        $('#expertise-details-body-content').remove();

    } // leaveExpertiseDetails

    expertiseFieldClicked(e)
    {
        let id = e.target.id;

        console.log('expertise field id: ' + id);

        if(id === 'software-engineering')
        {
            let html = `
                <div id="expertise-details-body-content">
                    ${this.props.expertise_details.software_engineering_expertise_details}
                </div>
            `;
            $('#expertise-details-body').append(html);
        }
        else if(id === 'business-ideation')
        {
            let html = `
                <div id="expertise-details-body-content">
                    ${this.props.expertise_details.business_ideation_expertise_details}
                </div>
            `;
            $('#expertise-details-body').append(html);
        }
        else if(id === 'policy-making')
        {
            let html = `
                <div id="expertise-details-body-content">
                    ${this.props.expertise_details.policy_making_expertise_details}
                </div>
            `;
            $('#expertise-details-body').append(html);
        }
        else if(id === 'tech-evangelization')
        {
            let html = `
                <div id="expertise-details-body-content">
                    ${this.props.expertise_details.tech_evangelization_expertise_details}
                </div>
            `;
            $('#expertise-details-body').append(html);
        }

        this.expertiseDetailsSectionModal.show();

    } // expertiseFieldClicked
}

LaastrasHireUs.propTypes = {
    expertise_fields: PropTypes.object,
    expertise_details: PropTypes.object,
    detailed_cv: PropTypes.object
}

export default LaastrasHireUs