import React from "react"
import PropTypes from "prop-types"
import NavigationBarDropdownItem from "./NavigationBarDropdownItem"

class NavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.navbar_state = {
            navbar_ul_list_style: {
                display: 'block'
            },
            navigation_bar_type: 'list'
        };
        this.state = {
            rerender: false
        };
    }

    render()
    {
        if(this.state.rerender)
        {
            this.assessViewPortSize(this.props);
        }

        console.log('Type: ' + this.navbar_state.navigation_bar_type);

        let render_data = null;

        if(this.navbar_state.navigation_bar_type === 'list') // Initial, not UX-valid
        {
            render_data = this.renderNavigationBarAsList();
        }
        else if(this.navbar_state.navigation_bar_type === 'modal')
        {
            render_data = this.renderNavigationBarAsModal();
        }
        else if(this.navbar_state.navigation_bar_type === 'flex')
        {
            render_data = this.renderNavigationBarAsList();
        }
        else if(this.navbar_state.navigation_bar_type === 'flex-modal')
        {
            render_data = this.renderNavigationBarAsModal();
        }
        else
        {
            render_data = this.renderNavigationBarAsModal();
        }

        if(!render_data)
        {
            console.log("Oops, you are about to render invalid data");
        }

        return render_data;
    }

    renderNavigationBarAsList()
    {   
        let navbar_list_li_style = {
            listStyleType: 'none'
        };

        return(
            <div>
                <div id="navbar-dropdown-modal" className="modal fade" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="navbar-modal-close" type="button" className="close" aria-label="Close"
                                        onClick={se => this.onClickNavbarDropdownModalCloseBtn(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody id="navbar-dropdown-modal-body">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ul id="navbar-list-group" style={this.navbar_state.navbar_ul_list_style}>
                        {
                            this.props.laastras_actions.map((action, idx) =>
                                <li className="nav-item"
                                    key={`navbar-nav-item-li-${idx}`}
                                    style={navbar_list_li_style}>
                                    <a className="nav-link"
                                       id={`navbar-nav-item-list-a-${idx}-${action.dropdown_boolean}`}
                                       href={action.url}
                                       onClick={se => this.onClickNavbarNavLink(se)}>
                                        {action.inner_text}
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        );
    }

    renderNavigationBarAsModal()
    {

        return(
            <div>
                <div id="navbar-dropdown-modal" className="modal fade" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="navbar-modal-close" type="button" className="close" aria-label="Close"
                                        onClick={se => this.onClickNavbarDropdownModalCloseBtn(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody id="navbar-dropdown-modal-body">
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="navbar-modal" className="modal fade" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="navbar-modal-close" type="button" className="close" aria-label="Close"
                                        onClick={se => this.onClickNavbarModalCloseBtn(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody>
                                        {
                                            this.props.laastras_actions.map((action, idx) =>
                                                <tr key={`navbar-nav-item-tr-${idx}`}>
                                                    <td>
                                                        <a className="nav-link"
                                                           id={`navbar-nav-item-modal-a-${idx}-${action.dropdown_boolean}`}
                                                           href={action.url}
                                                           onClick={se => this.onClickNavbarNavLink(se)}>
                                                           {action.inner_text}
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="navbar-modal-launch"
                     onClick={se => this.onClickNavbarModalLaunch(se)}
                     onMouseOver={se => this.onHoverNavbarModalLaunch(se)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#5a49b6" className="bi bi-list-ul" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.setState({rerender: true}); // Leave the UX-invalid state
    }

    onClickNavbarDropdownModalCloseBtn(e)
    {
        $('#navbar-dropdown-modal').modal('hide');
    }

    onClickNavbarModalCloseBtn(e)
    {
        $('#navbar-modal').modal('hide');
    }

    onClickNavbarModalLaunch(e)
    {
        $('#navbar-modal').modal('show');
    }

    onHoverNavbarModalLaunch(e)
    {
        $('#navbar-modal-launch').css('cursor', 'pointer');
    }

    onClickNavbarNavLink(e)
    {
        if(typeof(e) === 'undefined')
        {
            console.log('onClickNavbarNavLink: event object is not defined');
            return;
        }
        let anchor = e.target;
        if(!anchor)
        {
            console.log('onClickNavbarNavLink: clicked target is not defined');
            return;
        }
        e.preventDefault();
        
        //console.log(`${anchor.innerText.trim()} (id): ${anchor.id}`);
        let m = anchor.id.match(/-(\d+)-(true|false)$/i);
        if(!m)
        {
            console.log('onClickNavbarNavLink: missing/invalid "dropdown_boolean" data in link object');
            return;
        }

        if(m[2].match(/^true$/i)) // Has dropdown
        {
            if(this.navbar_state.navigation_bar_type === 'modal')
            {
                $('#navbar-modal').modal('hide');
            }
            else if(this.navbar_state.navigation_bar_type === 'flex-modal')
            {
                $('#navbar-modal').modal('hide');
            }

            let html = "";
            try
            {
                let idx = parseInt(m[1]);
                let action = this.props.laastras_actions[idx];
                let inner_actions = JSON.parse(action.data);
                inner_actions.map((action, i) => {
                    html += `
                        <tr>
                            <td>
                                <a href="${action.url}" class="nav-link">
                                    ${action.inner_text}
                                </a>
                            </td>
                        </tr>
                    `
                });
            }
            catch(error)
            {
                console.log('onClickNavbarNavLink: ' + error);
            }

            $('#navbar-dropdown-modal-body').empty();
            $('#navbar-dropdown-modal-body').append(html);
            $('#navbar-dropdown-modal').modal('show');
        }
        else if(m[2].match(/^false$/i)) // Has no dropdown
        {
            window.location = anchor.href;
        }
    }

    assessViewPortSize(props)
    {
        if(typeof(this) === 'undefined')
        {
            console.log("assessViewPortSize: 'this' object is undefined.");
            return;
        }

        try
        {   
            let maxWidth = 0;
            let totalWidth = 0;
            if(this.navigation_bar_total_width && this.navigation_bar_max_with)
            {
                totalWidth = this.navigation_bar_total_width;
                maxWidth = this.navigation_bar_max_with;
            }
            else
            {
                $('#navbar-list-group').children().each((idx, node) => {
                
                    let width = $(node).width();
                    //console.log('width: ' + width);
                    if(idx == 0)
                    {
                        maxWidth = width;
                    }
                    else
                    {
                        if(width > maxWidth)
                        {
                            maxWidth = width;
                        }
                    }
                    totalWidth += width;
                });
                if(maxWidth>0 && totalWidth>0)
                {
                    this.navigation_bar_max_with = maxWidth;
                    this.navigation_bar_total_width = totalWidth;
                }
            }

            let how_many = 0;
            if(maxWidth>0)
            {
                how_many = Math.floor(props.parent_max_width/maxWidth);
            }

            //console.log(`Parent max width (Nav): ${props.parent_max_width}; Total width: ${totalWidth}; Max width: ${maxWidth}; How many: ${how_many}`);
            if(props.parent_max_width >= totalWidth) // Flex
            {
                this.navbar_state = {
                    navbar_ul_list_style: {
                        display: 'flex'
                    },
                    navigation_bar_type: 'flex'
                };
            }
            else if(how_many>0) // flex + modal
            {
                this.navbar_state = {
                    navbar_ul_list_style: {
                        display: 'flex'
                    },
                    navigation_bar_type: 'flex-modal'
                };
            }
            else // modal
            {
                this.navbar_state = {
                    navbar_ul_list_style: {},
                    navigation_bar_type: 'modal'
                };
            }
        }
        catch(error)
        {
            console.log("assessViewPortSize: " + error);
        }
    }
}

NavigationBar.propTypes = {
    laastras_actions: PropTypes.array, // array of {url: '', inner_text: '', dropdown_boolean: '', data: ''} hashes
    parent_max_width: PropTypes.number // parent is an elt in which this component lives
};

export default NavigationBar