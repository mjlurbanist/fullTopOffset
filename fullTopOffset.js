/*******************************************************************
* @plugin fullTopOffset.js
* version: 0.1
*
* https://github.com/mjlurbanist/fullTopOffset
*
* Calculates the full top offset of elements including margins.
* Call by $(element).fullTopOffset($(upperMostElement))
*
* Requires jQuery; tested on 1.10.2
*
*******************************************************************/

(function($) {
    // Main Function: determines the full offset between two DOM elements
    // Input: upperMostElement (DOM object above that called where we stop counting)
    // Returns: int of the total top offset between upperMostElement and the calling element
    $.fn.fullTopOffset = function(upperMostElement){
        // Helper Function: parse a height CSS pixel value to a string
        // Returns: int of the CSS pixel value
        function cssPixelsToInt(heightString){
               // check for non-numerics
               if (heightString.search("px") && (heightString.search("!") == -1)) {
                       heightString = heightString.substring(0,((heightString.length)-2));// strip the 'px' from the end of the height
                       return parseInt(heightString);// return an int
               } else if (heightString.search("px") && (heightString.search("!") != -1)) {
                       // do something here eventually... need to get last index of integer to build the substring
                       return 0;
               } else {
                       // not pixel based, may be auto or a %, return nothing
                       console.log('fullTopOffset.js: Error as cssPixelsToInt, string passed does not contain a pixel value. String: ' + heightString);
                       return 0;
               }       
        }
        
        // Helper Function: parse the active height of an element including margins
        // Returns: int of the element height plus top and bottom margins
        function measureHeight(element){
               // check to see if the object is displayed
               if (element.attr('display') != 'none') {
                       // measure element height
                       var intHeight = cssPixelsToInt(element.css('height'));
                       // measure top and bottom margins
                       intHeight += cssPixelsToInt(element.css('margin-top'));
                       intHeight += cssPixelsToInt(element.css('margin-bottom'));
                       return intHeight;
               } else {
                    // element not displayed
                    return 0;
               }
        }
        
        // Helper Function: parse the active margins of an element
        // Returns: int of the element top and bottom margins
        function measureMargins(element){
               // check to see if the object is displayed
               if (element.attr('display') != 'none') {
                       // measure top and bottom margins
                       var intHeight = cssPixelsToInt(element.css('margin-top'));
                       intHeight += cssPixelsToInt(element.css('margin-bottom'));
                       return intHeight;
               } else {
                    // element not displaye
                    return 0;
               }
        }
        
        // Main function body, set variables
        var fullOffset = 0;
        var bottomMostSelector = 'div[id="' + this.parent().attr('id') + '"]';
        var upperMostSelector = 'div[id="' + upperMostElement.attr('id') + '"]';
        
        // the bottomMostSelector is for the direct parent, so get siblings
        $(bottomMostSelector).prevUntil($(bottomMostSelector).parent()).each(function(){
               // siblings count towards the offset
               fullOffset+=measureHeight($(this));               
        });

        // parent loop, traversing until the ending container specified
        $(bottomMostSelector).parentsUntil(upperMostSelector).each(function(){
               // note: parents object height doesn't count towards the offset
               // but their margins do
               
               
               // need to check parent siblings that are before the next parent
               $(this).prevUntil($(this).parent()).each(function(){
                       // siblings count towards the offset
                       fullOffset+=measureHeight($(this));
               });
        });
        return fullOffset;
    }
}(jQuery));