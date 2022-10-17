import React from "react"
import PropTypes from "prop-types"

class LaastrasVideoShow extends React.Component 
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
                    <div className="col-md-8">
                        <div class="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}}>
                                {this.props.video.filename}
                            </div>
                            <div style={{padding: '10px'}}>
                                <a href={this.props.video.download_url} style={{textDecoration: 'none'}}>
                                    {this.props.download_label}
                                </a>
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} className="d-flex flex-row justify-content-center video-item-div">
                                <video className="embed-responsive video-item-main" controls={true}>
                                    <source src={this.props.video.view_url} 
                                            type={this.props.video.mime_type} 
                                            className="embed-responsive-item video-item" />
                                    {this.props.video.filename}
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        this.scale_video_item();
        $(window).on('resize', (e) => {
            this.scale_video_item();
        });

    } // componentDidMount

    scale_video_item()
    {
        let width = $('.video-item-div').first().width();
        $('.video-item-main').width(width);
        $('.video-item').width(width);

    } // scale_video_item

}

LaastrasVideoShow.propTypes = {
    video: PropTypes.object,
    download_label: PropTypes.string
}

export default LaastrasVideoShow