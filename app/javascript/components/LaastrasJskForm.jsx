import React from "react"
import PropTypes from "prop-types"
require('./CenterElement.js')

class LaastrasJskForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.redirect_uri = null;

    } // constructor

    render()
    {
        let form_elt_div_style = {
            padding: '5px'
        };

        let form_div_style = {
            padding: '10px'
        }

        return(
            <div id="laastras_jsk_form_main_div" className="container-fluid" style={form_div_style}>
                <div className="row justify-content-center">
                    <div className="col-md-8 shadow p-3 mb-5 bg-body rounded">
                        <div id="feedback" className="text-center"></div>
                        <h3 className="text-center" id="form-label"> {this.props.laastras_jsk_form_label} </h3>
                        <form role="form"
                              encType="multipart/form-data"
                              name="laastras_jsk_form"
                              id="laastras-jsk-form"
                              action={this.props.laastras_jsk_form_action_url}
                              style={{backgroundColor: '#464c94'}}>
                    
                            <div className="form-group" style={form_elt_div_style}>
                                <input type="text" name="location"
                                       className="form-control" id="location_jsk"
                                       placeholder={this.props.location_label}/>
                            </div>
                            <div className="text-center">
                                <span style={{padding: '5px', color: 'blue', backgroundColor: 'white'}}
                                      onClick={(se) => this.send_locate_request(se)}
                                      onMouseOver={(se) => this.on_mouse_over(se)}>
                                    {this.props.locate_label}
                                </span>
                            </div>
                    
                            <div className="form-group row" style={form_elt_div_style}>
                                <div className="col-sm-4">
                                    <select className="form-select" 
                                            aria-label="World Countries" 
                                            id="world-countries-list">
                                        {
                                            this.props.world_countries_countrycodes_list.map((country, idx) =>
                                                <option value={country} key={`world-country-${idx}`}>
                                                    {country}
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" name="phone_number"
                                           className="form-control" id="phone_number_jsk"
                                           placeholder={this.props.phone_number_label}/>
                                </div>
                            </div>

                            <div style={{color: 'white', fontWeight: 'bold', padding: '10px'}}>
                                {this.props.cv_label}:
                            </div>
                    
                            <div className="form-group" style={form_elt_div_style}>
                                <input type="file" name="file[uploaded_cv_file]"
                                       className="form-control" 
                                       id="jsk_cv_file"
                                       accept="application/pdf"/>
                            </div>

                            <div style={{color: 'white', fontWeight: 'bold', padding: '10px'}}>
                                {this.props.cover_letter_label}:
                            </div>

                            <div className="form-group" style={form_elt_div_style}>
                                <input type="file" name="file[uploaded_cover_letter_file]"
                                       className="form-control" 
                                       id="jsk_cover_letter_file"
                                       accept="application/pdf"/>
                            </div>
                    
                            <div className="text-center" style={form_elt_div_style}>             
                                <button type="submit" 
                                        className="btn btn-default"
                                        style={{backgroundColor: 'white'}}>
                                    {this.props.submit_label}
                                </button>
                            </div>  
                        </form>
                    </div>
                </div>
                <div id="laastras-wait-uploads-spinner" 
                    style={{
                        display: 'none',
                        zIndex: '99',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        position: 'fixed'
                }}>
                    <div className="spinner-border text-success" role="status" style={{width: '100px', height: '100px'}}>
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        $('#laastras_jsk_form_main_div').hvcenter();
        
        window.addEventListener('resize', (event)=>{
            $('#laastras_jsk_form_main_div').hvcenter();
        });

        this.hijackFormSubmitEvent();

    } // componentDidMount

    get_country_code(cc_map_s)
    {
        return /[^\(]+\s*\((\+*\d+)/i.exec(cc_map_s)[1];

    } // get_country_code

    send_locate_request(e)
    {
        //

    } // send_locate_request

    on_mouse_over(e)
    {
        e.target.style.cursor = 'pointer';

    } // on_mouse_over

    get_redirect_uri()
    {
        let uri = null;
        if(window.location.search)
        {
            let match = /\?redirect_uri=([^&]+)/.exec(window.location.search);
            if(match)
            {
                uri = decodeURIComponent(match[1]);
                console.log('Redirect URI: ' + uri);
            }
        }

        return uri;

    } // get_redirect_uri

    get_job_offer_id()
    {
        let id = null;
        if(window.location.search)
        {
            let match = /\?job_offer_id=([^&]+)/.exec(window.location.search);
            if(match)
            {
                id = parseInt(match[1]);
            }
        }

        return id;

    } // get_job_offer_id

    hijackFormSubmitEvent()
    {
        try 
        {
            //console.log("processing sign up form.");
            var $form = $('#laastras-jsk-form');
            $form.submit((event) => {
                try 
                {
                    event.preventDefault();
                    this.show_wait_spinner();
                    
                    var $this = $form;
                    // Validation code
                    //...
                    // this tells the server-side process that Ajax was used
                    $('input[name="usingAJAX"]',$this).val('true');
                    var url = $this.attr('action');
                    //console.log(`E-mail:${document.laastras_user_sign_up_form.email.value}`);
                    // See 
                    var form_data = new FormData();
                    form_data.append(
                        document.laastras_jsk_form.location.name, 
                        document.laastras_jsk_form.location.value
                    );
                    let country_code = this.get_country_code(
                        document.getElementById('world-countries-list').value
                    );
                    let phone_number = `${country_code}-${document.laastras_jsk_form.phone_number.value}`;
                    form_data.append(
                        document.laastras_jsk_form.phone_number.name, 
                        phone_number
                    );
                    form_data.append(
                        document.getElementById('jsk_cv_file').name, 
                        document.getElementById('jsk_cv_file').files[0]
                    );
                    form_data.append(
                        document.getElementById('jsk_cover_letter_file').name, 
                        document.getElementById('jsk_cover_letter_file').files[0]
                    );
                    form_data.append(
                        'job_offer_id', 
                        this.get_job_offer_id()
                    );
                    
                    var dataToSend = form_data;
                    var callback = (dataReceived) => {
                        // use the data received
                        //console.log(`RECEIVED: ${JSON.stringify(dataReceived)}`);
                        let data = JSON.parse(dataReceived);
                        let code = data.code;
                        let message = data.message;
                        this.redirect_uri = data.redirect_uri;
                        let html = '';
                        if(code === 1) // success
                        {
                            $this.hide();
                            $('#form-label').remove();
                            html = `
                                <div class="row" style="background-color: white; padding: 10px" id="verbose-message-div">
                                    <div class="col-sm-1 justify-content-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                        </svg>
                                    </div>
                                    <div class="col-sm-11 justify-content-start"> <p> ${message} </p> </div>
                                </div>`;
                        }
                        else // failure
                        {
                            html = `
                                <div class="row" id="verbose-message-div">
                                    <div class="col-sm-1 justify-content-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                    <div class="col-sm-11 justify-content-start"> <p> ${message} </p> </div>
                                </div>`;
                        }

                        if(this.redirect_uri)
                        {
                            window.location = this.redirect_uri;
                        }
                        else 
                        {
                            $('#verbose-message-div').remove();
                            //console.log('Feedback message removed');
                            $('#feedback').append(html);
                        }

                        this.hide_wait_spinner();
                    };

                    //console.log(`URL: ${url}, Data to send: ${dataToSend}`);

                    var typeOfDataToReceive = 'json';
                    $.ajax
                    ({
                        url: url,
                        type: 'POST',
                        data: dataToSend,
                        async: true,
                        cache: false,
                        contentType: false,
                        enctype: 'multipart/form-data',
                        processData: false
                    })
                    .done(callback)
                    .fail((error) => {
                        let message = `Failed to post sign up form: ${error.status}; ${error.statusText}`;
                        let html = `
                            <div class="row" id="verbose-message-div">
                                <div class="col-sm-1 justify-content-end">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                                <div class="col-sm-11 justify-content-start"> <p> ${message} </p> </div>
                            </div>`;
                        $('#verbose-message-div').remove();
                        $('#feedback').append(html);
                        this.hide_wait_spinner();
                    });
                }
                catch(error)
                {
                    let message = `Exception submit form function: ${error.message}`;
                    let html = `
                        <div class="row" id="verbose-message-div">
                            <div class="col-sm-1 justify-content-end">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            <div class="col-sm-11 justify-content-start"> <p> ${message} </p> </div>
                        </div>`;
                    $('#verbose-message-div').remove();
                    $('#feedback').append(html);
                    this.hide_wait_spinner();
                }
            });
        }
        catch(error) 
        {
            console.log(`Exception: ${error.message}`);
        }

    } // hijackFormSubmitEvent

    show_wait_spinner()
    {
        let spinner = document.getElementById('laastras-wait-uploads-spinner');
        if(spinner)
        {
            spinner.style.display = "block";
            $('#laastras-wait-uploads-spinner').css({  
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            });
            $('body').css('opacity', '0.5');
            this.center_spinner_in_the_viewport();
        }

    } // show_wait_spinner

    hide_wait_spinner()
    {
        let spinner = document.getElementById('laastras-wait-uploads-spinner');
        if(spinner)
        {
            spinner.style.position = 'fixed';
            spinner.style.display = "none";
            $('body').css('opacity', '1.0');
        }

    } // hide_wait_spinner

    center_spinner_in_the_viewport()
    {
        var viewportWidth = jQuery(window).width(),
        viewportHeight = jQuery(window).height(),
        $foo = jQuery('#laastras-wait-uploads-spinner'),
        elWidth = $foo.width(),
        elHeight = $foo.height(),
        elOffset = $foo.offset();
        jQuery(window)
            .scrollTop(elOffset.top + (elHeight/2) - (viewportHeight/2))
            .scrollLeft(elOffset.left + (elWidth/2) - (viewportWidth/2));

    } // center_spinner_in_the_viewport

}

LaastrasJskForm.propTypes = {
    laastras_jsk_form_label: PropTypes.string,
    laastras_jsk_form_action_url: PropTypes.string,
    location_label: PropTypes.string,
    locate_label: PropTypes.string,
    cv_label: PropTypes.string,
    cover_letter_label: PropTypes.string,
    world_countries_countrycodes_list: PropTypes.array,
    phone_number_label: PropTypes.string,
    submit_label: PropTypes.string
};

export default LaastrasJskForm;