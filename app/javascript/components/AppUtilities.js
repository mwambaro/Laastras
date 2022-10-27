
jQuery.fn.sleep = function(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));

} // sleep

jQuery.fn.scroll_element_into_view = function(elt_id)
{
    if(elt_id === null)
    {
        return;
    }
    var id = elt_id;
    var $foo = jQuery(`#${id}`),
    elWidth = $foo.width(),
    elHeight = $foo.height(),
    elOffset = $foo.offset();
    jQuery(window)
        .scrollTop(elOffset.top + elHeight);

} // scroll_element_into_view

jQuery.fn.fire_event = function(event_name, id, data)
{
    let event = new Event(
        event_name,
        {
            bubbles: true,
            cancelable: false,
            composed: true
        }
    );

    event.data = data;

    let elt = document.getElementById(id);
    if(elt)
    {
        elt.dispatchEvent(event);
    }

} // fire_event