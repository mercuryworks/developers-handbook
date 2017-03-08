---
layout: post
title: "Fonts"
author: Zachary Winnie, Senior Interface Designer
date: 2017-03-02 10:36:00 -0500
lastUpdated: 2017-03-06 16:01:00 -0500;
categories: front-end-development fonts
permalink: /front-end-development/fonts
order: 70.20
child: true
---
## Browser Support

Minimum font file types to include are WOFF2 and WOFF. Add TTF and you've got good support as of 2017.

Note: Don't bother including eot or svg font file types anymore unless you need very deep browser support for old IE and iOS.

## Font Code

### CSS

``` css
@font-face {
  font-family: 'Open Sans';
  src:  url('/fonts/open-sans/opensans.woff2') format('woff2'),
        url('/fonts/open-sans/opensans.woff') format('woff'),
        url('/fonts/open-sans/opensans.ttf') format('truetype');
}
```
<button type="button" class="button button--white button--smallest button--copy">Copy Code</button>

Using the font to style elements:

``` css
body {
  font-family: 'Open Sans', sans-serif;
}
```
{% if gitbook.version %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}


### SASS/SCSS

``` scss
$open-sans: 'Open Sans';
$open-sans-path: '/fonts/open-sans/';
@font-face {
  font-family: $open-sans;
  src:  url('#{$open-sans-path}opensans.woff2') format('woff2'),
        url('#{$open-sans-path}opensans.woff') format('woff'),
        url('#{$open-sans-path}opensans.ttf') format('truetype');
}
// Global variable (avoid using $open-sans across your SASS code, abstract it out so it is easy to change)
$font-family--primary: 'Open Sans', sans-serif;
```
<button type="button" class="button button--white button--smallest button--copy">Copy Code</button>

Using the font to style elements in SASS:

``` scss
body {
  font-family: $font-family--primary;
}
```
<button type="button" class="button button--white button--smallest button--copy">Copy Code</button>

### Resources

More about using @font-face: [https://css-tricks.com/snippets/css/using-font-face/](https://css-tricks.com/snippets/css/using-font-face/).

## Performance And Webfonts

### File Sizes

File sizes for webfonts can be large, so be careful to only include a few fonts, and try to limit yourself to 6 total (which will give you two families with regular, italic, and bold for each).

You can limit your file sizes by limiting the character set.

### System Fonts

Consider using system fonts &mdash; you'll have no files to download and increase the performance of your site.

More on using system fonts: [https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/).

## Converting Fonts To Webfonts

[Transfonter](https://transfonter.org/)

## Font Services

### Google Fonts

[Google Fonts](https://fonts.google.com/)

The preferred method for using Google Fonts is by linking the stylesheet via the `<link>` tag:

``` html
<link href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
```
<button type="button" class="button button--white button--smallest button--copy">Copy Code</button>

### Typekit

[Typekit](https://typekit.com/fonts)

## Webfonts And IIS

You'll need to have IIS configured with MIME types for the font files you're using, otherwise you'll get 404 errors.

Instead of messing with IIS, you can also add the following declarations to the web.config file of your project:

``` xml
<system.webServer> 
  <staticContent> 
    <remove fileExtension=".eot" /> 
    <mimeMap fileExtension=".eot" mimeType="application/vnd.ms-fontobject" /> 
    <remove fileExtension=".ttf" /> 
    <mimeMap fileExtension=".ttf" mimeType="application/octet-stream" /> 
    <remove fileExtension=".woff" /> 
    <mimeMap fileExtension=".woff" mimeType="application/font-woff" /> 
    <remove fileExtension=".woff2" /> 
    <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" /> 
    <remove fileExtension=".svg" /> 
    <mimeMap fileExtension=".svg" mimeType="image/svg+xml" /> 
  </staticContent> 
</system.webServer>
```
<button type="button" class="button button--white button--smallest button--copy">Copy Code</button>