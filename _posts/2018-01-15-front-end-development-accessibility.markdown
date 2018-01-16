---
layout: post
title: "Accessibility"
author: Zachary Winnie
authorTitle: Senior Interface Designer
date: 2018-01-15 18:31:00 -0500
lastUpdated: 2018-01-15 18:31:00 -0500;
categories: front-end-development accessibility
permalink: /front-end-development/accessibility
order: 70.30
child: true
---

## Hiding Content Visually

The following CSS class hides content from the UI but allows screen readers to access/speak text.

<script src="https://gist.github.com/zwinnie/c06116360740b90a8ed668e26d4efec6.js"></script>

## Skip To Content & Navigation

One of the easiest but highest impact pieces of code is adding skip links right after your <code><body></code> tag.

``` html
<a href="#main" class="sr-only">Skip to content</a>
<a href="#nav" class="sr-only">Skip to navigation</a>
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Color Contrast

For Mercury applications, strive for WCAG level AA or better color contrast ratio. That means 4.5:1 for normal text and 3:1 for large text.

Tools for checking color contrast:
* [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
* [http://leaverou.github.io/contrast-ratio/](http://leaverou.github.io/contrast-ratio/)
* [https://contrastchecker.com/](https://contrastchecker.com/)
* [http://accessible-colors.com/](http://accessible-colors.com/)

## Showing States

Use Color With Icons & Text

## Icons

Font icons

## Minimum Font Size

13px

## Focus Styling

Don't remove outline

## Optimize For Keyboard Accessibility
* Escape key for closing modals
* Tabbing & tabindex

## Accessible HTML

### Attributes

Use the title and aria-label attributes
Aria attributes

### Tables

Table caption

### Headings

Use heading structure

## Screen Readers

* Mac VoiceOver
* NVDA
* JAWS