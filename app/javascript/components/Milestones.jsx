import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class Milestones extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div id="milestones-view-div">
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="..." class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src="..." class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                            <img src="..." class="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {   
        this.seMilestonesViewSize();
    } // componentDidMount

    seMilestonesViewSize()
    {
        let height = ($(window).height()*1)/2;
        $('#milestones-view-div').height(height);

    } // seMilestonesViewSize

}

Milestones.propTypes = {
    mission_kick_off_data: PropTypes.array, // array of {url: '', description: ''} hashes
    kick_off_section_title: PropTypes.string,
    click_or_tap_image_text: PropTypes.string
};

export default Milestones