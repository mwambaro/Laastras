import React from "react"
import PropTypes from "prop-types"
import { clearTimeout } from "timers";

class MissionKickOff extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            current_index: 0,
            mission_kick_off_data: JSON.parse(this.props.mission_kick_off_data)
        };
        this.timer = null;
        this.kick_off_button_clicked = false;
    }

    render()
    {
        let section_title_style = {
            fontSize: '32px', 
            fontWeight: 'bold'
        };
        return(
            <div>
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
                <div id="kick-off-image-onprogress-spinner" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="kick-off-section" className="shadow p-1 mb-2 bg-white rounded">
                    <div id="kick-off-title-section" className="shadow-none p-1 mb-2 bg-light rounded">
                        <span style={section_title_style}> {this.props.section_title} </span>
                    </div>
                    <div className="text-center">
                        <img src={this.state.mission_kick_off_data[this.state.current_index].url} 
                             className="img-fluid"
                             id="kick-off-image"
                             onClick={(se) => this.goToImageDetails(se)} />
                    </div>
                    <div id="kick-off-arrow-section" className="row text-center">
                        <div className="col-3"></div>
                        <div className="col-3 text-center">
                            <button type="button" className="btn btn-default arrow-left" onClick={(se) => this.onNextPreviousClicked(se, 'arrow-left')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="col-3 text-center">
                            <button type="button" className="btn btn-default arrow-right" onClick={(se) => this.onNextPreviousClicked(se, 'arrow-right')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        let img = document.getElementById('kick-off-image');
        if(img)
        {
            this.setKickOffImageHeight(img);
            img.onload = e => {
                if(typeof(this) === 'undefined')
                {
                    console.log('image onload event in componentDidMount: "this" object is undefined.');
                    return;
                }
                $('#kick-off-image-onprogress-spinner').modal('hide');
                this.onImgLoadedData(e, this);
            };
            img.onerror = e => {
                if(typeof(this) === 'undefined')
                {
                    console.log('image onerror event in componentDidMount: "this" object is undefined.');
                    return;
                }
                console.log('image failed to load.');
            };
            img.style.cursor = "pointer";
        }

        window.addEventListener('resize', e => {
            if(typeof(this) === 'undefined')
            {
                console.log('Resize event listener in componentDidMount: "this" object is undefined');
                return;
            }
            this.setKickOffImageHeight();
        });
    }

    setKickOffImageHeight(img=null)
    {
        if(!img)
        {
            img = document.getElementById('kick-off-image');
        }
        let maxH = (window.innerHeight*3)/4;
        $('#kick-off-section').height(maxH);
        let imgH = $('#kick-off-section').height() - 
                   $('#kick-off-title-section').height() - 
                   $('#kick-off-arrow-section').height();
        $('#kick-off-image').height(imgH);
    }

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
            let description = this.state.mission_kick_off_data[this.state.current_index].description;
            let url = this.state.mission_kick_off_data[this.state.current_index].url;
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
            $('#kick-off-image-details-section').modal('show');
        }
    }

    leaveImageDetails(e)
    {
        $('#kick-off-image-details-body').empty();
        $('#kick-off-image-details-section').modal('hide');
    }

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
        if(leftRegex.test(btnType))
        {
            if(index === 0)
            {
                console.log('kick off data index === 0');
                return;
            }
            index -= 1;
            this.setState({current_index: index});
        }
        else if(rightRegex.test(btnType))
        {
            if(index === this.state.mission_kick_off_data.length-1)
            {
                console.log('kick off data index is last: ' + index);
                return;
            }
            index += 1;
            this.setState({current_index: index});
        }
        else
        {
            console.log(button.className + ' found no match amongst "arrow-right" and "arrow-left"');
        }
        this.kick_off_button_clicked = true;
        this.onImgProgress(e, this);
    }

    onImgProgress(e, dis)
    {
        if(!e)
        {
            console.log('onImgProgress event object is null');
            return;
        }

        console.log('The browser is in the process of getting the image data ...');

        $('#kick-off-image-onprogress-spinner').modal('show');
        let timer = setTimeout(function(e){
                $('#kick-off-image-onprogress-spinner').modal('hide');
                try
                {
                    if(dis.timer)
                    {
                        clearTimeout(dis.timer);
                        dis.timer = null;
                    }
                }
                catch(error)
                {
                    console.log('onImgProgress#setTimeout#clearTimeout: ' + error);
                }
            }, 
            5000
        );
        if(dis)
        {
            dis.timer = timer;
        }
    }

    onImgLoadedData(e, dis)
    {
        if(!e)
        {
            console.log('onImgLoadedData event object is null');
            return;
        }

        console.log('Image data is loaded.');
        $('#kick-off-image-onprogress-spinner').modal('hide');
        try
        {
            if(dis.timer)
            {
                clearTimeout(dis.timer);
                dis.timer = null;
            }
        }
        catch(error)
        {
            console.log('onImgLoadedData: ' + error);
        }
        finally
        {
            // scroll to kick off section
            if(dis.kick_off_button_clicked)
            {
                let p = $('#kick-off-section').position();
                $(window).scrollTop(p.top);
                dis.kick_off_button_clicked = false;
            }
        }
    }
}

MissionKickOff.propTypes = {
    mission_kick_off_data: PropTypes.string, // stringified array of {url: '', description: ''} hashes
    section_title: PropTypes.string
};

export default MissionKickOff;