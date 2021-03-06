import React from "react"
import PropTypes from "prop-types"

class LaastrasVision extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let outer_box_style = {
            margin: '4px'
        };

        let title_style_div = {
            backgroundColor: '#08f7ce'
        };

        let title_text_style = {
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: 'white'
        };

        let box_body_style_div = {
            padding: '3px'
        };

        return(
            <div className="shadow-sm p-1 mb-2 bg-white rounded" 
                 style={outer_box_style}>
                <div className="shadow-none p-1 mb-2 rounded" 
                     style={title_style_div}>
                    <span style={title_text_style}> 
                        {this.props.vision_title_inner_text}
                    </span>
                </div>
                <div style={box_body_style_div}>
                    <p id="box-body-text-p">          
                    </p>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        $('#box-body-text-p').append(this.props.laastras_vision_html);
    }
}

LaastrasVision.propTypes = {
    laastras_vision_html: PropTypes.string,
    vision_title_inner_text: PropTypes.string
};

export default LaastrasVision