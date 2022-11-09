import React from "react"
import PropTypes from "prop-types"
import WaitSpinner from "./WaitSpinner.js"
require('./CenterElement.js')

class LaastrasSendMail extends React.Component
{
    constructor(props)
    {
        super(props);
        this.redirect_uri = null;
        this.wait_spinner = null;
        this.email_details = this.get_destination_email_details();

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
            <div id="laastras_send_mail_main_div" className="container-fluid" style={form_div_style}>
                <div className="row justify-content-center">
                    <div className="col-md-5 shadow p-3 mb-5 bg-body rounded">
                        <div id="feedback" className="text-center"></div>
                        <h3 className="text-center" id="form-label"> {this.props.mailer.laastras_send_mail_form_label} </h3>
                        <form role="form"
                                  name="laastras_send_mail_form"
                                  id="laastras-send-mail-form"
                                  action={this.props.mailer.laastras_send_mail_action_url}
                                  style={{backgroundColor: 'blue'}}>

                                <div className="form-group" style={form_elt_div_style}>
                                    <input type="text" name="subject"
                                           className="form-control" id="email_subject"
                                           placeholder={this.props.mailer.subject_label}/>
                                </div>

                                <div className="form-group" style={form_elt_div_style}>
                                    <input type="text" name="email"
                                           className="form-control" id="your_email"
                                           placeholder={this.props.mailer.your_email_label}/>
                                </div>

                                <div className="form-group" style={form_elt_div_style}>
                                    <textarea
                                        className="form-control"
                                        id="mail_body"
                                        placeholder={this.props.mailer.body_placeholder_text}
                                        rows="10"
                                        name="body">
                                    </textarea>
                                </div>
                    
                                <div className="text-center" style={form_elt_div_style}>             
                                    <button type="submit" 
                                            className="btn btn-default"
                                            style={{backgroundColor: 'white'}}>
                                        {this.props.mailer.submit_label}
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
        $('#laastras_send_mail_main_div').hvcenter();

        if(this.email_details)
        {
            if(this.email_details.subject)
            {
                document.laastras_send_mail_form.subject.value = this.email_details.subject;
            }
        }
        
        window.addEventListener('resize', (event)=>{
            $('#laastras_send_mail_main_div').hvcenter();
        });
        this.wait_spinner = new WaitSpinner();
        this.hijackFormSubmitEvent();

    } // componentDidMount

    get_destination_email_details()
    {
        let email_details = null;
        if(window.location.search)
        {
            let email = null;
            let subject = null;
            let match = /to_email=([^&]+)/.exec(window.location.search);
            if(match)
            {
                email = decodeURIComponent(match[1]);
                console.log('destination email: ' + email);
            }

            match = /subject=([^&]+)/.exec(window.location.search);
            if(match)
            {
                subject = decodeURIComponent(match[1]).replaceAll('-', ' ');
                console.log('destination email: ' + subject);
            }

            email_details = {
                to_email: email,
                subject: subject
            };
        }

        return email_details;

    } // get_destination_email_details

    hijackFormSubmitEvent()
    {
        try 
        {
            //console.log("processing sign up form.");
            var $form = $('#laastras-send-mail-form');
            $form.submit((event) => {
                try 
                {
                    event.preventDefault();
                    
                    this.wait_spinner.show_wait_spinner();

                    var $this = $form;
                    // Validation code
                    //...
                    // this tells the server-side process that Ajax was used
                    $('input[name="usingAJAX"]',$this).val('true');
                    var url = $this.attr('action');
                    //console.log(`E-mail:${document.laastras_send_mail_form.email.value}`);
                    let to_email = null;
                    if(this.email_details)
                    {
                        if(this.email_details.to_email)
                        {
                            to_email = decodeURIComponent(this.email_details.to_email);
                        }
                    }

                    //console.log('to_email: ' + to_email);

                    var form_data = {
                        email: document.laastras_send_mail_form.email.value,
                        subject: document.laastras_send_mail_form.subject.value,
                        body: document.laastras_send_mail_form.body.value,
                        to_email: to_email
                    };
                    var dataToSend = form_data;
                    var callback = (dataReceived, status, xq) => {
                        // use the data received
                        let code = parseInt(dataReceived.code);
                        let message = dataReceived.message;
                        //console.log('Message: ' + message + '; Code: ' + code);
                        let html = '';
                        let success = true;
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
                                    <div class="col-sm- justify-content-start"> <p id="verbose-p"> ${message} </p> </div>
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
                                    <div class="col-sm-11 justify-content-start"> <p id="verbose-p"> ${message} </p> </div>
                                </div>
                                `;
                            success = false;
                            console.log('Sign in failed.')
                        }

                        $('#verbose-message-div').remove();
                        //console.log('Feedback message removed');
                        $('#feedback').append(html);

                        this.wait_spinner.hide_wait_spinner();
                    };

                    //console.log(`URL: ${url}, Data to send: ${dataToSend}`);

                    var typeOfDataToReceive = 'json';
                    $.post(url, dataToSend, callback, typeOfDataToReceive)
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
                                <div class="col-sm-11 justify-content-start"> <p id="verbose-p"> ${message} </p> </div>
                            </div>`;
                        $('#verbose-message-div').remove();
                        $('#feedback').append(html);
                        this.wait_spinner.hide_wait_spinner();
                    });
                }
                catch(error)
                {
                    let message = `Exception submit form function: ${error}`;
                    let html = `
                        <div class="row" id="verbose-message-div">
                            <div class="col-sm-1 justify-content-end">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            <div class="col-sm-11 justify-content-start"> <p id="verbose-p"> ${message} </p> </div>
                        </div>`;
                    $('#verbose-message-div').remove();
                    $('#feedback').append(html);
                    this.wait_spinner.hide_wait_spinner();
                }
            });
        }
        catch(error) 
        {
            console.log(`Exception: ${error}`);
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

LaastrasSendMail.propTypes = {
    mailer: PropTypes.object
};

export default LaastrasSendMail;