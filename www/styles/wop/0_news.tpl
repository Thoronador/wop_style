<!--section-start::APPLET_LINE--><span class="small">{..date..} - </span><a class="small"
                                                                            href="#news_{..news_id..}">{..title..}</a>
<br><!--section-end::APPLET_LINE-->

<!--section-start::APPLET_BODY-->
<table style="margin-left:-2px; width:100%;" cellpadding="2" cellspacing="0">
    <tr valign="top">
        <td width="50%">
            <b>Aktuelle News:</b><br>
            {..news_lines..}
        </td>
        <td width="50%">
            <b>Downloads:</b><br>
            {..download_lines..}
        </td>
    </tr>
</table>
<!--section-end::APPLET_BODY-->

<!--section-start::LINKS_LINE-->
<li><a href="{..url..}" target="{..target..}">{..title..}</a></li><!--section-end::LINKS_LINE-->

<!--section-start::LINKS_BODY-->
<!--section-end::LINKS_BODY-->

<!--section-start::NEWS_BODY-->
<div class="box featured">
    <div class="row">
        <a href="{..comments_url..}" target="_blank" rel="noopener" class="headline">
            <div class="coat-of-arm coat-of-arm-{..cat_image..} no-hover"></div>
            <h2 title="{..titel..}">{..titel..}</h2>
            <p class="sub-line text-muted">
                <span class="small">{..cat_name..} • {..date..}</span>
            </p>
        </a>
        <div class="content news">

            {..text..}

            <div class="clearfix"></div>
            <p class="text-right">
                <a href="{..comments_url..}" class="btn btn-default">Weiterlesen</a>
            </p>

        </div>
    </div>
</div>
<!--section-end::NEWS_BODY-->

<!--section-start::NEWS_BODY_FEATURED-->
<div class="box featured">
    <div class="row">
        <div class="featured-image" style="background-image: url({..featured_image..});">
            <a href="{..comments_url..}" target="_blank" rel="noopener" class="headline">
                <div class="coat-of-arm coat-of-arm-{..cat_image..} no-hover"></div>
                <h2 title="{..titel..}">{..titel..}</h2>
                <p class="sub-line text-muted">
                    <span class="small">{..cat_name..} • {..date..}</span>
                </p>
            </a>
        </div>
        <div class="content news">

            {..text..}

            <div class="clearfix"></div>
            <p class="text-right">
                <a href="{..comments_url..}" class="btn btn-default">Weiterlesen</a>
            </p>

        </div>
    </div>
</div>
<!--section-end::NEWS_BODY_FEATURED-->

<!--section-start::BODY-->{..news..}<!--section-end::BODY-->

<!--section-start::COMMENT_USER--><a style="font-size:120%;" href="{..url..}">
    {..name..}
</a><br>
{..rank..}
<a href="{..url..}">
    {..user_image..}
</a>


<!--section-end::COMMENT_USER-->

<!--section-start::COMMMENT_ENTRY-->
<table align="center" class="comment_table" cellpadding="0" cellspacing="0">
    <tr>
        <td class="comment_td comment_left" style="border-left:1px solid #A5ACB2;">
            {..user..}
        </td>
        <td class="comment_td">
            <div class="comment_top">
        <span class="atleft">
          <b>{..titel..}</b>
        </span>
                <span class="small atright">
          {..date..}
        </span>
            </div>
            {..text..}
        </td>
    </tr>
</table><!--section-end::COMMMENT_ENTRY-->

<!--section-start::COMMENT_CAPTCHA-->
<tr>
    <td>
        <img src="{..captcha_url..}" alt="CAPTCHA">
    </td>
    <td>
        <input class="small input input_highlight" name="spam" size="30" maxlength="10">
        <span class="small">Bitte die Rechenaufgabe l&ouml;sen!</span>
        <a class="small" href="#captcha_note">(Hinweis)</a>
    </td>
