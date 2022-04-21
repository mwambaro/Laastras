import React from "react"
import PropTypes from "prop-types"
import HSpace from "./HorizontalSpace"

require("./CenterElement");

class SocialMediaShare extends React.Component
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
                    render_data = this.renderSocialMediaShareAsFlexList();
                    break;
                case 'block-list':
                    render_data = this.renderSocialMediaShareAsModal();
                    break;
                case 'flex-block-list':
                    render_data = this.renderSocialMediaShareAsModal();
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
                if(!this.hspace)
                {
                    this.hspace = new HSpace('#social-media-ul-list', this.props.parent_selector);
                }
                this.hspace.assessViewPortSize(this.props.parent_max_width);
            }
            // Make sure 'this.state.rerender' state does not change between component
            // construction and first render
            if(!this.state.rerender) // just for precise size assessment
            {
                render_data = this.renderSocialMediaShareAsFlexList();
            }
            else if (this.hspace.horizontal_space_state.display_type === 'flex')
            {
                render_data = this.renderSocialMediaShareAsFlexList();
            }
            else if (this.hspace.horizontal_space_state.display_type === 'block-list')
            {
                render_data = this.renderSocialMediaShareAsModal();
            }
            else
            {
                render_data = this.renderSocialMediaShareAsModal();
            }
        }

        return render_data;
    }

    renderSocialMediaShareAsBlockList()
    {
        let ul_style = {
            display: 'block'
        };

        return(this.renderSocialMediaShareAsList(ul_style));
    }

    renderSocialMediaShareAsFlexList()
    {
        let ul_style = {
            display: 'flex'
        };

        return(this.renderSocialMediaShareAsList(ul_style));
    }

    renderSocialMediaShareAsList(ul_style)
    {
        let soms_ul_style = ul_style;
        let soms_li_style = {
            listStyleType: 'none',
            padding: '2px',
            margin: '4px'
        };

        return(
            <div id="social-media-component">
                <div>
                    <ul id="social-media-ul-list" style={soms_ul_style}>
                        <li style={soms_li_style}
                            id="li-twitter">
                            <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                 onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                 id="li-bi-twitter"
                                 xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                        </li>
                        <li style={soms_li_style}
                            id="li-linkedin">
                            <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                 onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                 id="li-bi-linkedin"
                                 xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                            </svg>
                        </li>
                        <li style={soms_li_style}
                            id="li-facebook">
                            <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                 onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                 id="li-bi-facebook"
                                 xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                        </li>
                        <li style={soms_li_style}
                            id="li-youtube">
                            <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                 onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                 id="li-bi-youtube"
                                 xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.122C.002 7.343.01 6.6.064 5.78l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                            </svg>
                        </li>
                        <li style={soms_li_style}
                            id="li-instagram">
                            <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                 onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                 id="li-bi-instagram"
                                 xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    renderSocialMediaShareAsModal()
    {
        let cell_svg_style = {
            display: 'flex',
            justifyContent: 'center'
        };

        return(
            <div id="social-media-component">
                <div id="social-media-share-modal" className="modal fade" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="servicesDropdownList" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="social-media-share-modal-close" type="button" className="close" aria-label="Close"
                                        onClick={se => this.onClickSocialMediaShareModalCloseBtn(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div id="social-media-share-modal-body" className="modal-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div id="td-twitter"
                                                     style={cell_svg_style}>
                                                    <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                                         onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                                         id="td-bi-twitter"
                                                         xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id="td-linkedin"
                                                     style={cell_svg_style}>
                                                    <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                                         onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                                         id="td-bi-linkedin"
                                                         style={cell_svg_style}
                                                         xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id="td-facebook"
                                                     style={cell_svg_style}>
                                                    <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                                         onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                                         id="td-bi-facebook"
                                                         style={cell_svg_style}
                                                         xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id="td-youtube"
                                                     style={cell_svg_style}>
                                                    <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                                         onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                                         id="td-bi-youtube"
                                                         style={cell_svg_style}
                                                         xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.122C.002 7.343.01 6.6.064 5.78l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div id="td-instagram"
                                                     style={cell_svg_style}>
                                                    <svg onClick={se => this.onClickSocialMediaIconCell(se)}
                                                         onMouseOver={se => this.onMouseOverSocialMediaIconCell(se)}
                                                         id="td-bi-instagram"
                                                         style={cell_svg_style}
                                                         xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                                    </svg>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="social-media-share-modal-launch"
                     onClick={se => this.onClickSocialMediaModalLaunch(se)}
                     onMouseOver={se => this.onHoverSocialMediaModalLaunch(se)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1ecbe1" className="bi bi-share-fill" viewBox="0 0 16 16">
                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this.setState({
            rerender: true
        });
    }

    onClickSocialMediaShareModalCloseBtn(e)
    {
        $('#social-media-share-modal').modal('hide');
    }

    onClickSocialMediaIconCell(e)
    {
        $('#social-media-share-modal').modal('hide');

        if(typeof(e) === 'undefined')
        {
            console.log('onClickSocialMediaIconCell: event object is not defined');
            return;
        }
        let cell = e.target;
        if(!cell)
        {
            console.log('onClickSocialMediaIconCell: target object is not set');
            return;
        }

        let soms_type = null;
        let sclass = cell.getAttribute('class');
        try
        {
            if(!cell.id)
            {
                soms_type = sclass;
            }
            else
            {
                soms_type = cell.id;
            }
            if(!soms_type)
            {
                soms_type = cell.parentElement.id;
            }
        }
        catch(error)
        {
            console.log('onClickSocialMediaIconCell: ' + error);
        }

        if(!soms_type)
        {
            console.log('Damn it! No social media type can be inferred. Id: ' + cell.id + '; class: ' + sclass + '; parent id: ' + cell.parentElement.id);
            return;
        }

        if(soms_type.match(/\Wfacebook\W*/i))
        {
            console.log('We have facebook social media');
            let data = this.props.social_media_data.facebook;
            if(data)
            {
                /*
                FB.ui({
                    method: 'share',
                    href: data.href,
                    hashtag: data.hashtag,
                    quote: data.quote
                }, function(response){
                    console.log('FB.ui: ' + response.error_message);
                });
                */
            }
        }
        else if(soms_type.match(/\Wlinkedin\W*/i))
        {
            console.log('We have linkedin social media');
        }
        else if(soms_type.match(/\Winstagram\W*/i))
        {
            console.log('We have instagram social media');
        }
        else if(soms_type.match(/\Wtwitter\W*/i))
        {
            console.log('We have twitter social media');
        }
        else if(soms_type.match(/\Wyoutube\W*/i))
        {
            console.log('We have youtube social media');
        }
        else
        {
            console.log('Could not find social media platform according to: ' + soms_type);
        }
    }

    onMouseOverSocialMediaIconCell(e)
    {
        if(typeof(e) === 'undefined')
        {
            console.log('onMouseOverSocialMediaIconCell: event object is not defined');
            return;
        }
        let cell = e.target;
        if(!cell)
        {
            console.log('onMouseOverSocialMediaIconCell: target object is not set');
            return;
        }

        cell.style.cursor = "pointer";
    }

    onClickSocialMediaModalLaunch(e)
    {
        $('#social-media-share-modal').modal('show');
    }

    onHoverSocialMediaModalLaunch(e)
    {
        if(typeof(e) === 'undefined')
        {
            console.log('onHoverSocialMediaModalLaunch: event object is not defined');
            return;
        }
        let cell = e.target;
        if(!cell)
        {
            console.log('onHoverSocialMediaModalLaunch: target object is not set');
            return;
        }

        cell.style.cursor = "pointer";
    }
}

SocialMediaShare.propTypes = {
    /*
    A hash {
        facebook: {
            href: PropTypes.string,
            hashtag: PropTypes.string,
            quote: PropTypes.string
        } 
    } of social media specific data
    */
    social_media_data: PropTypes.object,
    parent_selector: PropTypes.string,
    display_type: PropTypes.string, //one of these {null, 'flex', 'flex-block-list', 'block-list'}. Set to null to let the component decide
    parent_max_width: PropTypes.number
};

export default SocialMediaShare