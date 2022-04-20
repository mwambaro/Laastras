
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

jQuery.fn.hvcenter = function()
{
    try
    {
        if(this.parent())
        {
            //console.log('Position: ' + this.parent().css('position'));
            //this.parent().css('position', 'relative');
        }
        
        this.css({
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)'
        });
    }
    catch(error)
    {
        console.log('hvcenter: ' + error);
    }

    return this;
}

jQuery.fn.center = function(){
    var $foo = jQuery(this);
    $foo.css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$foo.width()/2,
        'margin-top' : -$foo.height()/2
    });

    return $foo;
}