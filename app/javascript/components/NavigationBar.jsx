import React from "react"
import PropTypes from "prop-types"
import NavigationBarDropdownItem from "./NavigationBarDropdownItem"

class NavigationBar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.navigation_bar_type = 'list';
    }

    render()
    {
        //console.log('Services count: ' + this.props.laastras_services.length);
        
        return(
            <div id="navbar-outer">
                <div id="servicesDropdownModal" className="modal fade" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="services-dropdown-modal-close" type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul id="services-list-ul">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="navbar-items">
                    <ul id="navbar-list-group">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="servicesDropdownLink" role="button" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                {this.props.services_inner_text} 
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={this.props.hire_us_url}> {this.props.hire_us_inner_text} </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={this.props.donate_url}> {this.props.donate_inner_text} </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={this.props.sign_in_url}> {this.props.sign_in_inner_text} </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={this.props.sign_up_url}> {this.props.sign_up_inner_text} </a>
                        </li>
                    </ul>
                </div>        
            </div>
        );
    }

    componentDidMount()
    {
        //console.log('navigation bar type (component did mount): ' + this.navigation_bar_type);
        $('#servicesDropdownLink').click(e => {
            if(this.navigation_bar_type === 'modal')
            {
                $('#navbar-items').modal('hide');
            }

            let services_list_html = "";
            this.props.laastras_services.map((service, idx) => {
                services_list_html += `
                    <li class="nav-item" style="list-style-type: none;">
                        <a href="${service.url}" class="nav-link">
                            ${service.inner_text}
                        </a>
                    </li>
                `;
            });
            $('#services-list-ul').empty();
            $('#services-list-ul').append(services_list_html);
            $('#servicesDropdownModal').modal('show');
        })
        $('#services-dropdown-modal-close').click(e => {
            $('#servicesDropdownModal').modal('hide');
            if(this.navigation_bar_type === 'modal')
            {
                $('#navbar-items').modal('show');
            }
        });

        this.designNavigationBar();
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        let should = true;

        if(this.props.parent_max_width === nextProps.parent_max_width)
        {
            //should = false;
        }
        //console.log('shouldComponentUpdate: ' + should);

        return should;
    }

    componentDidUpdate(prevProps, prevState)
    {
        //console.log('navigation bar type (component did update): ' + this.navigation_bar_type);
        this.designNavigationBar();
    }

    designNavigationBar()
    {
        if(typeof(this) === 'undefined')
        {
            console.log("designNavigationBar: 'this' object is undefined.");
            return;
        }

        try
        {
            
            $('#navbar-list-group li').css("list-style-type", "none");
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
                this.navigation_bar_max_with = maxWidth;
                this.navigation_bar_total_width = totalWidth;
            }

            //console.log(`Parent max width (Nav): ${this.props.parent_max_width}; Total width: ${totalWidth}; Max width: ${maxWidth}`);
            if(this.props.parent_max_width >= totalWidth) // Flex
            {
                if(this.navigationBarListGroup)
                {
                    $('#navbar-items').remove();
                    $(`#${this.navigation_bar_modal_launch}`).remove();
                    $('#navbar-outer').append(`
                        <div id="navbar-items">
                        </div>
                    `);
                    $('#navbar-items').append(this.navigationBarListGroup);
                    console.log('Just appended buffered navigation nodes');
                }
                $('#navbar-list-group').css("display", "flex");
                this.navigation_bar_type = 'flex';
            }
            else // modal
            {
                // 0. Reset default list display
                $('#navbar-list-group').css("display", "table-cell");
                // 1. add modal properties
                $('#navbar-items').addClass('modal fade');
                $('#navbar-items').data('data-keyboard', 'false');
                $('#navbar-items').data('data-backdrop', 'static')
                $('#navbar-items').data('tabindex', '-1');
                $('#navbar-items').data('aria-labelledby', 'NavigationBar');
                $('#navbar-items').data('aria-hidden', 'true');
                // 2. buffer child nodes
                this.navigationBarListGroup = $('#navbar-items').contents().filter($('#navbar-list-group'));
                // 3. add intermediary nodes needed by modal
                $('#navbar-items').empty();
                let id = "navigation-bar-modal-content";
                $('#navbar-items').append(`
                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div id="${id}" class="modal-content">
                        </div>
                    </div>
                `);
                let btn_id = 'navigation-bar-modal-close-btn-id';
                let modal_body_id = "navigation-bar-modal-body-id";
                $(`#${id}`).append(`
                    <div class="modal-header text-right">
                        <button id="${btn_id}" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="${modal_body_id}" class="modal-body">
                    </div>
                `);             
                // 4. add buffered child nodes as modal body
                $(`#${modal_body_id}`).append(this.navigationBarListGroup);
                // 5. Prepend/Append an elt that fires the modal
                let div_id = 'navigation-bar-modal-launch';
                let div = `
                    <div id="${div_id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#5a49b6" class="bi bi-list-ul" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                    </div>
                `
                this.navigation_bar_modal_launch = div_id;
                $('#navbar-items').after(div);
                $(`#${div_id}`).click(e => {
                    $('#navbar-items').modal('show');
                });
                $(`#${div_id}`).hover(e => {
                    $(e.target).css("cursor", "pointer");
                });
                
                $(`#${btn_id}`).click(e => {
                    //console.log('Btn for modal clicked ...');
                    $('#navbar-items').modal('hide');
                });
                // 7. Set the navigation bar type
                this.navigation_bar_type = 'modal';
            }
        }
        catch(error)
        {
            console.log("designNavigationBar: " + error);
        }
    }
}

NavigationBar.propTypes = {
    sign_in_url: PropTypes.string,
    sign_in_inner_text: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_up_inner_text: PropTypes.string,
    services_inner_text: PropTypes.string,
    laastras_services: PropTypes.array, // array of {url: '', inner_text: ''} hashes
    hire_us_inner_text: PropTypes.string,
    hire_us_url: PropTypes.string,
    donate_inner_text: PropTypes.string,
    donate_url: PropTypes.string,
    parent_max_width: PropTypes.number // parent is an elt in which this component lives
};

export default NavigationBar