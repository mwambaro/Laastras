
import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class LaastrasBannerPitchMessage extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.pitch_message_modal_id = "pitch-message-modal";
        this.pitch_message_modal = null;

    } // constructor 

    render()
    {
        return(
            <div className="container-fluid">
                <div id={this.pitch_message_modal_id} className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div id="banner-details-body">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" id="banner-ok-btn">
                                        OK
                                    </button>
                                </div>
                                <div className="text-center" style={{marginLeft: '10px'}}>
                                    <button type="button" className="btn btn-primary" id="banner-hit-home-btn">
                                        {this.props.home_label}
                                    </button>
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
        this.pitch_message_modal = new Modal(
            document.getElementById(this.pitch_message_modal_id)
        );
        $('#banner-details-body').append(this.props.laastras_banner_pitch_message);
        window.addEventListener(
            this.props.laastras_banner_pitch_message_event, 
            (e) => {
                this.pitch_message_modal.show();
            }
        );
        $('#banner-ok-btn').on('click', (e) => {
            this.pitch_message_modal.hide();
        });
        $('#banner-hit-home-btn').on('click', (e) => {
            this.pitch_message_modal.hide();
            window.location = this.props.home_url;
        });

    } // componentDidMount

}

LaastrasBannerPitchMessage.propTypes = {
    laastras_banner_pitch_message_event: PropTypes.string,
    laastras_banner_pitch_message: PropTypes.string,
    home_url: PropTypes.string,
    home_label: PropTypes.string
};

export default LaastrasBannerPitchMessage