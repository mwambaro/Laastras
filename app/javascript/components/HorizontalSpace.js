
class HorizontalSpace
{
    /// <summary>
    ///     Assesses the available horizontal space where a list of items is expected to be.
    /// </summary>
    /// <param name="items_list_selector">
    ///     Selector of the list element where the items will be displayed. Needed to assess initial list item size each'
    /// </param>
    /// <param name="parent_max_width">
    ///     The maximum width available for the list of items.
    /// </param>
    /// NOTE: For optimality wrap the items in <span> if they are text
    constructor(items_list_selector, parent_max_width=null)
    {
        if(items_list_selector)
        {
            this.parent_max_width = parent_max_width ? parent_max_width : $(items_list_selector).width();
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
            let maxWidth = 0;
            let totalWidth = 0;
            if(this.navigation_bar_total_width && this.navigation_bar_max_with)
            {
                totalWidth = this.navigation_bar_total_width;
                maxWidth = this.navigation_bar_max_with;
            }
            else
            {
                let selector = $(`${this.items_list_selector} span`);
                let svg_bool = false;
                if(!selector)
                {
                    selector = $(`${this.items_list_selector} img`);
                }
                if(!selector)
                {
                    selector = $(`${this.items_list_selector} button`);
                }
                if(!selector)
                {
                    selector = $(`${this.items_list_selector} li`);
                    if(selector)
                    {
                        console.log('SVG selector valid');
                        svg_bool = true;
                    }
                }
                if(!selector)
                {
                    selector = $(this.items_list_selector).contents();
                    if(selector)
                    {
                        console.log('list selector valid');
                    }
                }
                if(!selector)
                {
                    console.log(`selector: ${this.items_list_selector} found no match. DAMN!`);
                }
                selector.each((idx, node) => {
                
                    let width = $(node).width();
                    console.log('width: ' + width);
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
                });
                if(maxWidth>0 && totalWidth>0)
                {
                    this.navigation_bar_max_with = maxWidth;
                    this.navigation_bar_total_width = totalWidth;
                }
            }

            let how_many = 0;
            if(maxWidth>0)
            {
                how_many = Math.floor(this.parent_max_width/maxWidth);
            }

            console.log(`Parent max width (HSPACE): ${this.parent_max_width}; Total width: ${totalWidth}; Max width: ${maxWidth}; How many: ${how_many}`);
            if(this.parent_max_width >= totalWidth) // Flex
            {
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