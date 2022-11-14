import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"

class LaastrasContract extends React.Component
{
    constructor(props)
    {
        super(props);
        this.rotation_degrees = 1;

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}} id={this.props.contract_title_id}>
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id={this.props.contract_id}>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="definition-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div id="definition-body">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } // render

    componentDidMount()
    {
        this.definition_modal = new Modal(
            document.getElementById('definition-section')
        );
        $(`#${this.props.contract_id}`).append(
            this.props.description
        );
        $(`#${this.props.contract_title_id}`).append(this.props.title);

        $('#definition-section').on('click', (e) => {
            this.leave_definition_modal(e);
        })
        .on('blur', (e) => {
            this.leave_definition_modal(e);
        });

        this.manage_definitions();

    } // componentDidMount

    leave_definition_modal(e)
    {
        this.definition_modal.hide();

    } // leave_definition_modal

    manage_definitions()
    {
        let selector = $('span');
        selector.css({
            color: 'blue',
            cursor: 'pointer'
        });

        selector.on('click', (e) => {
            this.show_definition(e);
        })
        
    } // manage_definitions

    show_definition(e)
    {
        let id = null;
        let dataId = $(e.target).attr('data-id');
        if(dataId !== '' && typeof(dataId) !== 'undefined' && !/^\s+$/.test(dataId))
        {
            id = dataId;
            console.log('Data id: ' + id);
        }
        else 
        {
            try 
            {
                let wregex = /(\w)/i;
                let sregex = /\s+/;
                id = $(e.target).html()
                        .replaceAll(wregex, '$1'.toLowerCase())
                        .replaceAll(sregex, '-');
                //console.log('ID: ' + id);
                let elt = document.getElementById(id);
                if(!elt)
                {
                    throw 'Failed to find id';
                }
            }
            catch(exp)
            {
                let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let string = $(e.target).html();
                for(let i in alphabet)
                {
                    string = string.replaceAll(alphabet[i], alphabet[i].toLowerCase());
                }
                string = string.replaceAll(' ', '-');
                //console.log('ID: ' + string);
                id = string;
            }
        }

        if(id !== null)
        {
            let html = $(`#${id}`).html();
            //console.log(html);
            html = `
                <div class="definition-modal-html"> 
                    <hr/>
                    ${html}
                    <hr/>
                </div>
            `;
            $('.definition-modal-html').remove();
            $('#definition-body').append(html);
            this.definition_modal.show();
        }

    } // show_definition
    
}

LaastrasContract.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    contract_id: PropTypes.string,
    contract_title_id: PropTypes.string
}

export default LaastrasContract