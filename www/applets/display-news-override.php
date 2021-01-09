<?php
/* monkey patching display News function */

namespace Frogsystem;

function assetProxy($url, $key, $safelist = array(), $baseUrl = "https://assets.worldofplayers.de/")
{
    $urlbits = parse_url($url);

    // skip relative URLs
    if (!$urlbits['host']) {
        return $url;
    }

    // Safelisted URLs just need to be secure
    if (in_array($urlbits['host'], $safelist)) {
        if ($urlbits['scheme'] != 'https') {
            return preg_replace("/^http:/i", "https:", $url);
        }
        return $url;
    }

    $b64digest = rtrim(strtr(base64_encode(hash_hmac("sha1", $url, $key, true)), '+/', '-_'), "=");
    $b64url = rtrim(strtr(base64_encode($url), '+/', '-_'), "=");

    return $baseUrl . $b64digest . "/" . $b64url;
}

function replaceImgTags($text, $replacer)
{
    return preg_replace_callback('#(\[img.*\])([^\s]+)(\[\/img\])#', function ($matches) use ($replacer) {
        return $matches[1] . $replacer($matches[2]) . $matches[3];
    }, $text);
}

function display_news($news_arr, $html_code, $fs_code, $para_handling)
{
    global $FD, $proxyKey;
    require_once("asset_proxy.php");

    $news_arr['news_date'] = date_loc($FD->config('datetime'), $news_arr['news_date']);

    // Website category
    $index2               = $FD->sql()->conn()->query('SELECT cat_name FROM ' . $FD->config('pref') . "news_cat WHERE cat_id = '" . $news_arr['cat_id'] . "'");
    $row                  = $index2->fetch(\PDO::FETCH_ASSOC);
    $news_arr['cat_name'] = $row['cat_name'];

    // Network Data
    $index2                = $FD->sql()->conn()->query('SELECT name, url, sanitized, kuerzel
      FROM wop_netzwerkseiten S
      JOIN wop_networkinfo I
      ON S.id = I.id
      WHERE I.cat_name = "' . $news_arr['cat_name'] . '"');
    $row                   = $index2->fetch(\PDO::FETCH_ASSOC);
    $news_arr['cat_pic']   = $row['sanitized'];
    $news_arr['user_name'] = $news_arr['cat_name'];
    $news_arr['user_url']  = $row['url'];

    if (!$news_arr['cat_pic'] || !$news_arr['cat_name'] || !$news_arr['user_name'] || !$news_arr['user_url']) {
        $news_arr['cat_name']  = 'World of Players';
        $news_arr['cat_pic']   = 'wop';
        $news_arr['user_name'] = $news_arr['cat_name'];
        $news_arr['user_url']  = '//www.worldofplayers.de';
    }

    // Direct URL
    $index2                  = $FD->sql()->conn()->query('SELECT news_url FROM wop_news_list WHERE news_id = ' . $news_arr['news_id'] . '');
    $row                     = $index2->fetch(\PDO::FETCH_ASSOC);
    $news_arr['comment_url'] = $row['news_url'];

    // Featured image
    $featured_url = null;
    if ($news_arr['news_image']) {
        $featured_image = $FD->sql()->conn()->query('SELECT * FROM ' . $FD->config('pref') . 'cimg WHERE id = ' . $news_arr['news_image']);
        $featured_image = $featured_image->fetchObject();
        if ($featured_image) {
            $featured_url = $FD->cfg('virtualhost') . 'media/content/' . $featured_image->name . '.' . $featured_image->type;
        }
    }

    // Text formatieren
    $flags     = array();
    $to_html   = array('b', 'i', 'center', 'img', 'url', 'email', 'quote', 'list', 'numlist');
    $to_text   = array('u', 's', 'font', 'color', 'size', 'smilies');
    $to_bbcode = array();
    $remove    = array('home', 'code', 'video', 'nofscode', 'fscode', 'html', 'nohtml');
    if ($featured_url) {
        $to_html = array('url', 'email', 'quote', 'list', 'numlist');
        $to_text = array('b', 'i', 'u', 's', 'center', 'font', 'color', 'size', 'smilies');
        $remove  = array('img', 'home', 'code', 'video', 'nofscode', 'fscode', 'html', 'nohtml');
    }

    $news_arr['news_text'] = \StringCutter::truncate(trim($news_arr['news_text']), ($featured_url ? 800 : 600), '...', array('word' => true, 'bbcode' => true));
    $news_arr['news_text'] = replaceImgTags($news_arr['news_text'], function ($url) use ($proxyKey) {
        return assetProxy($url, $proxyKey, array('worldofplayers.de', 'www.worldofplayers.de', 'upload.worldofplayers.de'));
    });
    $news_arr['news_text'] = parse_fscode($news_arr['news_text'], $flags, $to_html, $to_text, $to_bbcode, $remove);
    $news_arr['news_text'] = preg_replace('#<([^ >]+)[^>]*>([[:space:]]|&nbsp;)*</\1>#', '', $news_arr['news_text']);

    // title
    $news_arr['news_title'] = killhtml($news_arr['news_title']);

    // Template lesen und füllen
    $template = new \template();
    $template->setFile('0_news.tpl');
    if ($featured_url) {
        $template->load('NEWS_BODY_FEATURED');
        $template->tag('featured_image', $featured_url);
    } else {
        $template->load('NEWS_BODY');
    }

    $template->tag('news_id', $news_arr['news_id']);
    $template->tag('titel', $news_arr['news_title']);
    $template->tag('date', $news_arr['news_date']);
    $template->tag('text', $news_arr['news_text']);
    $template->tag('user_name', $news_arr['user_name']);
    $template->tag('user_url', $news_arr['user_url']);
    $template->tag('cat_name', $news_arr['cat_name']);
    $template->tag('cat_image', $news_arr['cat_pic']);
    $template->tag('comments_url', $news_arr['comment_url']);
    $template->tag('comments_number', '');
    $template->tag('related_links', '');

    $template      = $template->display();
    $news_template = $template;
    return $news_template;
}
