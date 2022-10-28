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
        let min_width = 500;

        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-sm p-1 mb-2 bg-white rounded">
                            <div className="text-center" style={{padding: '2px', fontWeight: 'bold', color: 'blue'}}>
                                <a href={this.props.video.view_url} style={{textDecoration: 'none'}}>
                                    {this.props.video.filename}
                                </a>
                            </div>
                            <div className="text-center" style={{padding: '2px'}}>
                                <a href={this.props.video.download_url} style={{textDecoration: 'none'}}>
                                    {this.props.download_label}
                                </a>
                            </div>
                            <hr />
                            <div style={{padding: '2px'}} className="d-flex flex-row justify-content-center video-item-div">
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
        if(typeof(this.props.video_width) != 'undefined' && this.props.video_width != '')
        {
            width = parseInt(this.props.video_width);
        }

        //console.log('video width: ' + width);

        let mwidth = $('.video-item-main').width();
        if(true)
        {
            $('.video-item-main').width(width);
            $('.video-item').width(width);
        }

    } // scale_video_item

}

LaastrasVideoShow.propTypes = {
    video: PropTypes.object,
    video_width: PropTypes.string,
    download_label: PropTypes.string
}

export default LaastrasVideoShow