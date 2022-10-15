
class WaitSpinner 
{
    constructor()
    {
        this.spinner_id = "wait_spinner";
        this.add_spinner_to_body();

    } // constructor

    add_spinner_to_body()
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
            $('body').append(spinner);
        }
        catch(error)
        {
            console.log(`add_spinner_to_body: ${error}`);
        }
        
    } // add_spinner_to_body

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
            spinner.style.position = 'fixed';
            spinner.style.display = "none";
            $('body').css('opacity', '1.0');
        }

    } // hide_wait_spinner

    center_spinner_in_the_viewport()
    {
        var viewportWidth = jQuery(window).width(),
        viewportHeight = jQuery(window).height(),
        $foo = jQuery(`#${this.spinner_id}`),
        elWidth = $foo.width(),
        elHeight = $foo.height(),
        elOffset = $foo.offset();
        jQuery(window)
            .scrollTop(elOffset.top + (elHeight/2) - (viewportHeight/2))
            .scrollLeft(elOffset.left + (elWidth/2) - (viewportWidth/2));

    } // center_spinner_in_the_viewport

}

export default WaitSpinner