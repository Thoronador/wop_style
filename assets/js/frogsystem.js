function loadTwitter(container) {
    container.html(`<a class="twitter-timeline"
    href="https://twitter.com/TheWitcherDE/lists/world-of-players"
    data-theme="dark" 
    data-tweet-limit="4"
    data-chrome="noheader nofooter noborders transparent noscrollbar"
    data-widget-id="495277831375421440" data-dnt="true">&nbsp;</a>`);

    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
}

function revokeTwitter() {
    Cookies.remove('twitter-accepted');
    location.reload();
}

$(function () {
    $('.jcarousel')
        .on('jcarousel:createend', function () {
            $(this).jcarousel('scroll', Math.floor(Math.random() * $('.jcarousel ul li').length), false);
        })
        .jcarousel({
            wrap: 'circular',
            transitions: true,
            animation: {
                duration: 1000,
                easing: 'swing'
            }
        })
        .jcarousel('scroll', '+=' + Math.floor(Math.random() * $('.jcarousel ul li').length), false)
        .jcarouselAutoscroll({
            interval: 2000,
            target: '+=1',
            autostart: true
        })
        .hover(
            function () {
                $(this).jcarouselAutoscroll('stop');
            }, function () {
                $(this).jcarouselAutoscroll('start');
            }
        );
    $('.jcarousel-prev').jcarouselControl({
        target: '-=2'
    });
    $('.jcarousel-next').jcarouselControl({
        target: '+=2'
    });

    /** Twitter Widget */
    const twitterCookie = 'twitter-accepted';
    const container = $('#wop-twitter');
    if (Cookies.get(twitterCookie) === '1') {
        Cookies.set(twitterCookie, '1', { expires: 365 });
        loadTwitter(container);
    } else {
        container.find('button').click(function() {
            Cookies.set(twitterCookie, '1', { expires: 365 });
            loadTwitter(container);
        })
    }
});
