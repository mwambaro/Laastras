import React from "react"
import PropTypes from "prop-types"

class LaastrasVideoIndex extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            width: this.get_video_width()
        };
        $(window).on('resize', (e) => {
            this.setState({
                width: this.get_video_width()
            })
        });

    } // constructor

    render()
    {
        let width = this.state.width;

        console.log('video width: ' + width);

        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div style={{display: 'flex'}}>
                        {
                            this.props.videos.map ((video, idx) =>
                                <div key={`video-key-${idx}`} 
                                     className="video-item-frame" 
                                     width={width} 
                                     style={{margin: '10px'}}>
                                    <div className="video-item-div" width={width-5}>
                                        <video className="embed-responsive video-item-main text-center" 
                                               width={width-5} 
                                               data-show-url={video.show_url}
                                               controls={false}>
                                            <source src={video.view_url} 
                                                    type={video.mime_type} 
                                                    className="embed-responsive-item video-item"
                                                    width={width-5} />
                                                {video.filename}
                                        </video>
                                        <div className="text-center" width={width-8}>
                                            <a href={video.show_url} style={{textDecoration: 'none'}}>
                                                <span style={{}}>
                                                    {video.filename}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        $('.video-item-main').on('click', (e) => {
            let url = $(e.target).attr('data-show-url');
            window.location = url;
        }).on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        })

    } // componentDidMount

    get_video_width()
    {
        let width = $(window).width();
        if(width>1000)
        {
            width = Math.ceil(width/6);
        }
        else if(width>800)
        {
            width = Math.ceil(width/4);
        }
        else if(width>600)
        {
            width = Math.ceil(width/3);
        }
        else if(width>400)
        {
            width = Math.ceil(width/2);
        }
        else 
        { 
            width = 250;
        }
        
        return width;

    } // get_video_width

}

LaastrasVideoIndex.propTypes = {
    videos: PropTypes.object
}

export default LaastrasVideoIndex