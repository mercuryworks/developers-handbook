---
layout: post
title: "HTML"
author: Zachary Winnie
authorTitle: Senior Interface Designer
date: 2018-01-10 19:56:00;
lastUpdated: 2018-01-20 14:34:00;
categories: front-end-development html
permalink: /front-end-development/html
order: 70.30
child: true
---

Example HTML document:

``` html
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title></title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href="css/vendor/vendor.css" />
        <link rel="stylesheet" href="css/custom/custom.css" />
    </head>
    <body id="top">
        <a href="#main" class="sr-only">Skip to content</a>
        <a href="#nav" class="sr-only">Skip to navigation</a>
        <div class="wrapper" id="wrapper">
            <header class="header" id="header">
                <nav class="nav" id="nav"></nav>
            </header>
            <main class="main" id="main"></main>
            <footer class="footer" id="footer"></footer>
        </div>
        <script src="js/vendor/vendor.js"></script>
        <script src="js/custom/custom.js"></script>
    </body>
</html>
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## HTML Elements

For browsers that Mercury supports, use HTML5 elements, and use them semantically, trying to avoid generic `<div>` and `<span>` elements, if possible.

* `<header>`
* `<nav>`
* `<main>`
* `<aside>`
* `<section>`
* `<article>`
* `<footer>`
* `<video>`
* `<audio>`
* `<picture>`

## HTML Minification

* [Manual minification](https://kangax.github.io/html-minifier/){:target="_blank"}
* [Automated with Node.js](https://github.com/kangax/html-minifier){:target="_blank"}
* [Automated with Gulp](https://github.com/jonschlinkert/gulp-htmlmin){:target="_blank"}
* [Automated with WordPress](https://wordpress.org/plugins/minify-html-markup/){:target="_blank"}

## Resources

* [MDN web docs: HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element){:target="_blank"}
* [HTML Reference](http://htmlreference.io/){:target="_blank"}
* [An Overview of HTML5 Semantics](https://codepen.io/mi-lee/post/an-overview-of-html5-semantics){:target="_blank"}
* [HTML5 Boilerplate](https://html5boilerplate.com/){:target="_blank"}
* [Head](https://gethead.info/){:target="_blank"}