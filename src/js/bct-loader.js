/*!
  * Bootstrap Content Templates v1.0.7
  */

/* global bctInit */

//bct plugin vars
var bctCssMin =           'https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@1.0.7/dist/bct.min.css';
var bctCssFontawesome =   'https://use.fontawesome.com/releases/v5.5.0/css/all.css';
var bctJsMin =            'https://cdn.jsdelivr.net/gh/squizlabs/bootstrap-content-templates@1.0.7/dist/bct.min.js';

//function for initialising the bct plugin
function iniBctWrappers(){
    //find all bct wrappers on the screen and initialise them with the bct plugin
    $('.bct-wrapper').not('.initialised').each(function(){
        bctInit(this);
    });
    //add class to the body to indicate that we have initialised the bct plugin
    $('body').addClass('bct');
}

//load the required CSS and JS into the head if we haven't done it yet
if(!$('body').hasClass('bct-files-loaded')){

    //load the CSS files
    document.head.insertAdjacentHTML('beforeend', '\
        <link rel="stylesheet" href="'+ bctCssMin +'">\
        <link rel="stylesheet" href="'+ bctCssFontawesome +'" id="fa_stylesheet">\
    ');

    //load the JS files
    $.getScript(bctJsMin)
        .done(function() {
            setTimeout(function(){
                iniBctWrappers();
            }, 100);
        }
    );

    //add class to body to indicate that we've loaded all the files
    $('body').addClass('bct-files-loaded');

}else{
    //we've already loaded the files, so we just need to initialise the plugin

    if(window.location.href.indexOf('_admin') > -1) {
        //if we are in admin mode, we need to reload some of the scripts
        if(!$('#main_form').hasClass('bct-admin-loaded')){
            //in admin we need to reload this CSS file into the body tag because of a weird bug
            document.body.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="'+ bctCssMin +'">');
            //reload the JS files using a promise, when all are completed, we can call the bct ini function again
            $.when(
                $.getScript(bctJsMin),
                $.Deferred(function( deferred ){
                    $( deferred.resolve );
                }),
                //add class to the main admin form tag to indicate we've reloaded the scripts in admin
                $('#main_form').addClass('bct-admin-loaded')
            ).done(function(){
                iniBctWrappers();
            });
        }
    }else{
        //if we're in Edit+, we can just call the ini function again
        setTimeout(function(){
            if($('body').hasClass('bct')){
                iniBctWrappers();
            }
        }, 100);
    }
}


