import React from "react"
import PropTypes from "prop-types"

class LaastrasBannerHtml extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div className="container-fluid" id="banner-container-id">
                <div id="outer" className="row" style={{fontFamily: 'Times New Roman'}}>
                    <div className="col-sm-2 d-flex flex-column align-items-center justify-content-center" id="laastras-logo" >
                        <img src={this.props.laastras_logo_url} className="img-fluid" />
                    </div>
                    <div id="from" className="col-sm-3 d-flex flex-column align-items-center justify-content-center" style={{fontSize: '18px', fontWeight: 'bold', color: 'rgb(192,0,0)'}}>
                        <div id="f-text">
                            <div className="text-center"> {this.props.from} </div>
                            <div className="text-center"> {this.props.democracy} </div>
                        </div>
                    </div>
                    <div className="col-sm-2" style={{backgroundColor: 'black'}} id="main-brands">
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
                    <div className="col-sm-2 d-flex flex-column align-items-center justify-content-center" id="homocracy-logo">
                        <img src={this.props.e_homocracy_logo_url} className="img-fluid" />
                    </div>
                </div>
                <hr style={{fontWeight: 'bold', color: 'rgb(192,0,0)', margin: '1px', height: '5px'}} />
            </div>
        );

    } // render

    componentDidMount()
    {
        $('#outer').on('click', (e) => {
            if(this.props.fire_pitch_message_event)
            {
                this.props.fire_pitch_message_event(
                    this.props.event_name, 'banner-container-id'
                );
            }
        }).on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        });

        window.addEventListener('resize', (e) => {
            this.props.switch_banners_event([
                'laastras-logo',
                'from',
                'main-brands',
                'to',
                'homocracy-logo'
            ]);
        });

    } // componentDidMount

}

LaastrasBannerHtml.propTypes = {
    event_name: PropTypes.string,
    fire_pitch_message_event: PropTypes.func, // callback
    switch_banners_event: PropTypes.func, // callback
    laastras_logo_url: PropTypes.string,
    e_grocery_logo_url: PropTypes.string,
    e_card_logo_url: PropTypes.string,
    e_logistics_logo_url: PropTypes.string,
    e_alliances_logo_url: PropTypes.string,
    e_homocracy_logo_url: PropTypes.string,
    from: PropTypes.string,
    democracy: PropTypes.string,
    to: PropTypes.string,
    homocracy: PropTypes.string
};

export default LaastrasBannerHtml