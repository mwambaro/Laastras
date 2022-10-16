import React from "react"
import PropTypes from "prop-types"

class LaastrasSiteAnalytics extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8 shadow-sm p-1 mb-2 bg-body rounded">
                        <div style={{margin: '5px'}}>
                            <div> 
                                <strong> {this.props.website_analytics.number_of_visits_label}: </strong> 
                                {this.props.website_analytics.number_of_visits}
                            </div>
                            <div> 
                                <strong> {this.props.website_analytics.number_of_visitors_label}: </strong> 
                            {this.props.website_analytics.number_of_visitors}
                            </div>
                            <div> 
                                <strong> {this.props.website_analytics.page_visited_label}: </strong> 
                                {this.props.website_analytics.page}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        
    } // render 

}

LaastrasSiteAnalytics.propTypes = {
    website_analytics: PropTypes.object
}

export default LaastrasSiteAnalytics