import React from "react"
import PropTypes from "prop-types"
require("./CenterElement");

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
            padding: '5px'
        }

        return(
            <div style={block_style}>
                <div style={p_style}>
                    <p> <a href={`mailto:${this.props.hire_us_email}`}> {this.props.hire_us_contact_string} </a></p>
                </div>
                <div style={p_style}>
                    <div id="solutions_architect_div"></div>
                    <div className="hire_us_image_section" id="solutions_architect_img">
                        <img src={this.props.hire_us_solutions_architect_img_url}
                             className="img-fluid"
                             id="hire-us-solutions-architect-image" />
                    </div>
                </div>
                <div style={p_style}>
                    <p> <a href={`mailto:${this.props.hire_us_email}`}> {this.props.hire_us_contact_string} </a></p>
                </div>
                <div style={p_style}>
                    <div id="software_engineer_div"></div>
                    <div className="hire_us_image_section" id="software_engineer_img">
                        <img src={this.props.hire_us_software_engineer_img_url}
                             className="img-fluid"
                             id="hire-us-software-engineer-image" />
                    </div>
                </div>
                <div style={p_style}>
                    <p> <a href={`mailto:${this.props.hire_us_email}`}> {this.props.hire_us_contact_string} </a></p>
                </div>
                <div style={p_style}>
                    <div id="project_manager_div"></div>
                    <div className="hire_us_image_section" id="project_manager_img">
                        <img src={this.props.hire_us_project_manager_img_url}
                             className="img-fluid"
                             id="hire-us-project-manager-image" />
                    </div>
                </div>
                <div style={p_style}>
                    <p> <a href={`mailto:${this.props.hire_us_email}`}> {this.props.hire_us_contact_string} </a></p>
                </div>
                <div style={p_style}>
                    <div id="laas_leader_div"></div>
                    <div className="hire_us_image_section" id="laas_leader_img">
                        <img src={this.props.hire_us_laas_leader_img_url}
                             className="img-fluid"
                             id="hire-us-laas-leader-image" />
                    </div>
                </div>
                <div style={p_style}>
                    <p> <a href={`mailto:${this.props.hire_us_email}`}> {this.props.hire_us_contact_string} </a></p>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.setImageSectionSize();
        //$('#solutions_architect_div').css('font-size', '14px');
        $('#solutions_architect_div').append(this.props.hire_us_software_solutions_architect);
        $('#software_engineer_div').append(this.props.hire_us_cross_platform_software_engineer);
        $('#project_manager_div').append(this.props.hire_us_software_project_manager);
        $('#laas_leader_div').append(this.props.hire_us_laas_leader);
    }

    setImageSectionSize()
    {
        let maxH = (window.innerHeight*1)/4;
        $('hire_us_image_section').height(maxH);
        $('hire_us_image_section').width(maxH);
        $('hire_us_image_section').hcenter();
    }
}

HireOurWork.propTypes = {
    hire_us_software_solutions_architect: PropTypes.string,
    hire_us_cross_platform_software_engineer: PropTypes.string,
    hire_us_software_project_manager: PropTypes.string,
    hire_us_laas_leader: PropTypes.string,
    hire_us_contact_string: PropTypes.string,
    hire_us_email: PropTypes.string,
    hire_us_solutions_architect_img_url: PropTypes.string,
    hire_us_software_engineer_img_url: PropTypes.string,
    hire_us_project_manager_img_url: PropTypes.string,
    hire_us_laas_leader_img_url: PropTypes.string
};

export default HireOurWork;