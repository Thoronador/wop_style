<!--section-start::APPLET_LINE--><span class="small">{..date..} - </span><a class="small" href="{..url..}">{..title..}</a><br><!--section-end::APPLET_LINE-->

<!--section-start::SEARCH--><form method="get" action="" class="row">
  <input type="hidden" name="go" value="download">
  {..input_cat..}
  
  <div class="col-xs-12 col-lg-8 col-lg-offset-4">
    <div class="input-group">
      <span class="input-group-addon"><span class="fa fa-search"></span></span>
      <input type="text" class="form-control" name="keyword" value="{..keyword..}" placeholder="Kategorie durchsuchen">
      <span class="input-group-btn">
        <button class="btn btn-default" type="submit">Los</button>
      </span>
    </div>
  </div>
</form>
<!--section-end::SEARCH-->

<!--section-start::NAVIGATION_LINE--><a href="{..cat_url..}" class="list-group-item">
  <span class="fa fa-folder"></span> {..cat_name..}
</a>
<!--section-end::NAVIGATION_LINE-->

<!--section-start::NAVIGATION_BODY--><div class="list-group list-group-condensed">
  {..lines..}
</div>
<!--section-end::NAVIGATION_BODY-->

<!--section-start::PREVIEW_LINE--><a href="{..url..}" class="list-group-item list-group-content">    
  <h5 class="list-group-content-heading truncate truncate-80">
    <span class="label label-default pull-right">{..cat_name..}</span>
    {..title..}
  </h5>
  <span class="small">{..text..}</span >
</a>
<!--section-end::PREVIEW_LINE-->

<!--section-start::NO_PREVIEW_LINE--><span class="list-group-item">
  Es gibt leider keine Downloads!
</span> 
<!--section-end::NO_PREVIEW_LINE-->

<!--section-start::PREVIEW_LIST--><h2><span class="fa fa-folder-open"></span> {..page_title..}</h2>
<div class="list-group list-group-condensed">
  {..entries..}
</div>  
<!--section-end::PREVIEW_LIST-->

<!--section-start::BODY--><div class="box">
  <h2>
    <span class="favicon-wop"></span>
    Downloads
    <a href="$URL(download[cat_id=all])" class="small pull-right">
      (Alle anzeigen)
    </a>
  </h2>
  
  {..navigation..}
  
  <div class="offset-top">
    {..search..}
  </div>
</div>

<div class="box">
  {..entries..}
</div>

<!--section-end::BODY-->

<!--section-start::ENTRY_FILE_LINE--><a href="{..url..}" class="list-group-item" target="_blank" rel="nofollow">
  <div class="truncate truncate-80">
    <span class="badge pull-right">{..size..}</span>
    {..name..}
    {..mirror_ext..}
  </div>
</a><!--section-end::ENTRY_FILE_LINE-->

<!--section-start::ENTRY_FILE_IS_MIRROR--><span class="label label-danger">Mirror</span><!--section-end::ENTRY_FILE_IS_MIRROR-->

<!--section-start::ENTRY_STATISTICS--><div class="list-group-item small">
  {..number..}
  <span class="pull-right">{..hits..} Downloads</span>
</div>  
<!--section-end::ENTRY_STATISTICS-->

<!--section-start::ENTRY_BODY--><div class="box">
  <h2>
    <span class="favicon-wop"></span>
    Downloads
    <a href="$URL(download[cat_id=all])" class="small pull-right">
      (Alle anzeigen)
    </a>
  </h2>
  
  {..navigation..}
  
  <div class="offset-top">
    {..search..}
  </div>
</div>

<div class="box">
  <h2>
    {..title..}
    <small><span class="label label-default">{..cat_name..}</span></small>
  </h2>
  <p class="text-muted small">
    Von {..author_link..} • {..date..}
  </p>

  <div class="offset-top list-group list-group-condensed">
    <div class="list-group-item">
      <h5 class="list-group-item-heading">Dateien (Downloads)</h5>
    </div>
    {..files..}
    {..statistics..}
  </div>
  
  <h5>Beschreibung</h5>
  <p class="text-justify">{..text..}</p>

</div>
<!--section-end::ENTRY_BODY-->

