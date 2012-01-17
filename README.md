# Widthy: Full Width Photosets for Tumblr

## Purpose
This is intended for Tumblr theme hackers who want [photosets](http://engineering.tumblr.com/post/9294264070/building-a-faster-lightbox) to be full-width at larger widths than 500px ([the current maximum](http://www.tumblr.com/docs/en/custom_themes#photoset-posts)).

## Why?
If you're as anal as me (read: a designer) then you don't like Tumblr's janky 500 pixel maximum width messing with your grid system. Everything else can be hacked to fit your pixel-perfect theme, so why not the all-singing-all-dancing photoset? Widthy does this with elegance and limited markup (no more hacky iframes), and is totally dynamic in terms of layout. 
Oh and it works with lightbox.

## Installation
* Ensure you have the latest version of jquery, by including the following code between the `<head></head>` tags.

````
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
````

* Beneath jquery, include the the  __Widthy.js__ file:

````
<!-- Widthy 0.1 -->
<script type="text/javascript" src="https://raw.github.com/fredsterss/Widthy/master/js/widthy-0.1.js"></script>
````

* And some basic css to make it look pretty and give the images margins:

````
<link rel="stylesheet" href="https://raw.github.com/fredsterss/Widthy/master/css/photoset.css">
````

* Then, update the [photoset block](http://www.tumblr.com/docs/en/custom_themes#photoset-posts) in your theme to be the same as the Widthy [photoset template](https://github.com/fredsterss/Widthy/blob/master/photoset-template.html).

* Profit.

## Problems, adoration, fails etc.
@fredsters_s

