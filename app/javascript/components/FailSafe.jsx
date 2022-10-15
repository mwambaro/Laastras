import React from "react"
import PropTypes from "prop-types"

'use strict';

const e = React.createElement;

class FailSafe extends React.Component
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        let elt = e(
            'div', {className: 'container', id: 'fail_safe'},
            e('div', {className: 'row justify-content-center'},
            e('div', {className: 'col-md-8'},
            e('div', {className: 'card'}, 
            [   
                e('div', {className: 'card-header'}, this.props.card_title), 
                e('div', {className: 'card-body'}, 
                    [
                        e('div', {className: 'text-center', id: 'card_body_message'}, ''),
                        e('div', {className: 'text-center', style: {margin: '10px'}}, e('img', {src: this.props.card_image, className: 'img-fluid'}))
                    ]
                )
            ]
        ))));
    
        return (elt);

    } // render

    componentDidMount()
    {
        $('#fail_safe').css({  
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        });
        $('#card_body_message').append(this.props.card_body);

    } // ComponentDidMount

}

FailSafe.propTypes = {
    card_title: PropTypes.string,
    card_body: PropTypes.string,
    card_image: PropTypes.string
}

export default FailSafe;