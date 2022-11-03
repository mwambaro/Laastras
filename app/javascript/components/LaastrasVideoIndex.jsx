import React from "react"
import PropTypes from "prop-types"
import LaastrasVideoShow from "./LaastrasVideoShow"

class LaastrasVideoIndex extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.filename_class = 'video-filename';
        this.next = 0;

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button type="button" 
                        className="btn btn-primary" 
                        style={{padding: '10px', margin: '10px'}}
                        onClick={(se) => this.start_play_video(se)}>
                            {this.props.play_all_label}
                    </button>
                </div>
                <div className="row" style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.props.videos.map ((video, idx) =>
                            <div key={`video-key-${idx}`} className="col-md-4">
                                <LaastrasVideoShow 
                                    video={video}
                                    video_width={null}
                                    filename_class={this.filename_class}
                                    download_label={this.props.download_label} />
                            </div>
                        )
                    }
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        this.video_filename_sizes();
        $(window).on('resize', (e) => {
            this.video_filename_sizes();
        });

    } // componentDidMount

    video_filename_sizes()
    {
        let height = 0;
        $.each($(`.${this.filename_class}`), (idx, value) => {
            let h = $(value).height();
            if(h > height)
            {
                height = h;
            }
        });
        if(height)
        {
            $(`.${this.filename_class}`).height(height);
        }

    } // video_filename_sizes

    start_play_video(e)
    {
        window.location = this.props.play_videos_url;

    } // start_play_video

}

LaastrasVideoIndex.propTypes = {
    videos: PropTypes.array,
    download_label: PropTypes.string,
    play_all_label: PropTypes.string,
    play_videos_url: PropTypes.string
}

export default LaastrasVideoIndex