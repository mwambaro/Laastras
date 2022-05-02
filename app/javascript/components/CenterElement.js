
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

/// <summary>
///     Horizontally center an element within its immediate parent. We assume the parent element is
///     absolutely positioned within the document with fixed size.
/// </summary>
/// <param name="width"> 
///     The (needed) width of the element to horizontally center. It must be less
///     than the width of the parent within which to center it.
/// </param>
/// <param name="relativeElement">
///     The parent element within which to horizontally center this one. It must be fixed within
///     the document and its size must be set. It defaults to 'body'.
/// </param>
jQuery.fn.hcenter2 = function(width=0, relativeElement=null)
{
    let parent = relativeElement;
    let w = width;
    try 
    {
        if(!parent)
        {
            parent = jQuery('body');
        }
        if(w === 0)
        {
            w = jQuery(this).width();
        }

        let position = parent.position();
        let sum = 0;
        if(parent.width() < w)
        {
            // No jumbling up things, so return
            return this;
        }
        else 
        {
            sum = (parent.width() - w)/2;
        }

        this.css({
            position: 'absolute',
            left: (position.left + sum)
        });
    }
    catch(error)
    {
        console.log('hcenter2: ' + error);
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

/// <summary>
///     Vertically center an element within its immediate parent. We assume the parent element is
///     absolutely positioned within the document with fixed size.
/// </summary>
/// <param name="height"> 
///     The (needed) height of the element to vertically center. It must be less
///     than the height of the parent within which to center it.
/// </param>
/// <param name="relativeElement">
///     The parent element within which to vertically center this one. It must be fixed within
///     the document and its size must be set. It defaults to 'body'.
/// </param>
jQuery.fn.vcenter2 = function(height=0, relativeElement=null)
{
    let parent = relativeElement;
    let h = height;
    try 
    {
        if(!parent)
        {
            parent = jQuery(window);
        }
        if(h === 0)
        {
            h = jQuery(this).height();
        }

        let position = parent.position();
        let sum = 0;
        if(parent.height() < h)
        {
            // No jumbling up things, so return
            return this;
        }
        else 
        {
            sum = (parent.height() - h)/2;
        }

        this.css({
            position: 'absolute',
            top: (position.top + sum)
        });
    }
    catch(error)
    {
        console.log('vcenter2: ' + error);
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

/// <summary>
///     Center an element within its immediate parent. We assume the parent element is
///     absolutely positioned within the document with fixed size.
/// </summary>
/// <param name="width"> 
///     The (needed) width of the element to center. It must be less
///     than the width of the parent within which to center it.
/// </param>
/// <param name="height"> 
///     The (needed) height of the element to center. It must be less
///     than the height of the parent within which to center it.
/// </param>
/// <param name="relativeElement">
///     The parent element within which to center this one. It must be fixed within
///     the document and its size must be set. It defaults to 'body'.
/// </param>
jQuery.fn.hvcenter2 = function(width=0, height=0, relativeElement=null)
{
    let parent = relativeElement;
    let h = height;
    let w = width;
    try 
    {
        if(!parent)
        {
            parent = jQuery('body');
        }
        if(h === 0)
        {
            h = jQuery(this).height();
        }
        if(w === 0)
        {
            w = jQuery(this).width();
        }

        let position = parent.position();
        let sumh = 0, sumw = 0;
        if(parent.height() < h)
        {
            // No jumbling up things, so return
            return this;
        }
        else 
        {
            sumh = (parent.height() - h)/2;
        }
        if(parent.width() < w)
        {
            // No jumbling up things, so return
            return this;
        }
        else 
        {
            sumw = (parent.width() - w)/2;
        }

        this.css({
            position: 'absolute',
            top: (position.top + sumh),
            left: (position.left + sumw)
        });
    }
    catch(error)
    {
        console.log('hvcenter2: ' + error);
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