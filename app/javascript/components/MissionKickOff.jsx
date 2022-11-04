import React from "react"
import PropTypes from "prop-types"
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
        this.rotation_degrees = 1;
        this.wait_spinner = null;
        this.kick_off_button_clicked = false;
        this.kickOffImageDetailsSectionModal = null;

    } // constructor

    render()
    {
        let arrow_left_display = {
            display: 'none'
        };
        let arrow_right_display = {
            display: 'block'
        };
        let arrow_section_display = {
            display: 'flex'
        }

        let otherwise = true;
        let index = this.state.current_index;
        if(this.props.mission_kick_off_data.length === 1) // Remove both arrows
        {
            arrow_section_display = 'none';
            otherwise = false;
        }
        if(index === 0) // Remove arrow-left
        {
            arrow_left_display = {
                display: 'none'
            };
            otherwise = false;
        }
        if(index === this.props.mission_kick_off_data.length-1) // Remove arrow-right
        {
            arrow_right_display = {
                display: 'none'
            };
            otherwise = false;
        }
        
        if(otherwise)// Make sure they both exist
        {
            arrow_section_display = {
                display: 'flex'
            };
            arrow_left_display = {
                display: 'block'
            };
            arrow_right_display = {
                display: 'block'
            };
        }
        
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
                                    style={{
                                        margin: '5px',
                                        padding: '4px',
                                        color: '#11b624'
                                    }}>
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
                                    className="d-flex flex-row justify-content-center"
                                    style={{display: arrow_section_display, margin: '5px'}}>
                                    <div id="kick-off-arrow-left" style={{display: arrow_left_display}}>
                                        <button type="button" id="arrow-left" className="btn btn-default arrow-left" onClick={(se) => this.onArrowClicked(se, 'arrow-left')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div id="kick-off-arrow-right" style={{display: arrow_right_display}}>
                                        <button type="button" id="arrow-right" className="btn btn-default arrow-right" onClick={(se) => this.onArrowClicked(se, 'arrow-right')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: '10px'}} id="aria-ardoise">
                        </div>
                        <div style={{padding: '10px', zIndex: '99'}} id="aria-ardoise-vertical">
                        </div>
                    </div>
                    <div id="milestones-spinner"></div>
                </div>
        );

    } // render

    componentDidMount()
    {
        console.log('Mission kick off component did mount.');
        this.handle_image_events();

        $('#kick-off-arrow-section').hcenter();

        window.addEventListener('resize', e => {
            this.scale_milestone_image();
        });
        window.addEventListener(this.props.height_set_event, (e) => {
            this.scale_milestone_image();
        })

        this.kickOffImageDetailsSectionModal = new Modal(
            document.getElementById('kick-off-image-details-section')
        );
        this.wait_spinner = new WaitSpinner('milestones-spinner');

    } // componentDidMount

    componentDidUpdate()
    {
        this.onImgLoadedData(null, this);

    } // componentDidUpdate

    scale_image_item()
    {
        let width = $('.image-item-div').first().width();
        if(width > 700)
        {
            width = 700;
        }

        $('.image-item').width(width);

    } // scale_image_item

    scale_milestone_image()
    {
        let left = $('#mission-kick-off-component').offset().left;
        let width = $('#intro-capture-component').width();
        if(left<width) 
        {
            //return;
        }

        this.scale_image_item();
        let limit = $('#mission-kick-off-component').offset().top + 
                    $('#mission-kick-off-component').height();
        let etop = $('#kick-off-image').offset().top;
        let ar_height = $('#kick-off-arrow-section').height();

        for(;;)
        {
            let img_top = etop + 
                            $('#kick-off-image').height() +
                            ar_height;
            if(img_top > limit) // adjust
            {
                let width = $('#kick-off-image').width() - 5;
                $('#kick-off-image').width(width);
            }
            else 
            {
                break;
            }
        }

        this.add_lines_to_notebook();

    } // scale_milestone_image

    add_lines_to_notebook()
    {
        let left = $('#mission-kick-off-component').offset().left;
        let width = $('#intro-capture-component').width();
        if(left<width) 
        {
            //return;
        }

        let limit = $('#mission-kick-off-component').offset().top + 
                        $('#mission-kick-off-component').height();
        let html = `
            <div style="height: 2px; background-color: grey; margin: 30px" class="ardoise-div">
            </div>
        `;
        $('.ardoise-div').remove();
        $('.ardoise-sweep').remove();
        $('.aria-ardoise-vertical-div').remove();
        let atop = $('#aria-ardoise').offset().top;
        let aheight = $('#aria-ardoise').height();
        let counter = 1;

        //console.log('LIMIT: ' + limit + '; ATOP: ' + atop);

        for(;;)
        {
            let top = atop + aheight;
            //console.log('H: ' + h);
            if((top+32) >= limit)
            {
                break;
            }
            $('#aria-ardoise').append(html);
            aheight = $('#aria-ardoise').height();
            counter += 1;

            //console.log('HEIGHT: ' + aheight);
        }
        //console.log('COUNTER: ' + counter);
        //this.add_vertical_lines_to_notebook();
        this.add_sweeper_to_notebook();

    } // add_lines_to_notebook

    add_vertical_lines_to_notebook()
    {
        let atop = $('#aria-ardoise').offset().top;
        let height = $('#aria-ardoise').height();
        let width = $('#aria-ardoise').width();
        let padding = parseInt($('#aria-ardoise').css('padding').replace('px', ''));
        let margin = parseInt($('#aria-ardoise').css('margin').replace('px', ''));
        let html = `
            <div style="height: 2px; width: ${height}px; background-color: grey; margin: 30px" class="aria-ardoise-vertical-div">
            </div>
        `;
        let limit = atop + height + width;
        let ttop = atop + height;
        let aheight = $('#aria-ardoise-vertical').height();

        for(;;)
        {
            let ntop = ttop + aheight;
            if((ntop+32) >= limit)
            {
                break;
            }
            $('#aria-ardoise-vertical').append(html);
            aheight = $('#aria-ardoise-vertical').height();
        }

        // center in aria-ardoise
        let aw = $('#aria-ardoise').width();
        let ah = $('#aria-ardoise').height();
        let w = $('#aria-ardoise-vertical').width();
        let h = $('#aria-ardoise-vertical').height();
        let left = $('#aria-ardoise').offset().left;
        let top = $('#aria-ardoise').offset().top;
        let paddng = parseInt($('#aria-ardoise-vertical').css('padding').replace('px', ''));
        let margn = parseInt($('#aria-ardoise-vertical').css('margin').replace('px', ''));

        let tp = top + padding + margin + (ah/2) - (h/2);
        let lft = left + padding + margin + (aw/2) - (w/2);

        //console.log('LEFT: ' + left + '; AW: ' + (aw/2) + '; W: ' + (w/2));

        let off = $('#aria-ardoise-vertical').offset();
        off.top = tp;
        off.left = lft;
        $('#aria-ardoise-vertical').offset(off);

        $('#aria-ardoise-vertical').css({
            "transform": `rotate(90deg)`,
            "-moz-transform": `rotate(90deg)`,
            "-webkit-transform": `rotate(90deg)`,
            "-o-transform": `rotate(90deg)`
        });

    } // add_vertical_lines_to_notebook

    add_sweeper_to_notebook()
    {
        let aw = $('#aria-ardoise').width();
        let ah = $('#aria-ardoise').height();
        let w = ah < aw ? ah : aw;
        let h = 8;
        let padding = parseInt($('#aria-ardoise').css('padding').replace('px', ''));
        let margin = parseInt($('#aria-ardoise').css('margin').replace('px', ''));
        //console.log('padding: ' + padding + '; margin: ' + margin);
        let top = $('#aria-ardoise').offset().top + padding + margin + (w/2) - (h/2);
        let lft = $('#aria-ardoise').offset().left + padding + margin +
                  (aw/2) - (w/2);
        let html = `
            <div style="z-index: 99; height: ${h}px; width: ${w}px; background-color: green; margin: 0px" class="ardoise-sweep">
            </div>
        `;
        $('#aria-ardoise').append(html);
        let off = $('.ardoise-sweep').offset();
        off.top = top;
        off.left = lft;
        $('.ardoise-sweep').offset(off);
        setInterval(() => {
            this.rotation_degrees++;
            $('.ardoise-sweep').css({
                "transform": `rotate(${this.rotation_degrees}deg)`,
                "-moz-transform": `rotate(${this.rotation_degrees}deg)`,
                "-webkit-transform": `rotate(${this.rotation_degrees}deg)`,
                "-o-transform": `rotate(${this.rotation_degrees}deg)`
            });
        }, 25);

    } // add_sweeper_to_notebook

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
                this.scale_milestone_image();
                setTimeout((e) => {
                    this.wait_spinner.hide_wait_spinner();
                }, 1000);
            };
            img.onmouseover = (e) => {
                e.target.style.cursor = "pointer";
            }
        }

    } // handle_image_events

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

    onArrowClicked(e, btn)
    {
        this.wait_spinner.show_wait_spinner();
        
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
                this.setState({
                    current_index: (this.state.current_index-1)
                });
            }
            else 
            {
                this.setState({
                    current_index: (this.props.mission_kick_off_data.length-1)
                });
            }
        }
        else 
        {
            if(this.state.current_index < (this.props.mission_kick_off_data.length-1))
            {
                this.setState({
                    current_index: (this.state.current_index+1)
                });
            }
            else 
            {
                this.setState({
                    current_index: 0
                });
            }
        }

    } // onArrowClicked

    onImgLoadedData(e, dis)
    {
        if(!dis)
        {
            console.log('onImgLoadedData "this" object is null');
            return;
        }

        //console.log('Image data is loaded.');
        setTimeout((e) => {
            this.wait_spinner.hide_wait_spinner();
        }, 1000);
        // scroll to kick off section
        if(dis.kick_off_button_clicked)
        {
            let p = $('#kick-off-section').offset();
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