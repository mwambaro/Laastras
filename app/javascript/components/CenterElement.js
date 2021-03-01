
jQuery.fn.hcenter = function()
{
    try
    {
        this.css({
            'display': 'flex',
            'justify-content': 'center'
        });
    }
    catch(error)
    {
        console.log('hcenter: ' + error);
    }

    return this;
}

jQuery.fn.vcenter = function()
{
    try
    {
        this.css({
            'display': 'flex',
            'align-items': 'center'
        });
    }
    catch(error)
    {
        console.log('vcenter: ' + error);
    }

    return this;
}