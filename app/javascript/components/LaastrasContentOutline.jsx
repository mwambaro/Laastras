import React from "react"
import PropTypes from "prop-types"

class LaastrasContentOutline extends React.Component 
{
    constructor(props)
    {
        super(props);

    } // constructor

    render()
    {
        let grid_column_class = this.props.grid_column_class;
        if(grid_column_class === null || grid_column_class === "")
        {
            grid_column_class = "col-md-8"
        }

        return(
            <div className="container-fluid" id="outline-top">
                <div className="row justify-content-center">
                    <div className={grid_column_class}>
                        <div className="shadow-sm p-1 mb-2 bg-body rounded">
                            <p style={{padding: '5px'}} id="outline-capture">
                            </p>
                            <ul>
                            {
                                this.props.content_outline_elements.map((element, idx) =>
                                    <li key={`element-line-${idx}`}
                                        style={{padding: '5px', color: 'blue'}}
                                        className="outline-element"
                                        data-id={element.content_outline_id}> 
                                        {element.content_outline_title}
                                    </li>
                                )
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{zIndex: '99'}}>  
                    <button id="myBackToTopBtn" 
                            title="Go to top"
                            style={{
                                display: 'none', 
                                position: 'fixed', 
                                bottom: '20px', 
                                right: '20px', 
                                zIndex: '99', 
                                border: 'none', 
                                outline: 'none', 
                                backgroundColor: 'grey', 
                                color: 'white', 
                                cursor: 'pointer', 
                                padding: '15px', 
                                borderRadius: '10px'
                            }}>
                        {this.props.top_label}
                    </button>
                </div>
            </div>
        );

    } // render

    componentDidMount()
    {
        this.manageGoToTopButton();
        $('#outline-capture').append(`${this.props.content_outline_capture}:`);
        $('.outline-element').on('click', (e) => {
            let element_id = $(e.target).attr('data-id');
            let top = $(`#${element_id}`).offset().top;
            $(window).scrollTop(top);
        });
        $('.outline-element').on('mouseover', (e) => {
            e.target.style.cursor = 'pointer';
        });

    } // componentDidMount

    // When the user clicks on the button, scroll to the top of the document
    goToTop(e) 
    {
        let top = $('#outline-top').offset().top;
        document.body.scrollTop = top; // For Safari
        document.documentElement.scrollTop = top; // For Chrome, Firefox, IE and Opera

    } // goToTop

    manageGoToTopButton()
    {
        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function() {
            //Get the button:
            let mybutton = document.getElementById("myBackToTopBtn");
            if(mybutton)
            {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
                {
                    mybutton.style.display = "block";
                } 
                else 
                {
                    mybutton.style.display = "none";
                }
            }
            else 
            {
                //console.log("GotoTop button not found");
            }
        }

        window.addEventListener('click', (e) => {
            if($(e.target).attr('id') === 'myBackToTopBtn')
            {
                this.goToTop(e);
            }
        });

        window.addEventListener('mouseover', (e) => {
            if($(e.target).attr('id') === 'myBackToTopBtn')
            {
                $('#myBackToTopBtn').css('background-color', '#555');
            }
        });

    } // manageGoToTopButton

}

LaastrasContentOutline.propTypes = {
    content_outline_capture: PropTypes.string,
    top_label: PropTypes.string,
    grid_column_class: PropTypes.string,
    content_outline_elements: PropTypes.array // of {content_outline_id:, content_outline_title:}
}

export default LaastrasContentOutline