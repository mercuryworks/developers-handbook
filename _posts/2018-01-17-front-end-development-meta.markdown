---
layout: post
title: "Meta"
author: Zachary Winnie
authorTitle: Senior Interface Designer
date: 2018-01-17 08:29:00;
lastUpdated: 2018-01-17 19:23:00;
categories: front-end-development meta head html
permalink: /front-end-development/meta
order: 70.30
child: true
---

## Base

Put these two meta tags at the very top of your <code><head></code> tag:

``` html
<meta charset="utf-8"> 
<meta http-equiv="x-ua-compatible" content="ie=edge">
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

More about character encoding:

* [HTML Encoding (Character Sets)](https://www.w3schools.com/html/html_charset.asp){:target="_blank"}
* [Legacy Internet Explorer Document Modes](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx){:target="_blank"}

## SEO

``` html
<title>Home | Mercury Works</title>
<meta name="description" content="Mercury Works is located in Tampa, Florida.">
<meta name="keywords" content="mercury,works">
<meta name="robots" content="index,follow">
<meta name="googlebot" content="index,follow">
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

More about meta tags for SEO:

* [Meta tags that Google understands](https://support.google.com/webmasters/answer/79812?hl=en){:target="_blank"}

## OpenGraph

``` html
<meta property="og:url" content="http://mercurynewmedia.com/blog/mercury-new-media-blog/2017/10/06/creating-a-design-system" />
<meta property="og:type" content="article" />
<meta property="og:title" content="Creating a Design System" />
<meta property="og:description" content="In this blog post, we will be talking about design systems (also sometimes referred to as design languages) as it applies to the process of designing and developing web apps and sites, and the design system process we’ve found successful at Mercury." />
<meta property="og:image"  content="http://www.mercurynewmedia.com/images/default-source/logos/mercury-logo-circle-201x201.png" />
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

More about OpenGraph tags:
* [OpenGraph Protocol](http://ogp.me/)
* [Facebook Share  Debugger](https://developers.facebook.com/tools/debug/){:target="_blank"}

## Apple Meta

``` html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta content="yes" name="apple-touch-fullscreen" />
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

More about Apple meta tags:

* [Apple Supported Meta Tags](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html){:target="_blank"}

## Resources

* [Hey Meta](http://www.heymeta.com/){:target="_blank"}
* [Complete List of HTML Meta Tags](https://gist.github.com/lancejpollard/1978404){:target="_blank"}
* [List of Usable HTML Meta and Link Tags](https://gist.github.com/kevinSuttle/1997924){:target="_blank"}
* [Using Meta Tags in HTML: Some Basics and Best Practices](https://www.sitepoint.com/meta-tags-html-basics-best-practices/){:target="_blank"}
* [HTML meta tags cheatsheet](https://devhints.io/html-meta){:target="_blank"}