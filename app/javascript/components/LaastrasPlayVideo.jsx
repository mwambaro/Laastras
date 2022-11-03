import React from "react"
import PropTypes from "prop-types"

require("./AppUtilities");

class LaastrasPlayVideo extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            view_url: this.props.videos[0].view_url,
            mime_type: this.props.videos[0].mime_type,
            filename: this.props.videos[0].filename,
            current_index: 0, 
            play: false
        };
        
    } // constructor

    render()
    {
        // console.log('view-url: ' + this.state.view_url);

        return(
            <div className="container-fluid" id="videos-play-frame">
                <div>
                    <div className="shadow-sm p-1 mb-2 bg-white rounded justify-content-center" style={{backgroundColor: 'white'}}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="video-item-div d-flex flex-row justify-content-center" id="video-frame">
                                    <video className="embed-responsive video-item-main" controls={true}
                                            onLoadedData={(se) => this.onloadeddata(se)}
                                            onEnded={(se) => this.on_video_ended(se)}>
                                        <source src={this.state.view_url} 
                                            type={this.state.mime_type} 
                                            className="embed-responsive-item video-item" />
                                            {this.state.filename}
                                    </video>
                                </div>
                                <div id="arrows-div" 
                                    className="d-flex flex-row justify-content-center"
                                    style={{margin: '10px'}}>
                                    <div id="div-arrow-left" className="d-flex flex-row justify-content-center">
                                        <button type="button" id="arrow-left" className="btn btn-default arrow-left" onClick={(se) => this.on_arrow_clicked(se, 'arrow-left')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div id="div-arrow-right" className="d-flex flex-row justify-content-center">
                                        <button type="button" id="arrow-right" className="btn btn-default arrow-right" onClick={(se) => this.on_arrow_clicked(se, 'arrow-right')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div style={{
                                    backgroundColor: 'grey', 
                                    borderRadius: '10px',
                                    margin: '10px'
                                }} 
                                className="col-md-4" id="play-list">
                                    <ul style={{listStyle: 'none', padding: '5px'}}>
                                    {
                                        this.props.videos.map((video, idx) =>
                                            <li data-index={idx} key={`li-${idx}`} 
                                                style={{
                                                    color: this.state.current_index === idx ? 'blue' : 'black', 
                                                    padding: '5px',
                                                    fontWeight: 'bold'
                                                }}
                                                onClick={(se) => this.on_video_clicked(se)}
                                                onMouseOver={(se) => this.on_video_hovered(se)}>
                                                {video.filename}
                                            </li>
                                        )
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        $(document).center_in_view_port('videos-play-frame');
        this.fix_play_list_height();
        $(window).on('resize', (e) => {
            this.scale_video_item();
            $(document).center_in_view_port('videos-play-frame');
            this.fix_play_list_height();
        });

    } // componentDidMount

    componentDidUpdate()
    {
        $(document).center_in_view_port('videos-play-frame');
        this.fix_play_list_height();

    } // componentDidUpdate

    fix_play_list_height()
    {
        let height = $('#video-frame').height() + 
                        $('#arrows-div').height();
        $('#play-list').height(height);

    } // fix_play_list_height

    onloadeddata(e)
    {
        this.scale_video_item();   
        $(document).center_in_view_port('videos-play-frame');
        this.fix_play_list_height();  
        
        if(this.state.play)
        {
            $('.video-item-main').first().play();
        }

    } // onloadeddata

    scale_video_item()
    {
        let width = $('.video-item-div').first().width();
        if(width > 600)
        {
            width = 600;
        }

        $('.video-item-main').width(width);

    } // scale_video_item

    on_video_ended(e) 
    {
        if(this.state.current_index < (this.props.videos.length-1))
        {
            let index = this.state.current_index+1;
            this.setState({
                view_url: this.props.videos[index].view_url,
                mime_type: this.props.videos[index].mime_type,
                filename: this.props.videos[index].filename,
                current_index: index,
                play: true
            });
        }
        else 
        {
            let index = 0;
            this.setState({
                view_url: this.props.videos[index].view_url,
                mime_type: this.props.videos[index].mime_type,
                filename: this.props.videos[index].filename,
                current_index: index,
                play: true
            });
        }

    } // on_video_ended

    on_video_clicked(e)
    {
        let idx = $(e.target).attr('data-index');
        if(idx)
        {
            let index = parseInt(idx);
            this.setState({
                view_url: this.props.videos[index].view_url,
                mime_type: this.props.videos[index].mime_type,
                filename: this.props.videos[index].filename,
                current_index: index,
                play: true
            });
        }
        else 
        {
            console.log('We could not find any video index attribute');
        }

    } // on_video_clicked

    on_video_hovered(e)
    {
        e.target.style.cursor = 'pointer';

    } // on_video_hovered

    on_arrow_clicked(e, btn)
    {
        let left = false;
        if(/^arrow-left$/i.test(btn))
        {
            console.log('arrow left clicked.');
            left = true;
        }
        else 
        {
            console.log('arrow right clicked.');
        }

        if(left)
        {
            if(this.state.current_index > 0)
            {
                let index = this.state.current_index-1;
                this.setState({
                    view_url: this.props.videos[index].view_url,
                    mime_type: this.props.videos[index].mime_type,
                    filename: this.props.videos[index].filename,
                    current_index: index,
                    play: true
                });
            }
            else 
            {
                let index = this.props.videos.length-1;
                this.setState({
                    view_url: this.props.videos[index].view_url,
                    mime_type: this.props.videos[index].mime_type,
                    filename: this.props.videos[index].filename,
                    current_index: index,
                    play: true
                });
            }
        }
        else 
        {
            if(this.state.current_index < (this.props.videos.length-1))
            {
                let index = this.state.current_index+1;
                this.setState({
                    view_url: this.props.videos[index].view_url,
                    mime_type: this.props.videos[index].mime_type,
                    filename: this.props.videos[index].filename,
                    current_index: index,
                    play: true
                });
            }
            else 
            {
                let index = 0;
                this.setState({
                    view_url: this.props.videos[index].view_url,
                    mime_type: this.props.videos[index].mime_type,
                    filename: this.props.videos[index].filename,
                    current_index: index,
                    play: true
                });
            }
        }

    } // on_arrow_clicked

} // LaastrasPlayVideo

LaastrasPlayVideo.propTypes = {
    videos: PropTypes.array
};

export default LaastrasPlayVideo