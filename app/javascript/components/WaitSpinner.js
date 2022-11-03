require("./AppUtilities");

class WaitSpinner 
{
    constructor(container_id=null)
    {
        this.spinner_id = "wait_spinner";
        this.add_spinner_to_container(container_id);

    } // constructor

    add_spinner_to_body()
    {
        this.add_spinner_to_container();

    } // add_spinner_to_body

    add_spinner_to_container(container_id)
    {
        try 
        {
            if(document.getElementById(this.spinner_id))
            {
                return;
            }

            let spinner = `
                <div class="container-fluid">
                    <div id="${this.spinner_id}" style="display: none; z-index: 99; border: none; outline: none; background-color: transparent; position: fixed">
                        <div class="spinner-border text-success" role="status" style="width: 100px; height: 100px">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                </div>
            `;
            let done = false;
            if(container_id)
            {
                if($(`#${container_id}`).length > 0)
                {
                    $(`#${container_id}`).append(spinner);
                    done = true;
                }
            }
            if(!done)
            {
                $('body').append(spinner);
            }
        }
        catch(error)
        {
            console.log(`add_spinner_to_body: ${error}`);
        }
        
    } // add_spinner_to_container

    show_wait_spinner()
    {
        let spinner = document.getElementById(this.spinner_id);
        if(spinner)
        {
            spinner.style.display = "block";
            $(`#${this.spinner_id}`).css({  
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
        let spinner = document.getElementById(this.spinner_id);
        if(spinner)
        {
            spinner.style.display = "none";
            spinner.style.position = 'fixed';
            $('body').css('opacity', '1.0');
        }

    } // hide_wait_spinner

    center_spinner_in_the_viewport()
    {
        $(document).center_in_view_port(this.spinner_id);

    } // center_spinner_in_the_viewport

}

export default WaitSpinner