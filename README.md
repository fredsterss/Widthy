# Full Width Photosets for Tumblr

## Purpose
This is intended for Tumblr theme hackers who want photosets to be full-width at larger widths than 500px ([the current maximum](http://www.tumblr.com/docs/en/custom_themes#photoset-posts)).


## Installation
1. Ensure you have the latest version of jquery, by including the following code between the `<head></head>` tags.

    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

2. Beneath jquery, include the standard Tumblr lightbox code - that does that heavy lifting in creating the lightbox, and the initial Width js file.

    <!-- Tumblr.lightbox -->
    <script type="text/javascript" src="https://raw.github.com/fredsterss/Widthy/master/js/tumblr-lightbox.js"></script>
	
    <!-- Widthy 0.1 -->
    <script type="text/javascript" src="https://raw.github.com/fredsterss/Widthy/master/js/widthy-0.1.js"></script>	

3. Then, update photoset block in your theme to be the same as https://github.com/fredsterss/Widthy/blob/master/photoset-template.html

4. Profit.

## Problems, fails etc.
@fredsters_s
