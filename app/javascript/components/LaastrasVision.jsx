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
            <div className="row justify-content-center">
                <div className="col-md-11" style={{marginTop: '5px', marginBottom: '5px'}}>
                    <div className="shadow-sm p-1 mb-2 bg-white rounded" style={{margin: '4px'}}>
                        <div>
                            <span style={{fontSize: '24px', fontWeight: 'bold'}}> 
                                    {this.props.vision_title_inner_text}
                            </span>
                        </div>
                        <hr/>
                        <div id="vision-body-text" style={{padding: '5px'}}>
                        </div>
                    </div>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        $('#vision-body-text').append(this.props.laastras_vision_html);
        $('.video-item-main').on('loadeddata', (e) => {
            this.scale_video_item();
        });
        $(window).on('resize', (e) => {
            this.scale_video_item();
        });

    } // componentDidMount

    can_we_scale_video_item()
    {
        let timer = setTimeout((e)=>{
            for(;;)
            {
                let video = document.getElementsByClassName('video-item-div');
                if(video.length > 0)
                {
                    this.scale_video_item();
                    console.log('Exiting video scaling loop ...');
                    break;
                }
            }
        }, 500);

        return timer;

    } // can_we_scale_video_item

    scale_video_item()
    {
        let width = $('.video-item-div').width();
        if(width > 600)
        {
            width = 600;
        }
        //console.log('video width: ' + width);

        $('.video-item-main').width(width);
        $('.video-item').width(width);

    } // scale_video_item

}

LaastrasVision.propTypes = {
    laastras_vision_html: PropTypes.string,
    vision_title_inner_text: PropTypes.string
};

export default LaastrasVision