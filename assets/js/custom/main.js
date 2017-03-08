new Clipboard('.button--copy', {
    target: function(trigger) {
        return trigger.parentNode.previousElementSibling;
    }
});