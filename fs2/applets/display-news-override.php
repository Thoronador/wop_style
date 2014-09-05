<?php
/* monkey patching display News function */
namespace Frogsystem;

function display_news ($news_arr, $html_code, $fs_code, $para_handling)
{
    global $FD;


    $news_arr['news_date'] = date_loc( $FD->config('datetime') , $news_arr['news_date']);

    // Website category
    $index2 = $FD->sql()->conn()->query('SELECT cat_name FROM '.$FD->config('pref')."news_cat WHERE cat_id = '".$news_arr['cat_id']."'");
    $row = $index2->fetch(\PDO::FETCH_ASSOC);
    $news_arr['cat_name'] = $row['cat_name'];
    $news_arr['cat_pic'] = image_url('images/cat/', 'news_'.$news_arr['cat_id']);


    // Page URL
    $index2 = $FD->sql()->conn()->query('SELECT url FROM wop_netzwerkseiten WHERE kuerzel = "'.$news_arr['cat_name'].'" OR name = "'.$news_arr['cat_name'].'"');
    $row = $index2->fetch(\PDO::FETCH_ASSOC);
    $news_arr['user_name'] = $news_arr['cat_name'];
    $news_arr['user_url'] = $row['url'];

    // Direct URL
    $index2 = $FD->sql()->conn()->query('SELECT news_url FROM wop_news_list WHERE news_id = '.$news_arr['news_id'].'' );
    $row = $index2->fetch(\PDO::FETCH_ASSOC);
    $news_arr['comment_url'] =  $row['news_url'];

    // Text formatieren
    $flags = array();
    $to_html = array('b', 'i', 'center', 'img', 'url', 'email', 'quote', 'list', 'numlist');
    $to_text = array('u', 's', 'font', 'color', 'size', 'smilies');
    $to_bbcode = array();
    $remove = array('home', 'code', 'video', 'nofscode', 'fscode','html', 'nohtml');

    $news_arr['news_text'] = \StringCutter::truncate(trim($news_arr['news_text']), 600, '...', array('word' => true, 'bbcode' => true));
    $news_arr['news_text'] = parse_fscode($news_arr['news_text'], $flags, $to_html, $to_text, $to_bbcode, $remove);

    // title
    $news_arr['news_title'] = killhtml ( $news_arr['news_title'] );


    // Template lesen und füllen
    $template = new \template();
    $template->setFile('0_news.tpl');
    $template->load('NEWS_BODY');

    $template->tag('news_id', $news_arr['news_id'] );
    $template->tag('titel', $news_arr['news_title'] );
    $template->tag('date', $news_arr['news_date'] );
    $template->tag('text', $news_arr['news_text'] );
    $template->tag('user_name', $news_arr['user_name'] );
    $template->tag('user_url', $news_arr['user_url'] );
    $template->tag('cat_name', $news_arr['cat_name'] );
    $template->tag('cat_image', $news_arr['cat_pic'] );
    $template->tag('comments_url', $news_arr['comment_url'] );
    $template->tag('comments_number', '' );
    $template->tag('related_links', '' );

    $template = $template->display ();
    $news_template = $template;
    return $news_template;
}
?>
