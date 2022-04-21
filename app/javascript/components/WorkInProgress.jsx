import React from "react"
import PropTypes from "prop-types"
import ToggleNavigationBar from "./ToggleNavigationBar"

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

        let text_style = {
            whiteSpace: 'nowrap'
        };

        let div_flex_style = {
            backgroundColor: 'white',
            margin: '5px'
        };

        return(
            <div id="work-in-progress-container">
                <ToggleNavigationBar laastras_actions={this.props.laastras_actions}
                                     logo_image_url={this.props.logo_image_url}
                                     supported_languages={this.props.supported_languages}
                                     locale_end_point={this.props.locale_end_point}
                                     social_media_data={this.props.social_media_data}/>
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
    founder_and_ceo_contact_inner_text: PropTypes.string,
    laastras_actions: PropTypes.array, // array of {url: '', inner_text: '', dropdown_boolean: '', data: ''} hashes
    logo_image_url: PropTypes.string,
    supported_languages: PropTypes.array, // array of {locale: '',  language: '', country: ''} hashes 
    locale_end_point: PropTypes.string,
    social_media_data: PropTypes.object
};

export default WorkInProgress;