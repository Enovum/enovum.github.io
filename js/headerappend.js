(function ($) {
    "use strict";
    
    $.ajax({
        url: "https://pchr.cl/html_components/header.html",
        success: function (data) { $('body').prepend(data); },
        dataType: 'html'
    });

})(jQuery);