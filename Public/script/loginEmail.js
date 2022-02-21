$(document).ready(function () {
    'use strict';
    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }
    // Label effect
    $('input').focus(function () {
        $(this).siblings('label').addClass('active');
    });
    if ($('#errorLogin').text() === 'TRY ANOTHER USERNAME') {
        console.log('asdfasdf');
    }
    // Reload page
    $('a.profile').on('click', function () {
        location.reload(false);
    });

    $('#errorLogin').fadeOut(10000);
});
