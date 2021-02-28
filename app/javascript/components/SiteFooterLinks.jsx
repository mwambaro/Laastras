import React from "react"
import PropTypes from "prop-types"
import HSpace from "./HorizontalSpace"

class SiteFooterLinks extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            rerender: false
        };
        this.hspace = null;
    }

    render()
    {
        if(this.state.rerender)
        {
            if(!this.hspace)
            {
                this.hspace = new HSpace('#footer-links-ul-list', this.props.parent_max_width);
            }
        }
        
        let render_data = null;
        
        if(!this.hspace) // UX-invalid, just for precise size assessment
        {
            render_data = this.renderFooterLinksAsBlockList();
        }
        else if (this.hspace.horizontal_space_state.display_type === 'flex')
        {
            render_data = this.renderFooterLinksAsFlexList();
        }
        else if (this.hspace.horizontal_space_state.display_type === 'block-list')
        {
            render_data = this.renderFooterLinksAsTable();
        }
        else
        {
            render_data = this.renderFooterLinksAsTable();
        }

        return render_data;
    }

    renderFooterLinksAsTable()
    {
        return(
            <div>
                <div>
                    <table className="table">
                        <tbody id="footer-links-table-body">
                            {
                                this.props.footer_actions.map((action, idx) => 
                                    <tr key={`footer-table-tr-${idx}`}>
                                        <td>
                                            <a className="nav-link"
                                                href={action.url}>
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
        );
    }

    renderFooterLinksAsBlockList()
    {
        let footer_ul_style = {
            display: 'block'
        };

        return(this.renderFooterLinksAsList(footer_ul_style));
    }

    renderFooterLinksAsFlexList()
    {
        let footer_ul_style = {
            display: 'flex'
        };

        return(this.renderFooterLinksAsList(footer_ul_style));
    }

    renderFooterLinksAsList(ul_style)
    {
        let footer_ul_style = ul_style;
        let footer_li_style = {
            listStyleType: 'none'
        };
        let text_style = {
            whiteSpace: 'nowrap'
        }

        return(
            <div>
                <div>
                    <ul id="footer-links-ul-list" style={footer_ul_style}>
                        {
                            this.props.footer_actions.map((action, idx) => 
                                <li key={`footer-ul-li-${idx}`} 
                                    className="nav-item" 
                                    style={footer_li_style}>
                                    <a className="nav-link"
                                       href={action.url}>
                                       <span style={text_style}>{action.inner_text}</span>
                                    </a>
                                </li>
                            )
                        }
                    </ul>
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
}

SiteFooterLinks.propTypes = {
    footer_actions: PropTypes.array, // an array of {url:, inner_text:} hashes
    parent_max_width: PropTypes.number
};

export default SiteFooterLinks