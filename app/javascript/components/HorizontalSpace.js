
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
    ///       view port condition. Also, your list should be in its worst case span when you construct me for the first time.
    ///       It is optimized to do heavy-lifting computation once in its life-cycle. Hence, if you
    ///       want fresh perspective, construct it again, esp. if parent changes.
    constructor(items_list_selector, parent_selector)
    {
        if(items_list_selector)
        {
            this.parent_selector = parent_selector;
            this.items_list_selector = items_list_selector;
        }
    }

    assessViewPortSize(parent_max_width)
    {
        if(typeof(this) === 'undefined')
        {
            console.log("assessViewPortSize: 'this' object is undefined.");
            return;
        }
        if(typeof(parent_max_width) === 'undefined')
        {
            console.log("assessViewPortSize: 'parent_max_width' is undefined.");
            return;
        }

        try
        {   
            let parentInnerEndLeftPos = -1;
            let windowInnerEndPos = -1;
            let parentPos = $(this.parent_selector).offset();
            let listPos = $(this.items_list_selector).offset();
            let maxWidth = 0;
            let totalWidth = 0;
            let how_many = 0;
            let listEndLeftPos = 0;
            let pLeftMargin = 0;
            let pLeftPadding = 0;
            let bRightMargin = 0;
            let bRightPadding = 0;
            
            let ps = $(this.parent_selector).css('margin-left');
            if(ps)
            {
                pLeftMargin = parseFloat(ps.replace(/[^\d\.]+/, ""));
            }
            ps = $(this.parent_selector).css('padding-left');
            if(ps)
            {
                pLeftPadding = parseFloat(ps.replace(/[^\d\.]+/, ""));
            }
            ps = $('body').css('margin-right');
            if(ps)
            {
                bRightMargin = parseFloat(ps.replace(/[^\d\.]+/, ""));
            }
            ps = $('body').css('padding-right');
            if(ps)
            {
                bRightPadding = parseFloat(ps.replace(/[^\d\.]+/, ""));
            }
            
            if(this.list_bar_total_width) // do it once in your life cycle
            {
                totalWidth = this.list_bar_total_width;
                maxWidth = this.list_bar_max_with;
                how_many = this.how_many;
                listEndLeftPos = this.list_end_left_pos;

                parentInnerEndLeftPos = parentPos.left + pLeftMargin + pLeftPadding + parent_max_width;
                windowInnerEndPos = window.outerWidth - bRightPadding - bRightMargin;
            }
            else 
            {
                let lLeftMargin = 0;
                let lLeftPadding = 0;
                let lRightMargin = 0;
                let lRightPadding = 0;
                let pos = parentPos;
                if(!pos)
                {
                    console.log('Yikes! Could not get parent object position. This will taint the results');
                }
                else
                {
                    let s = $(this.items_list_selector).css('margin-left');
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
                    
                    windowInnerEndPos = window.outerWidth - bRightPadding - bRightMargin;
                    //console.log(`Parent left margin: ${pLeftMargin}; Parent left padding: ${pLeftPadding}; List left margin: ${lLeftMargin}; List left padding: ${lLeftPadding}; List right margin: ${lRightMargin}; List right padding: ${lRightPadding}`);
                    parentInnerEndLeftPos = pos.left + pLeftMargin + pLeftPadding + parent_max_width;
                    //console.log(`Parent inner end position: ${parentInnerEndLeftPos}`);
                }
                if(parentInnerEndLeftPos == -1)
                {
                    console.log('parentInnerEndLeftPos is invalid. Setting it');
                    parentInnerEndLeftPos = pos.left + pLeftMargin + pLeftPadding + parent_max_width;
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
                    // ideally; actually should use listPos
                    listEndLeftPos = pos.left + pLeftMargin + pLeftPadding + lLeftMargin + lLeftPadding + totalWidth + lRightPadding + lRightMargin;
                    if(listEndLeftPos <= parentInnerEndLeftPos)
                    {
                        how_many += 1;
                    }
                });
                if(maxWidth>0 && totalWidth>0)
                {
                    /// NOTE: Keep these definitions together
                    this.list_bar_max_with = maxWidth;
                    this.list_bar_total_width = totalWidth;
                    this.how_many = how_many;
                    this.list_end_left_pos = listEndLeftPos;
                }
            }
            
            // Actual
            // An attempt to fix flex going flexing over parent on small devices like Infinix X625C
            let flexPossible = true;
            if(listPos && parentPos) 
            {
                if(listPos.left < parentPos.left || this.mayHaveHorizontalScrollBar())
                {
                    flexPossible = false;
                }
            }
            // end Actual

            //console.log(`List end left pos (${this.items_list_selector}): ${listEndLeftPos}; Parent inner end left pos: ${parentInnerEndLeftPos}, Window inner end pos: ${windowInnerEndPos}; Flex possible: ${flexPossible}`);

            if(parent_max_width > totalWidth && flexPossible && window.innerWidth>400)
            { // Flex
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

    mayHaveHorizontalScrollBar()
    {
        let may = false;

        try
        {
            let left = 0;
            let scrollL = left + 2;
            $(window).scrollLeft(scrollL);
            let currentScrollL = $(window).scrollLeft();
            //console.log(`Scroll width: ${scrollL}; Current scroll width: ${currentScrollL}`);
            may = (currentScrollL === scrollL) ? true : false;
        }
        catch(error)
        {
            console.log("mayHaveHorizontalScrollBar: " + error);
        }

        return may;
    }
}

export default HorizontalSpace