import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

require("./CenterElement");

class Milestones extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        let styles = this.getCarouselMilestonesViewStyle();

        let carousel_indicators_style = {
            backgroundColor: 'black'
        }
        let carousel_control_button_style = {
            backgroundColor: 'black'
        }
        let carousel_milestone_image_description_style = {
            backgroundColor: 'white',
            fontWeight: 'bold',
            padding: '20px'
        }

        return(
            <div>
                <div id="milestones-view-div" style={styles === null ? "" : styles}>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators" style={carousel_indicators_style}>
                            {
                                this.props.carousel_milestones_image_data.map((image_data, idx) =>
                                    <button key={`carousel-milestones-indicator-${idx}`}
                                            type="button" 
                                            data-bs-target="#carouselExampleIndicators" 
                                            data-bs-slide-to={idx} 
                                            className={idx === 0 ? 'active' : ''} 
                                            aria-current={idx === 0 ? 'true' : 'false'}
                                            aria-label={`Slide ${idx+1}`}>
                                    </button>
                                )
                            }
                        </div>
                        <div className="carousel-inner">
                            { // Remember className="carousel-item active"
                                this.props.carousel_milestones_image_data.map((image_data, idx) =>
                                    <div key={`carousel-image-data-div-${idx}`} 
                                         className={idx === 0 ? 'carousel-item active' : 'carousel-item'}>
                                        <p id={`carousel-milestones-image-description-${idx}`}
                                           style={carousel_milestone_image_description_style}>
                                        </p>
                                        <img src={image_data.url} 
                                             className="d-block w-100 img-fluid" 
                                             id={`carousel-milestone-image-${idx}`}
                                             alt={`carousel milestone image ${idx+1}`}/>
                                    </div>
                                )
                            }
                        </div>
                    
                        <button style={carousel_control_button_style} 
                                className="carousel-control-prev" 
                                type="button" 
                                data-bs-target="#carouselExampleIndicators" 
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button style={carousel_control_button_style} 
                                className="carousel-control-next" 
                                type="button" 
                                data-bs-target="#carouselExampleIndicators" 
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    { 
        this.appendCarouselMilestonesViewImageDescription();
        
        var $this = this;
        window.addEventListener('resize', () => {
            let styles = $this.getCarouselMilestonesViewStyle();
            $('#milestones-view-div').css(styles);
        })

    } // componentDidMount

    getCarouselMilestonesViewStyle()
    {
        let styles = null;
        let height = ($(window).height()*1)/2;
        let width = ($(window).width()*2)/3;
        let parent = $('body');
        if(parent)
        {
            let position = parent.position();
            let sum = (parent.width() - width)/2;
            let left = position.left + sum;
            styles = {
                position: 'absolute',
                left: left,
                width: width,
                height: height
            }
        }

        return styles;

    } // getCarouselMilestonesViewStyle

    appendCarouselMilestonesViewImageDescription()
    {
        this.props.carousel_milestones_image_data.map((data, idx) => {
            let id = `carousel-milestones-image-description-${idx}`;
            $(`#${id}`).append(data.description);
        });

    } // appendCarouselMilestonesViewImageDescription

}

Milestones.propTypes = {
    carousel_milestones_image_data: PropTypes.array, // array of {url: '', description: '', detailed_description: ''} hashes
    carousel_section_title: PropTypes.string,
    click_or_tap_image_text: PropTypes.string
};

export default Milestones