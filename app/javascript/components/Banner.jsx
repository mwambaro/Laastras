import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class Banner extends React.Component
{
    constructor(props)
    {
        super(props);
        this.bannerDetailsSectionModal = null;

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div id="banner-details-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div id="banner-details-body">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.leaveBannerDetails(se)}>
                                        OK
                                    </button>
                                </div>
                                <div className="text-center" style={{marginLeft: '10px'}}>
                                    <button type="button" className="btn btn-primary" onClick={(se) => this.hitHomePage(se)}>
                                        {this.props.home_label}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="outer" className="row" style={{fontFamily: 'Times New Roman'}}
                     onClick={se => this.onClickBanner(se)}
                     onMouseOver={se => this.onMouseOverBanner(se)}>
                    <div className="col-sm-2 d-flex flex-column align-items-center justify-content-center" >
                        <img src={this.props.laastras_logo_url} className="img-fluid" />
                    </div>
                    <div id="from" className="col-sm-3 d-flex flex-column align-items-center justify-content-center" style={{fontSize: '18px', fontWeight: 'bold', color: 'rgb(192,0,0)'}}>
                        <div id="f-text">
                            <div className="text-center"> {this.props.from} </div>
                            <div className="text-center"> {this.props.democracy} </div>
                        </div>
                    </div>
                    <div className="col-sm-2" style={{backgroundColor: 'black'}}>
                        <div className="row">
                            <img src={this.props.e_grocery_logo_url}
                                 className="img-fluid col-sm-6 justify-content-start" />
                            <img src={this.props.e_card_logo_url}
                                 className="img-fluid col-sm-6 justify-content-start" />
                        </div>
                        <div className="text-center">
                            <p style={{'margin': '10px', 'color': 'white'}}> IooT </p>
                        </div>
                        <div className="row">
                            <img src={this.props.e_logistics_logo_url}
                                 className="img-fluid col-sm-6 justify-content-start" />
                            <img src={this.props.e_alliances_logo_url}
                                 className="img-fluid col-sm-6 justify-content-start" />
                        </div>
                    </div>
                    <div id="to" className="col-sm-3 d-flex flex-column align-items-center justify-content-center" style={{fontSize: '18px', fontWeight: 'bold', color: 'rgb(0,176,80)'}}>
                        <div className="text-center"> {this.props.to} </div>
                        <div className="text-center"> {this.props.homocracy} </div>
                    </div>
                    <div className="col-sm-2 d-flex flex-column align-items-center justify-content-center">
                        <img src={this.props.e_homocracy_logo_url} className="img-fluid" />
                    </div>
                </div>
                <hr style={{fontWeight: 'bold', color: 'rgb(192,0,0)', margin: '1px', height: '3px'}} />
                <hr style={{fontWeight: 'bold', color: 'rgb(0,176,80)', margin: '1px', height: '3px'}} />
            </div>
        );

    } // render

    componentDidMount()
    {
        this.bannerDetailsSectionModal = new Modal(
            document.getElementById('banner-details-section')
        );

    } // componentDidMount

    leaveBannerDetails(e)
    {
        this.bannerDetailsSectionModal.hide();
        $('#banner-details-body-content').remove();

    } // leaveExpertiseDetails

    hitHomePage(e)
    {
        window.location = this.props.home_url;

    } // hitHomePage

    onClickBanner(e)
    {
        //window.location = this.props.home_url;
        $('#banner-details-body').append(this.pitch_message_html());
        this.bannerDetailsSectionModal.show();

    } // onClickBanner

    onMouseOverBanner(e)
    {
        e.target.style.cursor = 'pointer';

    } // onMouseOverBanner

    pitch_message_html()
    {
        let html = `
            <div id="banner-details-body-content">
                ${this.props.laastras_pitch_message}
            </div>
        `;

        return html;

    } // pitch_message_html

}

Banner.propTypes = {
    laastras_logo_url: PropTypes.string,
    e_grocery_logo_url: PropTypes.string,
    e_card_logo_url: PropTypes.string,
    e_logistics_logo_url: PropTypes.string,
    e_alliances_logo_url: PropTypes.string,
    e_homocracy_logo_url: PropTypes.string,
    home_url: PropTypes.string,
    home_label: PropTypes.string,
    from: PropTypes.string,
    democracy: PropTypes.string,
    to: PropTypes.string,
    homocracy: PropTypes.string,
    laastras_pitch_message: PropTypes.string
};

export default Banner