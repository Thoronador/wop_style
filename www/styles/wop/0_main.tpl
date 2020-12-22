<!--section-start::MAIN--><div class="header">
  <a class="btn btn-default navbar-toggle" href="#nav-footer">
    <span class="fa fa-bars fa-lg"></span>
    <span>Menü</span>
  </a>
  <a class="brand-link" href="https://forum.worldofplayers.de/">World of Players</a>
</div>

<div class="network-carousel">
  <div class="jcarousel-wrapper">
    <span class="jcarousel-prev"></span>
    <span class="jcarousel-next"></span>
    <div class="jcarousel">
      $NAV(network-carousel.nav)
    </div>
  </div>
</div>

[%sponsor%]


<div class="navbar navbar-default" role="navigation">
  <div class="container">
    $NAV(main.nav)
  </div>
</div>

<div class="container">
  <div class="row row-flex row-flex-wrap">
    $APP(wop-welcome.php)
    $APP(announcement.php)
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-8 col-lg-9">
      {..content..}
    </div>
    
    <div class="col-xs-12 col-md-4 col-lg-3">
      <div class="box">
        $NAV(right.nav)  
      </div>
    </div>
  </div>

</div>

<footer>
  $NAV(footer.nav)
  
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <p>
          {..copyright..}
        </p>
      </div>
    </div>
  </div>
</footer>
<!--section-end::MAIN-->

<!--section-start::MATRIX-->{..doctype..}
<html lang="{..language..}">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">    
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    {..base_tag..}
    {..title_tag..}
    {..meta_tags..}
    {..css_links..}
    {..favicon_link..}
    {..feed_link..}
    [%app-icons%]
    [%analytics%]
  </head>
  <body>
    {..body..}
    {..javascript..}
    <script type="text/javascript">
      const cb = new Cookiebanner({
        message: "Wir verwenden Cookies um Dir den Besuch dieser Webseite zu ermöglichen (Werbung, Social Media). Dabei werden Informationen über die Nutzung teils weitergegeben. Durch Deinen Besuch stimmst Du dem zu.",
        linkmsg: "Weitere Informationen",
        moreinfo: "$URL(datenschutz)"
      }); cb.run();
    </script>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  </body>
</html><!--section-end::MATRIX-->

<!--section-start::DOCTYPE--><!DOCTYPE html><!--section-end::DOCTYPE-->

