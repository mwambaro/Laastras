
class HorizontalSpace
{
    /// <summary>
    ///     Assesses the available horizontal space where a list of items is expected to be.
    /// </summary>
    /// <param name="items_list_selector">
    ///     Selector of the list element where the items will be displayed. Needed to assess initial list item size each'
    /// </param>
    /// <param name="parent_selector">
    ///     Immediate parent jQuery selector so as to find her myself
    /// </param>
    /// <return>
    ///     'horizontal_space_state' property object that has two properties:
    ///      1. list_display_style: it sets the css 'display' prop
    ///      2. display_type: one of these {'flex', 'flex-block-list', 'block-list'}
    /// </return>
    /// NOTE: For optimality let me know where your parent is located given the current actual
    ///       view port condition. Also, your list should be in its worst case span when you call upon me.
    ///       It is optimized to do heavy-lifting computation once in its life-cycle. Hence, if you
    ///       want fresh perspective, construct it again, esp. if parent changes.
    constructor(items_list_selector, parent_selector)
    {
        if(items_list_selector)
        {
            this.parent_selector = parent_selector;
            this.items_list_selector = items_list_selector;
            this.assessViewPortSize();
        }
    }

    assessViewPortSize()
    {
        if(typeof(this) === 'undefined')
        {
            console.log("assessViewPortSize: 'this' object is undefined.");
            return;
        }

        try
        {   
            let parentInnerEndLeftPos = -1;
            let windowInnerEndPos = -1;
            let maxWidth = 0;
            let totalWidth = 0;
            let how_many = 0;
            let listEndLeftPos = 0;
            if(this.navigation_bar_total_width) // do it once in your life cycle
            {
                totalWidth = this.navigation_bar_total_width;
                maxWidth = this.navigation_bar_max_with;
                how_many = this.how_many;
                parentInnerEndLeftPos = this.parent_inner_end_left_pos;
                windowInnerEndPos = this.window_inner_end_pos;
                listEndLeftPos = this.list_end_left_pos;
            }
            else 
            {
                let pLeftMargin = 0;
                let pLeftPadding = 0;
                let lLeftMargin = 0;
                let lLeftPadding = 0;
                let lRightMargin = 0;
                let lRightPadding = 0;
                let bRightMargin = 0;
                let bRightPadding = 0;
                let pos = $(this.parent_selector).offset();
                if(!pos)
                {
                    console.log('Yikes! Could not get parent object position. This will taint the results');
                }
                else
                {
                    
                    let s = $(this.parent_selector).css('margin-left');
                    if(s)
                    {
                        pLeftMargin = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    s = $(this.parent_selector).css('padding-left');
                    if(s)
                    {
                        pLeftPadding = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    s = $(this.items_list_selector).css('margin-left');
                    if(s)
                    {
                        lLeftMargin = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    s = $(this.items_list_selector).css('padding-left');
                    if(s)
                    {
                        lLeftPadding = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    s = $(this.items_list_selector).css('margin-right');
                    if(s)
                    {
                        lRightMargin = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    s = $(this.items_list_selector).css('padding-right');
                    if(s)
                    {
                        lRightPadding = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    s = $('body').css('margin-right');
                    if(s)
                    {
                        bRightMargin = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    s = $('body').css('padding-right');
                    if(s)
                    {
                        bRightPadding = parseFloat(s.replace(/[^\d\.]+/, ""));
                    }
                    
                    windowInnerEndPos = window.outerWidth - bRightPadding - bRightMargin;
                    //console.log(`Parent left margin: ${pLeftMargin}; Parent left padding: ${pLeftPadding}; List left margin: ${lLeftMargin}; List left padding: ${lLeftPadding}; List right margin: ${lRightMargin}; List right padding: ${lRightPadding}`);
                    parentInnerEndLeftPos = pos.left + pLeftMargin + pLeftPadding + $(this.parent_selector).innerWidth();
                    //console.log(`Parent inner end position: ${parentInnerEndLeftPos}`);
                }
                if(parentInnerEndLeftPos == -1)
                {
                    console.log('parentInnerEndLeftPos is invalid. Setting it');
                    parentInnerEndLeftPos = pos.left + $(this.parent_selector).innerWidth();
                }

                let selector = $(this.items_list_selector).contents();
                if(selector.length === 0)
                {
                    console.log(`selector: ${this.items_list_selector} found no match. DAMN!`);
                }
                selector.each((idx, node) => {
                
                    let width = $(node).width();
                    //console.log('width: ' + width);
                    if(idx == 0)
                    {
                        maxWidth = width;
                    }
                    else
                    {
                        if(width > maxWidth)
                        {
                            maxWidth = width;
                        }
                    }
                    totalWidth += width;
                    listEndLeftPos = pos.left + pLeftMargin + pLeftPadding + lLeftMargin + lLeftPadding + totalWidth + lRightPadding + lRightMargin;
                    if(listEndLeftPos <= parentInnerEndLeftPos)
                    {
                        how_many += 1;
                    }
                });
                if(maxWidth>0 && totalWidth>0)
                {
                    /// NOTE: Keep these definitions together
                    this.navigation_bar_max_with = maxWidth;
                    this.navigation_bar_total_width = totalWidth;
                    this.how_many = how_many;
                    this.list_end_left_pos = listEndLeftPos;
                    this.window_inner_end_pos = windowInnerEndPos;
                    this.parent_inner_end_left_pos = parentInnerEndLeftPos;
                }
            }
            //console.log(`List end left pos (HSPACE): ${listEndLeftPos}; Parent inner end left pos: ${parentInnerEndLeftPos}, Window inner end pos: ${windowInnerEndPos}`);

            if(
                Math.floor(listEndLeftPos) <= Math.floor(parentInnerEndLeftPos) &&
                Math.floor(parentInnerEndLeftPos) < Math.floor(windowInnerEndPos) 
            ){ // Flex
                this.horizontal_space_state = {
                    list_display_style: {
                        display: 'flex'
                    },
                    display_type: 'flex'
                };
            }
            else if(how_many>0) // flex + block-list
            {
                this.horizontal_space_state = {
                    list_display_style: {
                        display: 'flex'
                    },
                    display_type: 'flex-block-list'
                };
            }
            else // block-list
            {
                this.horizontal_space_state = {
                    list_display_style: {
                        display: 'flex'
                    },
                    display_type: 'block-list'
                };
            }
        }
        catch(error)
        {
            console.log("assessViewPortSize: " + error);
        }
    }
}

export default HorizontalSpace