</tr><!--section-end::COMMENT_CAPTCHA-->

<!--section-start::COMMENT_CAPTCHA_TEXT-->
<tr>
    <td></td>
    <td>
        <p class="small" id="captcha_note">
            <b>Hinweis:</b> Die Rechenaufgabe verhindert, dass Spam-Bots auf dieser Seite Werbung als Kommentar
            einstellen k&ouml;nnen. Um die Abfrage zu umgehen, kannst du dich <a href="?go=register">registrieren</a>.
        </p>
    </td>
</tr>
<!--section-end::COMMENT_CAPTCHA_TEXT-->

<!--section-start::COMMENT_FORM_NAME--><input class="small input input_highlight" id="comment_name" name="name"
                                              size="30" maxlength="100">
<span class="small">Jetzt</span>
<a class="small" href="?go=login">anmelden?</a><!--section-end::COMMENT_FORM_NAME-->

<!--section-start::COMMENT_FORM--><p>
    <b>Kommentar hinzuf&uuml;gen</b>
</p>

<form action="" method="post" onSubmit="return checkCommentForm()">
    <input type="hidden" name="go" value="comments">
    <input type="hidden" name="add_comment" value="1">
    <input type="hidden" name="id" value="{..news_id..}">

    <table style="margin-left:-2px; width:100%;" cellpadding="2" cellspacing="0">
        <tr>
            <td>
                <b>Name: </b>
            </td>
            <td>
                {..name_input..}
            </td>
        </tr>
        <tr>
            <td>
                <b>Titel:</b>
            </td>
            <td>
                <input class="small input input_highlight" id="comment_title" name="title" size="30" maxlength="100">
            </td>
        </tr>
        <tr>
            <td valign="top">
                <b>Text:</b>
                <p class="small">
                    HTML&nbsp;ist&nbsp;<b>{..html..}</b>.<br>
                    <a href="?go=fscode">FScode</a>&nbsp;ist&nbsp;<b>{..fs_code..}.</b>
                </p>
            </td>
            <td>
                {..textarea..}
            </td>
        </tr>
        {..captcha..}
        <tr>
            <td></td>
            <td>
                <input class="pointer" type="submit" value="Abschicken">
            </td>
        </tr>
        {..captcha_text..}
    </table>
</form>
<!--section-end::COMMENT_FORM-->

<!--section-start::COMMENT_BODY-->{..news..}
<!--section-end::COMMENT_BODY-->

<!--section-start::SEARCH-->
<div class="box">
    <h2>
        <img alt="World of Players" src="$VAR(style_url)ico/logo.gif">
        Netzwerk durchsuchen
        <a href="$URL(search)" class="small pull-right">
            (Neue Suche)
        </a>
    </h2>

    <div class="offset-top">

        <form method="get" action="" class="row">
            <input type="hidden" name="go" value="search">
            <input type="hidden" name="in_articles" value="0">

            <div class="col-xs-12 col-lg-8">
                <div class="form-group input-group">
      <span class="input-group-addon">
        <span class="fa fa-search"></span>
      </span>
                    <input type="text" class="form-control" name="keyword" maxlength="100" value="{..keyword..}"
                           placeholder="Netzwerk durchsuchen">
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
                <input type="checkbox" id="search_news" name="in_news" value="1" checked>
                News
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" id="search_downloads" name="in_downloads" value="1" checked>
                Downloads
              </label>
            </li>
            <li role="presentation" class="divider"></li>
            <li>
              <label class="checkbox">
                <input type="checkbox" id="phonetic_search" name="phonetic_search" value="1">
                Phonetische Suche
              </label>
            </li>
          </ul>
        </span>
                </div>

                <div class="form-group">
                    <p class="small">
                        Mögliche Suchoptionen: <a href="$URL(search_help)"><b>AND OR XOR ! *</b></a>
                    </p>
                </div>
            </div>
        </form>

    </div>
</div><!--section-end::SEARCH-->

