import React from "react"
import PropTypes from "prop-types"
import {Modal} from "bootstrap"
import WaitSpinner from "./WaitSpinner.js"

class LaastrasCRM extends React.Component
{
    constructor(props)
    {
        super(props);
        this.rotation_degrees = 1;
        this.wait_spinner = null;
        this.pulled_data_modal = null;

    } // constructor

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-sm p-1 mb-2 bg-white rounded">
                            <div style={{padding: '10px', fontWeight: 'bold', color: 'blue'}} id={this.props.service_title_id}>
                            </div>
                            <hr />
                            <div style={{padding: '10px'}} id={this.props.service_id}>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="pull-data-section" className="modal fade" data-keyboard="false" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="locale-section-modal-close" type="button" className="close" aria-label="Close"
                                        onClick={se => this.close_pulled_data_section(se)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="pulled-data-body">
                            </div>
                            <div className="modal-footer">
                                <div className="text-center">
                                    <button type="button" id="action-response-ok-button" className="btn btn-primary"
                                            onClick={se => this.close_pulled_data_section(se)}>
                                        OK
                                    </button>
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
        this.pulled_data_modal = new Modal(document.getElementById('pull-data-section'));
        $(`#${this.props.service_id}`).append(
            this.props.laastras_crm_description
        );
        $(`#${this.props.service_title_id}`).append(this.props.laastras_crm_title);
        this.wait_spinner = new WaitSpinner('localization-span');
        this.handle_pulled_data();

    } // componentDidMount

    handle_pulled_data()
    {
        $('.pull-data').on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        });
        $('.pull-data').on('click', (e) => {
            this.wait_spinner.show_wait_spinner();
            e.preventDefault();
            let href = $(e.target).attr('data-href');
            $.get(href)
                .done((data) => {
                    let html = `
                        <div class=\u0022pulled-data\u0022> 
                            ${data} 
                        </div>
                    `;
                    $('.pulled-data').remove();
                    $('#pulled-data-body').append(html);
                    this.wait_spinner.hide_wait_spinner();
                    this.pulled_data_modal.show();
                })
                .fail((error) => {
                    this.wait_spinner.hide_wait_spinner();
                    alert('We failed to get the project proposal in Kirundi locale.');
                });
        });

    } // handle_pulled_data

    close_pulled_data_section(e)
    {
        this.pulled_data_modal.hide();
        let hash = window.location.hash;
        let href = window.location.href.replace(hash, '');
        window.location.assign(`${href}#localization`);
        window.location.reload(true);

    } // close_pulled_data_section

}

LaastrasCRM.propTypes = {
    laastras_crm_title: PropTypes.string,
    laastras_crm_description: PropTypes.string,
    service_id: PropTypes.string,
    service_title_id: PropTypes.string
}

export default LaastrasCRM