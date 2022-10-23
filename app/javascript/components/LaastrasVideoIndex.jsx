import React from "react"
import PropTypes from "prop-types"
import LaastrasVideoShow from "./LaastrasVideoShow"

class LaastrasVideoIndex extends React.Component 
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row" style={{display: 'flex', justifyContent: 'center'}}>
                    {
                        this.props.videos.map ((video, idx) =>
                            <div key={`video-key-${idx}`} className="col-md-3">
                                <LaastrasVideoShow 
                                    video={video}
                                    video_width={null}
                                    download_label={this.props.download_label} />
                            </div>
                        )
                    }
                </div>
            </div>
        );

    } // render

}

LaastrasVideoIndex.propTypes = {
    videos: PropTypes.object,
    download_label: PropTypes.string
}

export default LaastrasVideoIndex