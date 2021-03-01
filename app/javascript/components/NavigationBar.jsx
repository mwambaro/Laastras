import React from "react"
import PropTypes from "prop-types"
import HSpace from "./HorizontalSpace"

class NavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            rerender: false
        };
    }

    render()
    {
        let render_data = null;
        let figure_it_out = true;
        
        if(this.props.display_type)
        {
            figure_it_out = false;
            switch(this.props.display_type)
            {
                case 'flex':
                    render_data = this.renderNavigationBarAsFlexList();
                    break;
                case 'block-list':
                    render_data = this.renderNavigationBarAsModal();
                    break;
                case 'flex-block-list':
                    render_data = this.renderNavigationBarAsModal();
                    break;
                default:
                    figure_it_out = true;
                    break;
            }
        }

        if(figure_it_out)
        {
            if(this.state.rerender)
            {
                this.hspace = new HSpace('#navbar-list-group', this.props.parent_selector);
            }
            // Make sure 'this.state.rerender' state does not change between component
            // construction and first render
            if(!this.state.rerender) // just for precise size assessment
            {
                render_data = this.renderNavigationBarAsFlexList();
            }
            else if (this.hspace.horizontal_space_state.display_type === 'flex')
            {
                render_data = this.renderNavigationBarAsFlexList();
            }
            else if (this.hspace.horizontal_space_state.display_type === 'block-list')
            {
                render_data = this.renderNavigationBarAsModal();
            }
            else
            {
                render_data = this.renderNavigationBarAsModal();
            }
        }

        return render_data;
    }

    renderNavigationBarAsFlexList()
    {
        let ul_style = {
            display: 'flex'
        };

        return(this.renderNavigationBarAsList(ul_style));
    }

    renderNavigationBarAsBlockList()
    {
        let ul_style = {
            display: 'block'
        };

        return(this.renderNavigationBarAsList(ul_style));
    }

    renderNavigationBarAsList(ul_style)
    {   
        let navbar_ul_style = ul_style;
        let navbar_list_li_style = {
            listStyleType: 'none'
        };
        let text_style = {
            whiteSpace: 'nowrap'
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
                    <ul id="navbar-list-group" style={navbar_ul_style}>
                        {
                            this.props.laastras_actions.map((action, idx) =>
                                <li className="nav-item"
                                    key={`navbar-nav-item-li-${idx}`}
                                    style={navbar_list_li_style}>
                                    <a className="nav-link"
                                       id={`navbar-nav-item-list-a-${idx}-${action.dropdown_boolean}`}
                                       href={action.url}
                                       onClick={se => this.onClickNavbarNavLink(se)}>
                                        <span style={text_style}> {action.inner_text} </span>
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
        let text_style = {
            whiteSpace: 'nowrap'
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
                                                           <span style={text_style}> {action.inner_text} </span>
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
        this.setState({rerender: true});
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

        let boolean_id = null;
        let href_url = null;
        if(anchor.id)
        {
            boolean_id = anchor.id;
            href_url = anchor.href;
        }
        else
        {
            boolean_id = anchor.parentElement.id;
            href_url =  anchor.parentElement.href;
        }
        if(!boolean_id)
        {
            console.log('Dropdown boolean id could not be inferred. Damn!');
            return;
        }
        
        //console.log(`${anchor.innerText.trim()} (id): ${boolean_id}`);
        let m = boolean_id.match(/-(\d+)-(true|false)$/i);
        if(!m)
        {
            console.log('onClickNavbarNavLink: missing/invalid "dropdown_boolean" data in link object');
            return;
        }

        if(m[2].match(/^true$/i)) // Has dropdown
        {
            if(this.hspace)
            {
                if(this.hspace.horizontal_space_state.display_type !== 'flex')
                {
                    $('#navbar-modal').modal('hide');
                }
            }

            let html = "";
            try
            {
                let idx = parseInt(m[1]);
                let action = this.props.laastras_actions[idx];
                let inner_actions = action.data;
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
            if(!href_url)
            {
                console.log('No url was found.');
            }
            else
            {
                window.location = href_url;
            }
        }
    }
}

NavigationBar.propTypes = {
    laastras_actions: PropTypes.array, // array of {url: '', inner_text: '', dropdown_boolean: '', data: ''} hashes
    parent_max_width: PropTypes.number, // parent is an elt in which this component lives
    display_type: PropTypes.string, //one of these {null, 'flex', 'flex-block-list', 'block-list'}. Set to null to let the component decide
    parent_selector: PropTypes.string
};

export default NavigationBar