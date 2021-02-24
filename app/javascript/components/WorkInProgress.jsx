import React from "react"
import PropTypes from "prop-types"

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
            fontSize: '28px', 
            fontWeight: 'bold'
        };

        return(
            <div>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="shadow-none p-1 mb-2 bg-light rounded">
                        <span style={section_title_style}> {this.props.work_in_progress_section_title} </span>
                    </div>
                    <div>
                        <p style={w_style}> {this.props.work_in_progress_description} </p>
                    </div>
                    <div className="text-center">
                        <a href={this.props.information_desk_url}> 
                            {this.props.information_desk_inner_text} 
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

WorkInProgress.propTypes = {
    work_in_progress_description: PropTypes.string,
    information_desk_url: PropTypes.string,
    information_desk_inner_text: PropTypes.string,
    work_in_progress_section_title: PropTypes.string
};

export default WorkInProgress;