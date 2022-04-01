import React from "react"
import PropTypes from "prop-types"

require("./CenterElement");

class WorkInProgress extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let w_style = {
            fontSize: '20px'
        };

        let section_title_style = {
            fontSize: '24px', 
            fontWeight: 'bold'
        };

        let work_title_div_style = {
            backgroundColor: '#82f38f'
        };

        return(
            <div id="work-in-progress-container">
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="shadow-none p-1 mb-2 rounded"
                         style={work_title_div_style}>
                        <span style={section_title_style}> {this.props.work_in_progress_section_title} </span>
                    </div>
                    <div>
                        <p className="text-justify" style={w_style}> {this.props.work_in_progress_description} </p>
                    </div>
                    <div className="text-center">
                        <div className="row">
                            <div className="col-sm-6 text-sm-right p-5">
                                <a href={this.props.founder_and_ceo_contact_url}>
                                    {this.props.founder_and_ceo_contact_inner_text}
                                </a>
                            </div>
                            <div className="col-sm-6 text-sm-left p-5">
                                <a href={this.props.information_desk_url}> 
                                    {this.props.information_desk_inner_text} 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        //$('#work-in-progress-container').hvcenter();
    }
}

WorkInProgress.propTypes = {
    work_in_progress_description: PropTypes.string,
    information_desk_url: PropTypes.string,
    information_desk_inner_text: PropTypes.string,
    work_in_progress_section_title: PropTypes.string,
    founder_and_ceo_contact_url: PropTypes.string,
    founder_and_ceo_contact_inner_text: PropTypes.string
};

export default WorkInProgress;