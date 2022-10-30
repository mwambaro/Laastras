import React from "react"
import PropTypes from "prop-types"
import {clearTimeout} from "timers"
import {Modal} from "bootstrap"
import WaitSpinner from "./WaitSpinner.js"

require("./CenterElement");
require("./AppUtilities");

class MissionKickOff extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            current_index: 0
        };
        this.timer = null;
        this.wait_spinner = null;
        this.kick_off_button_clicked = false;
        this.kickOffImageDetailsSectionModal = null;

    } // constructor

    render()
    {
        let kick_off_click_or_tap_section_style = {
            margin: '5px',
            padding: '4px',
            color: '#11b624'
        };
        let kick_off_arrow_section_style = {
            display: 'flex'
        };
        
        return(
            
                <div className="shadow-sm p-1 mb-2 bg-white rounded" id="mission-kick-off-component">
                    <div id="kick-off-image-details-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header text-right">
                                    <button type="button" className="close" aria-label="Close"
                                            onClick={(se) => this.leaveImageDetails(se)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div id="kick-off-image-details-body">
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="text-center">
                                        <button type="button" className="btn btn-primary" onClick={(se) => this.leaveImageDetails(se)}>
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="kick-off-section">
                        <div id="kick-off-title-section">
                            <span style={{
                                    fontSize: '24px', 
                                    fontWeight: 'bold'
                                }}
                            > 
                                {this.props.kick_off_section_title} 
                            </span>
                        </div>
                        <hr/>
                        <div id="milestones-elements-section"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <div id="milestones-elements" style={{backgroundColor: 'white'}}>
                                <div id="kick-off-click-or-tap-section"
                                    style={kick_off_click_or_tap_section_style}>
                                    <span> {this.props.click_or_tap_image_text} </span>
                                </div>
                                <div id="kick-off-image-section"
                                    className="text-center image-item-div">
                                    <img src={this.props.mission_kick_off_data[this.state.current_index].url} 
                                        className="img-fluid image-item"
                                        id="kick-off-image"
                                        onClick={(se) => this.goToImageDetails(se)} />
                                </div>
                                <div id="kick-off-arrow-section" 
                                    className="text-center"
                                    style={kick_off_arrow_section_style}>
                                    <div id="kick-off-arrow-left">
                                        <button type="button" className="btn btn-default arrow-left" onClick={(se) => this.onNextPreviousClicked(se, 'arrow-left')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div id="kick-off-arrow-right">
                                        <button type="button" className="btn btn-default arrow-right" onClick={(se) => this.onNextPreviousClicked(se, 'arrow-right')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: '10px'}} id="aria-ardoise">
                            <ul className="ardoise" style={{listStyle: 'none'}}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8].map((n, idx) => {
                                        <li key={`line-${n}-${idx}`}>
                                            <hr/>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div id="milestones-spinner"></div>
                </div>
        );

    } // render

    componentDidMount()
    {
        console.log('Mission kick off component did mount.');
        this.manageArrowSection();
        this.handle_image_events();

        $('#kick-off-arrow-section').hcenter();

        this.scale_image_item();
        window.addEventListener('resize', e => {
            this.scale_image_item();
        });

        this.kickOffImageDetailsSectionModal = new Modal(
            document.getElementById('kick-off-image-details-section')
        );
        this.wait_spinner = new WaitSpinner('milestones-spinner');

    } // componentDidMount

    componentWillUpdate(nextProps, nextState)
    {
        this.wait_spinner.show_wait_spinner();

    } // componentWillUpdate

    componentDidUpdate()
    {
        this.onImgLoadedData(null, this);

    } // componentDidUpdate

    handle_image_events()
    {
        let img = document.getElementById('kick-off-image');
        if(img)
        {
            img.onerror = (e) => {
                console.log('image failed to load.');
                setTimeout((e) => {
                    this.wait_spinner.hide_wait_spinner();
                }, 1000);
            };
            img.onload = (e) => {
                setTimeout((e) => {
                    this.wait_spinner.hide_wait_spinner();
                }, 1000);
            };
            img.onmouseover = (e) => {
                e.target.style.cursor = "pointer";
            }
        }

    } // handle_image_events

    scale_image_item()
    {
        let width = $('.image-item-div').first().width();
        if(width > 700)
        {
            width = 700;
        }

        $('.image-item').width(width);

    } // scale_image_item

    manageArrowSection()
    {
        if(typeof(this) === 'undefined')
        {
            console.log("manageArrowSection: the 'this' object is not defined");
            return;
        }

        let index = this.state.current_index;
        if(this.props.mission_kick_off_data.length === 1) // Remove both arrows
        {
            this.kick_off_left_arrow_jquery = $('#kick-off-arrow-left');
            $('#kick-off-arrow-left').remove();
            this.kick_off_right_arrow_jquery = $('#kick-off-arrow-right');
            $('#kick-off-arrow-right').remove();
        }
        else if(index === 0) // Remove arrow-left
        {
            this.kick_off_left_arrow_jquery = $('#kick-off-arrow-left');
            $('#kick-off-arrow-left').remove();
        }
        else if(index === this.props.mission_kick_off_data.length-1) // Remove arrow-right
        {
            this.kick_off_right_arrow_jquery = $('#kick-off-arrow-right');
            $('#kick-off-arrow-right').remove();
        }
        else // Make sure they both exist
        {
            if($('#kick-off-arrow-left').length === 0)
            {
                if(!this.kick_off_left_arrow_jquery)
                {
                    console.log('manageArrowSection: You should have stored arrow left data. You did not');
                }
                else
                {
                    if($('#kick-off-arrow-right').length > 0)
                    {
                        this.kick_off_left_arrow_jquery.insertBefore($('#kick-off-arrow-right'));
                    }
                    else
                    {
                        $('#kick-off-arrow-section').append(this.kick_off_left_arrow_jquery);
                    }
                }

                this.kick_off_left_arrow_jquery = null;
            }

            if($('#kick-off-arrow-right').length === 0)
            {
                if(!this.kick_off_right_arrow_jquery)
                {
                    console.log('manageArrowSection: You should have stored arrow right data. You did not');
                }
                else
                {
                    if($('#kick-off-arrow-left').length > 0)
                    {
                        this.kick_off_right_arrow_jquery.insertAfter($('#kick-off-arrow-left'));
                    }
                    else
                    {
                        $('#kick-off-arrow-section').append(this.kick_off_right_arrow_jquery);
                    }
                }

                this.kick_off_right_arrow_jquery = null;
            }
        }

    } // manageArrowSection

    goToImageDetails(e)
    {
        if(typeof(this) === 'undefined')
        {
            console.log('goToImageDetails: "this" object is undefined');
            return;
        }
        if(!e)
        {
            console.log('goToImageDetails: Event object is not set');
            return;
        }

        let image = e.target;
        if(image)
        {
            let description = this.props.mission_kick_off_data[this.state.current_index].description;
            let url = this.props.mission_kick_off_data[this.state.current_index].url;
            if(url !== image.src)
            {
                console.log('goToImageDetails: Something is up. Image URLs mismatch. Current index state must be messed up.');
            }

            let html = `
                <div style="font-size: 18px"><p> ${description} </p></div>
                <hr>
                <div class="text-center"> <img src="${url}" class="img-fluid" /> </div>
            `;
            $('#kick-off-image-details-body').append(html);
            this.kickOffImageDetailsSectionModal.show();
        }

    } // goToImageDetails

    leaveImageDetails(e)
    {
        $('#kick-off-image-details-body').empty();
        this.kickOffImageDetailsSectionModal.hide();

    } // leaveImageDetails

    onNextPreviousClicked(e, btnType)
    {
        if(typeof(this) === 'undefined')
        {
            console.log('onNextPreviousClicked is not bound with "this" object.');
            return;
        }
        if(!e){
            console.log('Event object bound with onNextPreviousClicked is null');
            return;
        }
        let button = e.target;
        if(!button)
        {
            console.log('No target object defined on the event object bound with onNextPreviousClicked');
            return;
        }

        let index = this.state.current_index;
        let leftRegex = new RegExp('arrow-left');
        let rightRegex = new RegExp('arrow-right');
        let updated = false;
        if(leftRegex.test(btnType))
        {
            if(index === 0)
            {
                //console.log('kick off data index === 0');
                updated = false;
            }
            else
            {
                index -= 1;
                updated = true;
            }
        }
        else if(rightRegex.test(btnType))
        {
            if(index === this.props.mission_kick_off_data.length-1)
            {
                //console.log('kick off data index is last: ' + index);
                updated = false;
            }
            else
            {
                index += 1;
                updated = true;
            }
        }
        else
        {
            console.log(button.className + ' found no match amongst "arrow-right" and "arrow-left"');
            updated = false;
        }

        if(updated)
        {
            this.kick_off_button_clicked = true;
            this.setState({
                current_index: index
            });
        }

    } // onNextPreviousClicked

    onImgLoadedData(e, dis)
    {
        if(!dis)
        {
            console.log('onImgLoadedData "this" object is null');
            return;
        }

        //console.log('Image data is loaded.');
        dis.manageArrowSection();
        setTimeout((e) => {
            this.wait_spinner.hide_wait_spinner();
        }, 1000);
        // scroll to kick off section
        if(dis.kick_off_button_clicked)
        {
            let p = $('#kick-off-section').position();
            $(window).scrollTop(p.top);
            dis.kick_off_button_clicked = false;
        }

    } // onImgLoadedData
}

MissionKickOff.propTypes = {
    mission_kick_off_data: PropTypes.array, // array of {url: '', description: ''} hashes
    kick_off_section_title: PropTypes.string,
    click_or_tap_image_text: PropTypes.string
};

export default MissionKickOff;