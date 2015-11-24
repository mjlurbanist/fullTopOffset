fullTopOffset.js

Author: https://github.com/mjlurbanist

A simple jQuery function to augment the existing $(element).offset().top which doesn't account for margins in its calculation.

fullTopOffset counts element height and margins between two elements, traversing up the DOM. Parent element height is ignored but margins are accounted for. All sibling heights and margins are accounted for.

Usage:

$(lowerElement).fullTopOffset($(upperElement));

lowerElement - the calling element is located in the DOM tree as a distant child of the upperElement.

Example:
When a div is clicked, scroll the window to the top of that div, with a little padding (20px). In actual use, Window isn't used, rather the DIV that controls the vertical scroll. This depends upon use case.

$('div.CLASS').click(function(){
    var offset = $(this).fullTopOffset($('#upperElementID'));
    $('window').animate({scrollTop: offset-20}, 500);
});
