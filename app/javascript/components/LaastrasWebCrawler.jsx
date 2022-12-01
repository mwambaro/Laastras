import React from "react" 
import PropTypes from "prop-types"
import WaitSpinner from "./WaitSpinner.js"

require("./AppUtilities");

class LaastrasWebCrawler extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.send_command_event = "send-command-event";
        this.wait_spinner = null;
        this.counter = 0;

    } // constructor

    render()
    {
        return(
            <div className="container-fluid"> 
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div style={{backgroundColor: 'black', color: 'white'}}>
                            <div style={{margin: '10px'}} className="row" id="verbose">
                                <div className="col-sm-11 d-flex flex-row justify-content-start">
                                    <span>
                                        Crawling Laastras Web Application for offline use ...
                                    </span>
                                </div> 
                                <div className="col-sm-1 d-flex flex-row justify-content-end">
                                    <span style={{color: 'green'}}>
                                        [OK]
                                    </span>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        );
        
    } // render

    componentDidMount()
    {
        this.wait_spinner = new WaitSpinner('command-wait-spinner');
        this.crawl();
        window.addEventListener(this.send_command_event, (e) => {
            this.send_command_to_server(e.data);
        });

    } // componentDidMount

    crawl()
    {
        this.send_command_to_server();

    } // crawl

    send_command_to_server(cmd='crawl')
    {
        try
        {
            if(this.counter === 0) 
            {
                this.wait_spinner.show_wait_spinner();
            }

            let url = this.props.server_command_endpoint;
            var form_data = {
                command: cmd
            };
            var dataToSend = form_data;
            var callback = (dataReceived, status, xq) => {
                if(this.counter === 0) 
                {
                    this.wait_spinner.hide_wait_spinner();
                    this.counter += 1;
                }
                // use the data received
                let code = parseInt(dataReceived.code);
                let message = dataReceived.message;
                let finished = false;
                let html = "";
                if(code === 0) // plain
                {
                    html = `
                        <div className="col-sm-11 d-flex flex-row justify-content-start">
                            <span>
                                ${message}
                            </span>
                        </div>
                    `;
                }
                else if(code === 1) // OK
                {
                    html = `
                        <div className="col-sm-1 d-flex flex-row justify-content-end">
                            <span style="color: green">
                                [${message}]
                            </span>
                        </div>
                    `;
                }
                else if (code === 2) // FAILED
                {
                    html = `
                        <div className="col-sm-1 d-flex flex-row justify-content-end">
                            <span style="color: red">
                                [${message}]
                            </span>
                        </div>
                    `;
                }
                else if (code === 3) // FINISHED
                {
                    html = `
                        <div className="col-sm-12 d-flex flex-row justify-content-end">
                            <span style="color: green">
                                [${message}]
                            </span>
                        </div>
                    `;
                    finished = true;
                }
                else if(code === 33) // EXITING
                {
                    html = `
                        <div className="col-sm-12 d-flex flex-row justify-content-end">
                            <span style="color: yellow">
                                ${message}
                            </span>
                        </div>
                    `;
                    finished = true;
                }
                else 
                {
                    html = `
                        <div className="col-sm-12 d-flex flex-row justify-content-end">
                            <span style="color: yellow">
                                ${message}
                            </span>
                        </div>
                    `;
                }

                $('#verbose').append(html);

                if(!finished)
                {
                    $(window).fire_event(
                        this.send_command_event, 
                        'verbose', 
                        'verbose'
                    );
                }
            };

            var typeOfDataToReceive = 'json';
            $.post(url, dataToSend, callback, typeOfDataToReceive)
                .fail((error) => {
                    console.log(`Failed to send ${cmd} command: ${error}`);  
                    if(this.counter === 0)
                    {
                        this.wait_spinner.hide_wait_spinner(); 
                        this.counter += 1; 
                    }
                });
        }
        catch(error) 
        {
            console.log(`Exception: ${error}`);
        }

    } // send_command_to_server

} // LaastrasWebCrawler

LaastrasWebCrawler.propTypes = {
    server_command_endpoint: PropTypes.string
}

export default LaastrasWebCrawler