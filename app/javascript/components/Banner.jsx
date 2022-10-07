import React from "react"
import PropTypes from "prop-types"

class Banner extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div id="outer" className="row" style={{fontFamily: 'Times New Roman'}}
                     onClick={se => this.onClickBanner(se)}
                     onMouseOver={se => this.onMouseOverBanner(se)}>
                    <div className="col-sm-2 d-flex flex-column align-items-center justify-content-center" >
                        <img src={this.props.laastras_logo_url} className="img-fluid" />
                    </div>
                    <div id="from" className="col-sm-3 d-flex flex-column align-items-center justify-content-center" style={{fontSize: '18px', fontWeight: 'bold', color: 'rgb(192,0,0)'}}>
                        <div id="f-text">
                            <div className="text-center"> From </div>
                            <div className="text-center"> Democracy </div>
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
                        <div className="text-center"> To </div>
                        <div className="text-center"> Homocracy </div>
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

    onClickBanner(e)
    {
        window.location = this.props.home_url;
    }

    onMouseOverBanner(e)
    {
        e.target.style.cursor = 'pointer';
    }

}

Banner.propTypes = {
    laastras_logo_url: PropTypes.string,
    e_grocery_logo_url: PropTypes.string,
    e_card_logo_url: PropTypes.string,
    e_logistics_logo_url: PropTypes.string,
    e_alliances_logo_url: PropTypes.string,
    e_homocracy_logo_url: PropTypes.string,
    home_url: PropTypes.string
};

export default Banner