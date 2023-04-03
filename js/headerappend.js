(function ($) {
    "use strict";
    
    $.ajax({
        url: "https://pchr.cl/html_components/header.html",
        dataType: 'html'
    }).done(function(data){
        $('body').prepend(data); 
    });
    $.ajax({
        url: "https://pchr.cl/html_components/divnavbar.html",
        dataType: 'html'
    }).done(function(data){
        $('divnavbar').prepend(data); 
    });

    

})(jQuery);