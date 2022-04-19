import React from "react"
import PropTypes from "prop-types"

class UserSignUp extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let submit_button_div_style = {
            padding: '5px'
        };

        return(
            <div id="user_sign_up_main_div">
                <form role="form"
                      name="user_sign_up_form"
                      id="money-transfer-sender-wu-form"
                      action="/users/sign_up">
                    <div className="form-group">
                        <label>{this.props.email}</label>
                        <input type="text" name="email"
                               className="form-control" id="email_sign_up"
                               placeholder={this.props.email}/>
                    </div>
                    <div className="form-group">
                        <label>{this.props.first_name}</label>
                        <input type="text" name="first_name"
                               className="form-control" id="first_name_sign_up"
                               placeholder={this.props.first_name}/>
                    </div>
                    <div className="form-group">
                        <label>{this.props.last_name}</label>
                        <input type="text" name="last_name"
                               className="form-control" id="last_name_sign_up"
                               placeholder={this.props.last_name}/>
                    </div>
                    <div className="form-group">
                        <label>{this.props.password}</label>
                        <input type="password" name="password"
                               className="form-control" id="password_sign_up"
                               placeholder={this.props.password}/>
                    </div>
                    <div className="form-group">
                        <label>{this.props.password_confirmation}</label>
                        <input type="password" name="password_confirmation" 
                               className="form-control" id="password_confirmation_sign_up"
                               placeholder={this.props.password_confirmation}/>
                    </div>
                    <div className="text-center" style={submit_button_div_style}>             
                        <button type="submit" 
                            className="btn btn-default"
                            onClick={se => this.onClickSubmitUserSignUp(se)}>
                                Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    onClickSubmitUserSignUp(e)
    {
        try 
        {
            //e.preventDefault();
            console.log("processing sign up form.");
            var $form = $('form');
            $form.submit((event) => {
                try 
                {
                    event.preventDefault();
                    var $this = $form;
                    // Validation code
                    //...
                    // this tells the server-side process that Ajax was used
                    $('input[name="usingAJAX"]',$this).val('true');
                    var url = $this.attr('action');
                    //console.log(`E-mail:${document.user_sign_up_form.email.value}`);
                    var form_data = {
                        email: document.user_sign_up_form.email.value,
                        first_name: document.user_sign_up_form.first_name.value,
                        last_name: document.user_sign_up_form.last_name.value,
                        password: document.user_sign_up_form.password.value,
                        password_confirmation: document.user_sign_up_form.password_confirmation.value
                    };
                    var dataToSend = form_data;
                    var callback = (dataReceived, status, xq) => {
                        // use the data received
                        let code = parseInt(dataReceived.code);
                        let message = dataReceived.message;
                        if(code === 1) // success
                        {
                            $this.hide();
                            let html = `
                                <div class="row" style="background-color: white; padding: 10px">
                                    <div class="col-sm-1 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                        </svg>
                                    </div>
                                    <div class="col-sm-11"> <p> ${message} </p> </div>
                                </div>`;
                            $('#user_sign_up_main_div').prepend(html);
                        }
                        else // failure
                        {
                            let html = `
                                <div class="row">
                                    <div class="col-sm-1 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                    <div class="col-sm-11"> <p> ${message} </p> </div>
                                </div>`;
                            $('#user_sign_up_main_div').prepend(html);
                        }
                    };

                    console.log(`URL: ${url}, Data to send: ${dataToSend}`);

                    var typeOfDataToReceive = 'json';
                    $.post(url, dataToSend, callback, typeOfDataToReceive).fail((error) => {
                        console.log(`Failed to post sign up form: ${error}`);
                    });
                }
                catch(error)
                {
                    console.log(`Exception submit form function: ${error}`);
                }
            });
        }
        catch(error) 
        {
            console.log(`Exception: ${error}`);
        }
    }
}

UserSignUp.propTypes = {
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    password: PropTypes.string,
    password_confirmation: PropTypes.string
};

export default UserSignUp;