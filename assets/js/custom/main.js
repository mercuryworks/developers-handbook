// Clipboard
$(document).ready(function(){
    new Clipboard('.button--copy', {
        target: function(trigger) {
            return trigger.parentNode.previousElementSibling;
        }
    });
});

// Mercury UI
$(document).ready(function(){
    $().mercuryuiOffCanvas();
});