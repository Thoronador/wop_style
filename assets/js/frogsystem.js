$(function() {
    $('.jcarousel')
        .jcarousel({
            wrap: 'circular',
            transitions: true,
            animation: {
                duration: 1000,
                easing:   'swing'
            }
        })
        .jcarousel('scroll', -1, false)
        .jcarouselAutoscroll({
            interval: 2000,
            target: '+=1',
            autostart: true
        })
    ;
    $('.jcarousel').hover(
        function() {
            $(this).jcarouselAutoscroll('stop');
        }, function() {
            $(this).jcarouselAutoscroll('start');
        }
    );
    $('.jcarousel-prev').jcarouselControl({
        target: '-=2'
    });
    $('.jcarousel-next').jcarouselControl({
        target: '+=2'
    });
});
