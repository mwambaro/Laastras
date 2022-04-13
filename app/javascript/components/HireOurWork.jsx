import React from "react"
import PropTypes from "prop-types"

class HireOurWork extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let block_style = {
            backgroundColor: 'white',
            padding: '10px'
        };
        let p_style = {
            padding: '5px',
            fontSize: '22px'
        }

        return(
            <div style={block_style}>
                <div style={p_style}>
                    <p> <a href={`mailto:${this.props.hire_us_email}`}> {this.props.hire_us_contact_string} </a></p>
                </div>
                <div id="solutions_architect_div" style={p_style}>
                </div>
                <div id="software_engineer_div" style={p_style}>
                </div>
                <div id="project_manager_div" style={p_style}>
                </div>
                <div id="laas_leader_div" style={p_style}>
                </div>
                <div style={p_style}>
                    <p> <a href={`mailto:${this.props.hire_us_email}`}> {this.props.hire_us_contact_string} </a></p>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        $('#solutions_architect_div').append(this.props.hire_us_software_solutions_architect);
        $('#software_engineer_div').append(this.props.hire_us_cross_platform_software_engineer);
        $('#project_manager_div').append(this.props.hire_us_software_project_manager);
        $('#laas_leader_div').append(this.props.hire_us_laas_leader);
    }
}

HireOurWork.propTypes = {
    hire_us_software_solutions_architect: PropTypes.string,
    hire_us_cross_platform_software_engineer: PropTypes.string,
    hire_us_software_project_manager: PropTypes.string,
    hire_us_laas_leader: PropTypes.string,
    hire_us_contact_string: PropTypes.string,
    hire_us_email: PropTypes.string
};

export default HireOurWork;