import React from "react"
import PropTypes from "prop-types"

class NavigationBarDropdownItem extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        if(typeof(this.props.url) === 'undefined' || this.props.url === "")
        {
            console.log('Expected a valid "url" property');
            return;
        }
        else if(typeof(this.props.inner_text) === 'undefined' || this.props.inner_text === "")
        {
            console.log('Expected a valid "inner_text" property');
            return;
        }
        else if(typeof(this.props.index) === 'undefined' || this.props.index < 0)
        {
            console.log('Expected a valid "index" property');
            return;
        }
        else if(typeof(this.props.count_hint) === 'undefined' || this.props.count_hint <= 0)
        {
            console.log('Expected a valid "count_hint" property');
            return;
        }

        return(
            <div id="navigation-bar-dropdown-menu-elt-div">
            </div>
        );
    }

    componentDidMount()
    {
        let id = `navbar-dropdown-menu-item-${this.props.index}`;
        let html = `
            <a class="dropdown-item"
               id="${id}" 
               href="${this.props.url}">
                    ${this.props.inner_text}
            </a>
        `;
        if(this.props.index < this.props.count_hint-1)
        {
            html += '<div class="dropdown-divider"></div>';
        }
        $('#navigation-bar-dropdown-menu-elt-div').append(html);

        // Put the event handlers
        $(`#${id}`).mouseover(e => this.handleOnMouseOver(e))
                   .mouseleave(e => this.handleOnMouseLeave(e));
    }

    handleOnMouseOver(e)
    {
        if(typeof(e) === 'undefined' || typeof(this) === 'undefined')
        {
            console.log('handleOnMouseOver: event object and/or "this" object are undefined');
            return;
        }

        this.dropdownItemStyle = {
            background: e.target.style.background,
            fontWeight: e.target.style.fontWeight,
            fontColor: e.target.style.fontColor
        };
        e.target.style.background = '#1ecbe1';
        e.target.style.fontWeight = 'bold';
        e.target.style.fontColor = 'white';
    }

    handleOnMouseLeave(e)
    {
        if(typeof(e) === 'undefined' || typeof(this) === 'undefined')
        {
            console.log('handleOnMouseLeave: event object and/or "this" object are undefined');
            return;
        }

        if(this.dropdownItemStyle)
        {
            e.target.style.background = this.dropdownItemStyle.background;
            e.target.style.fontWeight = this.dropdownItemStyle.fontWeight;
            e.target.style.fontColor = this.dropdownItemStyle.fontColor;
        }
        this.dropdownItemStyle = null;
    }
}

NavigationBarDropdownItem.propTypes = {
    url: PropTypes.string, 
    inner_text: PropTypes.string,
    count_hint: PropTypes.number, // 'count_hint' gives the idea of how many items, in all, expected in the dropdown whose elt this is
    index: PropTypes.number // 'index' is the 0-based position number in the list of items expected in the dropdown whose elt this is
};

export default NavigationBarDropdownItem;