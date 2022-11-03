import React from "react"
import PropTypes from "prop-types"
import WaitSpinner from "./WaitSpinner.js"
require('./CenterElement.js')

class LaastrasUserSignUp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.wait_spinner = null;
        this.reset_data = this.get_reset_data();

    } // constructor

    render()
    {
        let form_elt_div_style = {
            padding: '5px'
        };

        let form_div_style = {
            padding: '10px'
        }

        if(this.reset_data)
        {
            form_elt_div_style = {
                padding: '5px',
                display: 'none'
            };
        }

        return(
            <div id="laastras_user_sign_up_main_div" className="container-fluid" style={form_div_style}>
                <div className="row justify-content-center">
                    <div className="col-md-5 shadow p-3 mb-5 bg-body rounded">
                        <div id="feedback" className="text-center"></div>
                        <h3 className="text-center" id="form-label"> {this.props.laastras_user_sign_up_form_label} </h3>
                        <form role="form"
                              name="laastras_user_sign_up_form"
                              id="laastras-user-sign-up-form"
                              action={this.props.laastras_user_sign_up_action_url}
                              style={{backgroundColor: '#464c94'}}>
                    
                            <div className="form-group" style={form_elt_div_style} id="email-div">
                                <input type="text" name="email"
                                       className="form-control" id="email_sign_up"
                                       placeholder={this.props.email}/>
                            </div>
                    
                            <div className="form-group" style={form_elt_div_style} id="first-name-div">
                                <input type="text" name="first_name"
                                       className="form-control" id="first_name_sign_up"
                                       placeholder={this.props.first_name}/>
                            </div>
                    
                            <div className="form-group" style={form_elt_div_style} id="last-name-div">
                                <input type="text" name="last_name"
                                       className="form-control" id="last_name_sign_up"
                                       placeholder={this.props.last_name}/>
                            </div>

                            <div className="form-group" style={form_elt_div_style} id="user-name-div">
                                <input type="text" name="user_name"
                                       className="form-control" id="user_name_sign_up"
                                       placeholder={this.props.user_name}/>
                            </div>

                            <div style={form_elt_div_style} id="employee-div">
                                <label style={{color: 'white', fontWeight: 'bold'}}> 
                                    {this.props.are_you_laastras_employee_label} 
                                </label>
                                <select className="form-select" aria-label="Laastras employee select" id="laastras-sign-up-employee">
                                    <option value={this.props.no_label}>{this.props.no_label}</option>
                                    <option value={this.props.yes_label}>{this.props.yes_label}</option>
                                </select>
                            </div>
                    
                            <div className="form-group" style={form_elt_div_style} id="password-div">
                                <input type="password" name="password"
                                       className="form-control" id="password_sign_up"
                                       placeholder={this.props.password}/>
                            </div>
                    
                            <div className="form-group" style={form_elt_div_style} id="password-confirmation-div">
                                <input type="password" name="password_confirmation" 
                                       className="form-control" id="password_confirmation_sign_up"
                                       placeholder={this.props.password_confirmation}/>
                            </div>
                    
                            <div className="text-center" style={{padding: '5px'}}>             
                                <button type="submit" 
                                        className="btn btn-default"
                                        style={{backgroundColor: 'white'}}>
                                    {this.props.submit_label}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div id="sign-up-spinner"></div>
            </div>
        );

    } // render

    componentDidMount()
    {
        $('#laastras_user_sign_up_main_div').hvcenter();
        
        window.addEventListener('resize', (event)=>{
            $('#laastras_user_sign_up_main_div').hvcenter();
        });

        if(this.reset_data)
        {
            this.display_reset_password_form();
        }

        this.wait_spinner = new WaitSpinner('sign-up-spinner');

        this.manageEditMode();
        this.hijackFormSubmitEvent();

    } // componentDidMount

    get_reset_data()
    {
        let  reset_data = null;
        //console.log('search: ' + window.location.search);
        if(window.location.search)
        {
            let match = /reset_pwd=([^&]+)/.exec(window.location.search);
            if(match)
            {
                let val = match[1];
                //console.log('val: ' + val);
                if(/^true$/i.test(val))
                {
                    let email = null;
                    let password = null;

                    match = /password=([^&]+)/.exec(window.location.search);
                    if(match)
                    {
                        password = match[1];
                        //console.log('password: ' + password);
                    }
                    match = /email=([^&]+)/.exec(window.location.search);
                    if(match)
                    {
                        email = match[1];
                        //console.log('email: ' + email);
                    }

                    //console.log('Email: ' + email + '; Password: ' + password);

                    reset_data = {
                        reset_pwd: val,
                        email: email,
                        password: password,
                        new_password: null,
                        password_confirmation: null
                    };
                }
            }
        }

        return reset_data;

    } // get_reset_data

    display_reset_password_form()
    {
        document.getElementById('form-label').innerHTML = this.props.reset_password_title;
        $('#password-div').css('display', 'block');
        $('#password-confirmation-div').css('display', 'block');
    }

    manageEditMode()
    {
        if(this.props.edit_mode === 'true')
        {
            console.log("Ready to have you edit form ...");
            
            $('#password-div').css('display', 'none');
            $('#password-confirmation-div').css('display', 'none');

            if(this.props.laastras_user)
            {
                document.laastras_user_sign_up_form.email.value = this.props.laastras_user.email;
                document.laastras_user_sign_up_form.first_name.value = this.props.laastras_user.first_name;
                document.laastras_user_sign_up_form.last_name.value = this.props.laastras_user.last_name;
                document.laastras_user_sign_up_form.user_name.value = this.props.laastras_user.user_name;
            }
        }

    } // manageEditMode

    hijackFormSubmitEvent()
    {
        try 
        {
            //console.log("processing sign up form.");
            var $form = $('#laastras-user-sign-up-form');
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
                    var url = null;
                    if(this.props.edit_mode === 'true')
                    {
                        url = this.props.laastras_user_update_action_url;
                    }
                    else 
                    {
                        url = $this.attr('action');
                    }
                    //console.log(`E-mail:${document.laastras_user_sign_up_form.email.value}`);
                    if(this.reset_data)
                    {
                        this.reset_data.new_password = document.laastras_user_sign_up_form.password.value;
                        this.reset_data.password_confirmation = document.laastras_user_sign_up_form.password_confirmation.value;
                        var form_data = this.reset_data;
                    }
                    else 
                    {
                        form_data = {
                            email: document.laastras_user_sign_up_form.email.value,
                            first_name: document.laastras_user_sign_up_form.first_name.value,
                            last_name: document.laastras_user_sign_up_form.last_name.value,
                            user_name: document.laastras_user_sign_up_form.user_name.value,
                            laastras_employee: document.getElementById('laastras-sign-up-employee').value,
                            password: document.laastras_user_sign_up_form.password.value,
                            password_confirmation: document.laastras_user_sign_up_form.password_confirmation.value
                        };
                    }

                    var dataToSend = form_data;
                    var callback = (dataReceived, status, xq) => {
                        // use the data received
                        let code = parseInt(dataReceived.code);
                        let message = dataReceived.message;
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
                                    <div class="col-sm-11 justify-content-start"> <p id="verbose-p"> ${message} </p> </div>
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
                                </div>`;
                        }

                        $('#verbose-message-div').remove();
                        //console.log('Feedback message removed');
                        $('#feedback').append(html);
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
                            <div class="col-sm-1 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            <div class="col-sm-11"> <p id="verbose-p"> ${message} </p> </div>
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

LaastrasUserSignUp.propTypes = {
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    user_name: PropTypes.string,
    password: PropTypes.string,
    submit_label: PropTypes.string,
    password_confirmation: PropTypes.string,
    laastras_user_sign_up_form_label: PropTypes.string,
    laastras_user_update_form_label: PropTypes.string,
    are_you_laastras_employee_label: PropTypes.string,
    no_label: PropTypes.string,
    yes_label: PropTypes.string,
    laastras_user_sign_up_action_url: PropTypes.string,
    edit_mode: PropTypes.string,
    laastras_user: PropTypes.object,
    reset_password_title: PropTypes.string
};

export default LaastrasUserSignUp;