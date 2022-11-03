
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

jQuery.fn.center_in_view_port = function(id)
{
    if (
        document.body.scrollTop > 0 || 
        document.documentElement.scrollTop > 0 ||
        document.body.scrollLeft > 0 || 
        document.documentElement.scrollLeft > 0
    ){
        let view_port_width = jQuery(window).width();
        let view_port_height = jQuery(window).height();
        let elt = jQuery(`#${id}`);
        let elt_width = elt.width();
        let elt_height = elt.height();
        let elt_offset = elt.offset();
        jQuery(window)
            .scrollTop(elt_offset.top + (elt_height/2) - (view_port_height/2))
            .scrollLeft(elt_offset.left + (elt_width/2) - (view_port_width/2));
    }
    else
    {
        $(`#${id}`).css({
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)'
        });
    }

} // center_in_view_port

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