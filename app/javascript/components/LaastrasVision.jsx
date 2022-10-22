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
        this.embed_video_teaser();

    } // componentDidMount

    embed_video_teaser()
    {
        let html = `
            <div style="padding: 10px" class="d-flex flex-row justify-content-center video-item-div">
                <video class="embed-responsive video-item-main" controls=true>
                    <source src="${this.props.laas_os_video_teaser.view_url}" 
                            type="${this.props.laas_os_video_teaser.mime_type}"
                            class="embed-responsive-item video-item" />
                        ${this.props.laas_os_video_teaser.filename}
                </video>
            </div>
        `;

        $(`#${this.props.laas_os_video_teaser.html_id}`).append(html);

        let width = $('.video-item-div').first().width();
        $('.video-item-main').width(width);
        $('.video-item').width(width);

    } // embed_video_teaser

}

LaastrasVision.propTypes = {
    laastras_vision_html: PropTypes.string,
    vision_title_inner_text: PropTypes.string,
    laas_os_video_teaser: PropTypes.object
};

export default LaastrasVision