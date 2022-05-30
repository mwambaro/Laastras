import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

require("./CenterElement");
require("./MobileDevices")

/// <summary>
///     It sets in motion a carousel of images along with their description text. Since the text
///     is put above the image. It should not be too long to push the image outside the viewport.
/// </summary>
/// <details>
///     To avoid seeing subsequent elements' positions getting messed up, we assume that this component
///     is a direct child of the outermost parent, which is 'body'. The positions of elements in the 
///     document can then be guaranteed, at best. Otherwise, the behavior of elements gets unpredictable.
///     If you have a lengthy description, put it in 'detailed_description' and keep a short description 
///     in 'description' text to be put above its corresponding image. 'detailed_description' might be
///     supported in the subsequent versions of this react component.
/// </details>
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
        let dummy_div_style = {
            backgroundColor: 'white',
            fontWeight: 'bold',
            padding: '10px',
            margin: '5px'
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
                                        <p id={`carousel-milestone-image-description-${idx}`}
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
                <div style={dummy_div_style}>
                    <p> 
                        Where does this one go since it is sibling to the carousel?
                        Does it shift vertical position and penetrate the carousel area?
                        We need to research on the reason why this happens.
                    </p>
                </div>
                <div style={dummy_div_style}>
                    <p> 
                        Where does this one go since it is sibling to the carousel?
                        Does it shift vertical position and penetrate the carousel area?
                        We need to research on the reason why this happens.
                    </p>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    { 
        var carouselComponentId = 'milestones-view-div';
        var actualCarouselComponentId = 'carouselExampleIndicators';
        this.appendCarouselMilestonesViewImageDescription();
        this.verticallyRepositioningNextSiblings(carouselComponentId, null);
        
        var $this = this;
        window.addEventListener('resize', e => {
            let styles = $this.getCarouselMilestonesViewStyle();
            $('#milestones-view-div').css(styles);
            //console.log('window container resized.');
        })
        let carousel = document.getElementById(actualCarouselComponentId);
        if(carousel)
        {
            carousel.addEventListener('slide.bs.carousel', (event) =>{
                $this.verticallyRepositioningNextSiblings(carouselComponentId, event);
                //console.log('carousel container transitioned.');
            });
        }

    } // componentDidMount

    getCarouselMilestonesViewStyle()
    {
        let styles = null;
        let height = ($(window).height()*3)/4;
        let width = ($(window).width()*2)/3;
        if($(window).isMobile())
        {
            width = ($(window).width()*11)/12;
        }
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
            let id = `carousel-milestone-image-description-${idx}`;
            $(`#${id}`).append(data.description);
        });

    } // appendCarouselMilestonesViewImageDescription

    verticallyRepositioningNextSiblings(carouselComponentId, carouselEvent)
    {
        let selector = $(`#${carouselComponentId}`);
        if(!selector)
        {
            return;
        }
        let nextSiblings = selector.nextAll();
        if(!nextSiblings)
        {
            return;
        }
        if(nextSiblings.length === 0)
        {
            return;
        }

        let top = selector.position().top;
        let paddings = parseInt(selector.css('padding-left').replace("px", "")) + 
                       parseInt(selector.css('padding-right').replace("px", "")) + 
                       parseInt(selector.css('padding-top').replace("px", "")) +
                       parseInt(selector.css('padding-bottom').replace("px", ""));
        let margins = parseInt(selector.css("margin-top").replace("px", "")) + 
                      parseInt(selector.css("margin-bottom").replace("px", "")) +
                      parseInt(selector.css("margin-left").replace("px", "")) +
                      parseInt(selector.css("margin-right").replace("px", ""));
        
        // use carousel container
        let carouselHeight = selector.height();
        //console.log("selector: " + carouselHeight);
        // use image and text
        try 
        {
            let target = carouselEvent.relatedTarget;
            if(target != 'undefined')
            {
                let h = $(target).height();
                if(h != 'undefined')
                {
                    carouselHeight = h;
                    //console.log("Image and text: " + h);
                }
            }
        }
        catch(error)
        {}
        
        $.each(nextSiblings, (idx, value) => {
            // set sibling position
            $(value).css({
                position: 'absolute',
                top: (top + carouselHeight + paddings + margins)
            });
            let paddingv = parseInt($(value).css('padding-left').replace("px", "")) + 
                          parseInt($(value).css('padding-right').replace("px", "")) + 
                          parseInt($(value).css('padding-top').replace("px", "")) +
                          parseInt($(value).css('padding-bottom').replace("px", ""));
            let marginv = parseInt($(value).css("margin-top").replace("px", "")) + 
                          parseInt($(value).css("margin-bottom").replace("px", "")) +
                          parseInt($(value).css("margin-left").replace("px", "")) +
                          parseInt($(value).css("margin-right").replace("px", ""));
            // increment sibling height for next sibling position set
            top += $(value).height() + paddingv + marginv;
        });

    } // verticallyRepositioningNextSiblings

}

Milestones.propTypes = {
    carousel_milestones_image_data: PropTypes.array, // array of {url: '', description: '', detailed_description: ''} hashes
    carousel_section_title: PropTypes.string,
    click_or_tap_image_text: PropTypes.string
};

export default Milestones