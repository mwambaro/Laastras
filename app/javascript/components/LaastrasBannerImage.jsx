
import React from "react" 
import PropTypes from "prop-types"

class LaastrasBannerImage extends React.Component 
{
    constructor(props)
    {
        super(props);

    } // constructor 

    render()
    {
        return(
            <div className="container-fluid" style={{backgroundColor: 'white'}} id="banner-container">
                <div className="text-center">
                    <img src={this.props.laastras_banner_image} className="img-fluid banner-image" id="banner-image-img"/>
                </div>
                <hr style={{fontWeight: 'bold', color: 'rgb(192,0,0)', margin: '1px', height: '5px'}} />
            </div>
        );

    } // render

    componentDidMount()
    {
        $('.banner-image').on('click', (e) => {
            if(this.props.fire_pitch_message_event)
            {
                this.props.fire_pitch_message_event(
                    this.props.event_name, 'banner-container'
                );
            }
        }).on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        });

        window.addEventListener('resize', (e) => {
            this.props.switch_banners_event([
                'banner-image-img'
            ]);
        });

    } // componentDidMount

}

LaastrasBannerImage.propTypes = {
    event_name: PropTypes.string,
    fire_pitch_message_event: PropTypes.func, // callback
    switch_banners_event: PropTypes.func, // callback
    laastras_banner_image: PropTypes.string
};

export default LaastrasBannerImage