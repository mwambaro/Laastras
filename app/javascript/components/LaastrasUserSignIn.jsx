import React from "react"
import PropTypes from "prop-types"
import WaitSpinner from "./WaitSpinner.js"
require('./CenterElement.js')

class LaastrasUserSignIn extends React.Component
{
    constructor(props)
    {
        super(props);
        this.redirect_uri = null;
        this.wait_spinner = null;

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
            <div id="laastras_user_sign_in_main_div" className="container-fluid" style={form_div_style}>
                <div className="row justify-content-center">
                    <div className="col-md-5 shadow p-3 mb-5 bg-body rounded">
                        <div id="feedback" className="text-center"></div>
                        <h3 className="text-center" id="form-label"> {this.props.laastras_user_sign_in_form_label} </h3>
                        <form role="form"
                                  name="laastras_user_sign_in_form"
                                  id="laastras-user-sign-in-form"
                                  action={this.props.laastras_user_sign_in_action_url}
                                  style={{backgroundColor: '#944653'}}>
                    
                                <div className="form-group" style={form_elt_div_style}>
                                    <input type="text" name="email"
                                           className="form-control" id="email_sign_in"
                                           placeholder={this.props.email}/>
                                </div>
                    
                                <div className="form-group" style={form_elt_div_style}>
                                    <input type="password" name="password"
                                           className="form-control" id="password_sign_in"
                                           placeholder={this.props.password}/>
                                </div>
                    
                                <div className="text-center" style={form_elt_div_style}>             
                                    <button type="submit" 
                                            className="btn btn-default"
                                            style={{backgroundColor: 'white'}}>
                                        {this.props.submit_label}
                                    </button>
                                </div>
                        </form>
                        <div className="row" style={{padding: '10px'}} id="reset-password-section">
                            <div className="col-md-8" 
                                 id="reset-password-div"
                                 data-href={this.props.reset_password_url} 
                                 style={{textDecoration: 'none', color: 'blue', marginBottom: '10px'}}
                                 onClick={(se) => this.send_reset_request(se)}>
                                    {this.props.forgot_password_prompt}
                            </div>
                            <div className="col-md-4" style={{marginBottom: '10px'}}>
                                <a href={this.props.sign_up_url} style={{textDecoration: 'none'}}>
                                    {this.props.sign_up_label}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sign-in-spinner"></div>
            </div>
        );

    } // render

    componentDidMount()
    {
        $('#laastras_user_sign_in_main_div').hvcenter();
        
        window.addEventListener('resize', (event)=>{
            $('#laastras_user_sign_in_main_div').hvcenter();
        });
        $('#reset-password-div').on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        });
        this.wait_spinner = new WaitSpinner('sign-in-spinner');
        this.hijackFormSubmitEvent();

    } // componentDidMount

    send_reset_request(e)
    {
        let email = document.laastras_user_sign_in_form.email.value;
        //console.log('email: ' + typeof(email));
        if(email === this.props.email || typeof(email) === 'undefined' || email === '')
        {
            let html = `
                <div class="col-md-8 email-prompt" style="padding: 5px; color: red; font-weight: bold">
                    ${this.props.input_email_prompt}
                </div>
            `;
            $('.email-prompt').remove();
            $('#reset-password-div').prepend(html);
        }
        else 
        {
            let enc_email = encodeURIComponent(email);
            window.location = this.props.reset_password_url + `?email=${enc_email}`;
        }

    } // send_reset_request

    get_redirect_uri()
    {
        let uri = null;
        if(window.location.search)
        {
            let match = /redirect_uri=([^&]+)/.exec(window.location.search);
            if(match)
            {
                uri = decodeURIComponent(match[1]);
                console.log('Redirect URI: ' + uri);
            }
        }

        return uri;

    } // get_redirect_uri

    hijackFormSubmitEvent()
    {
        try 
        {
            //console.log("processing sign up form.");
            var $form = $('#laastras-user-sign-in-form');
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
                    //console.log(`E-mail:${document.laastras_user_sign_in_form.email.value}`);
                    var form_data = {
                        email: document.laastras_user_sign_in_form.email.value,
                        password: document.laastras_user_sign_in_form.password.value,
                        redirect_uri: this.get_redirect_uri()
                    };
                    var dataToSend = form_data;
                    var callback = (dataReceived, status, xq) => {
                        // use the data received
                        let code = parseInt(dataReceived.code);
                        let message = dataReceived.message;
                        this.redirect_uri = dataReceived.redirect_uri;
                        //console.log('Message: ' + message + '; Code: ' + code);
                        let html = '';
                        let success = true;
                        if(code === 1) // success
                        {
                            $this.hide();
                            $('#form-label').remove();
                            $('#reset-password-section').remove();
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

                        if(
                            (
                                typeof(this.redirect_uri) != 'undefined' ||
                                this.redirect_uri != ''
                            ) && success
                        ){
                            window.location = this.redirect_uri;
                        }
                        else 
                        {
                            $('#verbose-message-div').remove();
                            //console.log('Feedback message removed');
                            $('#feedback').append(html);
                            console.log('Sign in failure message displayed');
                        }

                        setTimeout((e) => {
                            this.wait_spinner.hide_wait_spinner();
                        }, 1000);
                    };

                    //console.log(`URL: ${url}, Data to send: ${dataToSend}`);

                    var typeOfDataToReceive = 'json';
                    $.post(url, dataToSend, callback, typeOfDataToReceive)
                    .fail((error) => {
                        let message = `Failed to post sign up form: ${error}`;
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
                        setTimeout((e) => {
                            this.wait_spinner.hide_wait_spinner();
                        }, 1000);
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
                    setTimeout((e) => {
                        this.wait_spinner.hide_wait_spinner();
                    }, 1000);
                }
            });
        }
        catch(error) 
        {
            console.log(`Exception: ${error}`);
        }

    } // hijackFormSubmitEvent

}

LaastrasUserSignIn.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    submit_label: PropTypes.string,
    laastras_user_sign_in_form_label: PropTypes.string,
    laastras_user_sign_in_action_url: PropTypes.string,
    reset_password_url: PropTypes.string,
    forgot_password_prompt: PropTypes.string,
    sign_up_url: PropTypes.string,
    sign_up_label: PropTypes.string,
    input_email_prompt: PropTypes.string
};

export default LaastrasUserSignIn;