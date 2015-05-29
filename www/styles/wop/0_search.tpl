<!--section-start::APPLET--><form method="get" action="">
  <input type="hidden" name="go" value="search">
  <input type="hidden" name="in_news" value="1">
  <input type="hidden" name="in_articles" value="0">
  <input type="hidden" name="in_downloads" value="1">
  
  <div class="input-group">
    <input type="text" class="form-control" name="keyword" value="" placeholder="Netzwerk durchsuchen">
    <span class="input-group-btn">
      <button class="btn btn-default" type="submit">Los</button>
    </span>
  </div>
</form>


<!--section-end::APPLET-->

<!--section-start::SEARCH--><form method="get" action="" class="row">
  <input type="hidden" name="go" value="search">
  <input type="hidden" name="in_articles" value="0">

  <div class="col-xs-12 col-lg-8">
    <div class="form-group input-group">
      <span class="input-group-addon">
        <span class="fa fa-search"></span>
      </span>
      <input type="text" class="form-control" name="keyword" maxlength="100" value="{..keyword..}" placeholder="Netzwerk durchsuchen">
      <span class="input-group-btn">
          <button class="btn btn-default" type="submit">
            Los  
          </button>
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="caret"></span>
            <span class="sr-only">Einstellungen öffnen</span>
          </button>
        
          <ul class="dropdown-menu dropdown-menu-form" role="menu">
            <li role="presentation" class="dropdown-header">Suche in &hellip;</li>
            <li>
              <label class="checkbox">
                <input type="checkbox" id="search_news" name="in_news" value="1" {..search_in_news..}>
                News
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" id="search_downloads" name="in_downloads" value="1" {..search_in_downloads..}>
                Downloads
              </label>
            </li>
            <li role="presentation" class="divider"></li>
            <li>
              <label class="checkbox">
                <input type="checkbox" id="phonetic_search" name="phonetic_search" value="1" {..phonetic_search..}>
                Phonetische Suche
              </label>
            </li>
          </ul>
        </span>
    </div>
    
    <div class="form-group">
      <p class="small">
        Mögliche Suchoptionen: <a href="$URL(search_help)"><b>{..operators..}</b></a>
      </p>
    </div>
  </div>
</form>
<!--section-end::SEARCH-->

<!--section-start::RESULT_DATE_TEMPLATE-->vom {..date..}
<!--section-end::RESULT_DATE_TEMPLATE-->

<!--section-start::RESULT_LINE--><a href="{..url..}" class="list-group-item">
  <div class="truncate truncate-80">
    <span class="badge pull-right">{..rank..}</span>
    {..title..}
  </div>
</a>
<!--section-end::RESULT_LINE-->

<!--section-start::NO_RESULTS--><span class="list-group-item">
  Keine Übereinstimmungen gefunden!
</span> 
<!--section-end::NO_RESULTS-->

<!--section-start::MORE_RESULTS--><p class="text-right offset-bottom">
  <a class="btn btn-default" href="{..main_search_url..}">
     Mehr anzeigen
  </a>
</p>
<!--section-end::MORE_RESULTS-->

<!--section-start::RESULTS_BODY--><div class="offset-top list-group list-group-condensed">
  <div class="list-group-item">
    <h4 class="list-group-item-heading">{..type_title..}</h4>
    <span class="badge pull-right">Relevanz</span>
    <p class="small">{..num_results..} Ergebnisse gefunden</p>
  </div>
  {..results..}
</div>

{..more_results..}
<div class="clearfix"></div>
<!--section-end::RESULTS_BODY-->

<!--section-start::INFO--><p class="text-muted sub-line small">
  Deine Suchanfrage: {..query..}<br>
  Gefundene Inhalte: {..num_results..}
</p>
<!--section-end::INFO-->

<!--section-start::BODY--><div class="box">
  <h2>
    <img alt="World of Players" src="$VAR(style_url)ico/logo.gif">
    Netzwerk durchsuchen
    <a href="$URL(search)" class="small pull-right">
      (Neue Suche)
    </a>
  </h2>
  
  <div class="offset-top">
    {..search..}
  </div>
    
</div>

<div class="box">
  <h2>
    <span class="fa fa-search"></span>
    Suchergebnisse
   </h2>
  {..info..}
  {..news..}
  {..downloads..}
</div>


<!--section-end::BODY-->

