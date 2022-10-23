import React from "react"
import PropTypes from "prop-types"

class LaastrasVision extends React.Component
{
    constructor(props)
    {
        super(props);

    }  // constructor

    render()
    {
        return(
            <div className="shadow-sm p-1 mb-2 bg-white rounded" 
                 style={{margin: '4px'}}>
                <div className="shadow-none p-1 mb-2 rounded" 
                     style={{backgroundColor: '#08f7ce'}}>
                    <span style={{fontSize: '24px', fontWeight: 'bold', color: 'white'}}> 
                        {this.props.vision_title_inner_text}
                    </span>
                </div>
                <div id="vision-body-text">
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        $('#vision-body-text').append(this.props.laastras_vision_html);
        $(window).on('resize', (e) => {
            this.scale_video_item();
        });

    } // componentDidMount

    scale_video_item()
    {
        let width = $('.video-item-div').first().width();

        let mwidth = $('.video-item-main').width();
        if(mwidth > width)
        {
            $('.video-item-main').width(width);
            $('.video-item').width(width);
        }

    } // scale_video_item

}

LaastrasVision.propTypes = {
    laastras_vision_html: PropTypes.string,
    vision_title_inner_text: PropTypes.string
};

export default LaastrasVision