import React from "react"
import PropTypes from "prop-types"

class LaastrasUserShow extends React.Component 
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        let form_elt_div_style = {
            padding: '5px'
        };

        return(
            <div className="shadow p-3 mb-5 bg-body rounded laastras-event-main-card" data-aos="fade-up">
                <div className="d-flex flex-row justify-content-center">
                    <div style={{margin: '10px'}}>
                        <div>
                            <div>
                                <img src={this.props.profile_photo_url} 
                                     className="img-fluid"
                                     style={{
                                        height: '155px',
                                        width: '155px',
                                        borderRadius: '50%',
                                        display: 'inline-block'
                                     }}/>
                            </div>
                            {
                                this.props.view_mode === 'false' ?
                                (
                                    <div>
                                        <div id="laastras-user-profile-photo-div">
                                            <form role="form"
                                                  encType="multipart/form-data"
                                                  name="laastras_profile_photo_edit_form"
                                                  id="laastras-profile-photo-edit-form"
                                                  action={this.props.upload_profile_photo_action_url}
                                                  style={{backgroundColor: '#a68353'}}>

                                                <div className="form-group" style={form_elt_div_style}>
                                                    <input type="file" name="file[uploaded_profile_photo_file]"
                                                           className="form-control" id="profile_photo_edit_file"/>
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
                                ):
                                (
                                    <div></div>
                                )
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-start">
                        <h3> {this.props.full_name} </h3> 
                        <p>
                            {`${this.props.role_label}: ${this.props.role}`}
                        </p>
                        <p>
                            {`${this.props.email_label}: ${this.props.email}`}
                        </p>
                        {
                            this.props.view_mode === 'false' ?
                            (
                                <div style={{margin: '5px'}}>
                                    <div className="d-flex flex-row justify-content-center">
                                        <a href={this.props.edit_url} style={{margin: '10px'}}> {this.props.edit_label} </a>
                                        <a href={this.props.destroy_url} style={{margin: '10px'}}> {this.props.destroy_label} </a>
                                    </div>
                                </div>
                            ) : 
                            (
                                <div></div>
                            )
                        }
                    </div>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        if(this.props.view_mode === 'false')
        {
            this.hijackFormSubmitEvent();
        }

    } // componentDidMount

    hijackFormSubmitEvent()
    {
        try 
        {
            var $form = $('#laastras-profile-photo-edit-form');
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
                    //console.log(`E-mail:${document.laastras_user_sign_up_form.email.value}`);
                    // See 
                    var form_data = new FormData();
                    form_data.append(
                        document.getElementById('profile_photo_edit_file').name, 
                        document.getElementById('profile_photo_edit_file').files[0]
                    );
                    
                    var dataToSend = form_data;
                    var callback = (dataReceived) => {
                        // use the data received
                        // console.log(`RECEIVED: ${JSON.stringify(dataReceived)}`);
                        let data = JSON.parse(dataReceived);
                        let code = data.code;
                        let message = data.message;
                        let html = '';
                        if(code === 1) // success
                        {
                            $this.hide();
                            html = `
                                <div class="row" style="background-color: white; padding: 10px" id="verbose-message-div">
                                    <div class="col-sm-1 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                        </svg>
                                    </div>
                                    <div class="col-sm-11"> <p> ${message} </p> </div>
                                </div>`;
                        }
                        else // failure
                        {
                            html = `
                                <div class="row" id="verbose-message-div">
                                    <div class="col-sm-1 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                    <div class="col-sm-11"> <p> ${message} </p> </div>
                                </div>`;
                        }

                        $('#verbose-message-div').remove();
                        //console.log('Feedback message removed');
                        $('#laastras-user-profile-photo-div').prepend(html);
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
                        let message = `Failed to post sign up form: ${error}`;
                        let html = `
                            <div class="row" id="verbose-message-div">
                                <div class="col-sm-1 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                                <div class="col-sm-11"> <p> ${message} </p> </div>
                            </div>`;
                        $('#verbose-message-div').remove();
                        $('#laastras-user-profile-photo-div').prepend(html);
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
                            <div class="col-sm-11"> <p> ${message} </p> </div>
                        </div>`;
                    $('#verbose-message-div').remove();
                    $('#laastras-user-profile-photo-div').prepend(html);
                }
            });
        }
        catch(error) 
        {
            console.log(`Exception: ${error}`);
        }

    } // hijackFormSubmitEvent
}

LaastrasUserShow.propTypes = {
    full_name: PropTypes.string,
    role_label: PropTypes.string,
    role: PropTypes.string,
    email_label: PropTypes.string,
    email: PropTypes.string,
    edit_label: PropTypes.string,
    destroy_label: PropTypes.string,
    edit_url: PropTypes.string,
    destroy_url: PropTypes.string,
    submit_label: PropTypes.string,
    profile_photo_url: PropTypes.string,
    upload_profile_photo_action_url: PropTypes.string,
    view_mode: PropTypes.string // 'true' or 'false'
}

export default LaastrasUserShow

