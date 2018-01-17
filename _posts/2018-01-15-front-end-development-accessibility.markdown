---
layout: post
title: "Accessibility"
author: Zachary Winnie
authorTitle: Senior Interface Designer
date: 2018-01-15 18:31:00 -0500
lastUpdated: 2018-01-16 22:54:00 -0500;
categories: front-end-development accessibility
permalink: /front-end-development/accessibility
order: 70.30
child: true
---

## Hiding Content Visually

The following CSS class hides content from the UI but allows screen readers to access/speak text.

``` css
.sr-only {
  border: 0;
  clip: rect(0,0,0,0);
  clip-path: inset(1px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  visibility: hidden;
  white-space: nowrap;
  width: 1px;
}
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

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

## UX States

Don't rely only on color for showing the state of your UI. For best results:
* Use an icon (check for success, warning triangle for warning, stop sign for error, etc.)
* Use clear and descriptive text
* Use color, background color, and border color

Example:
``` html
<div class="alert alert--error-color" role="alert">
  <span class="icon icon-error" aria-hidden="true"></span> An error has occurred in the application.
</div>
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}


## Icon Fonts

Some screen readers and voice over programs will try to speak icon fonts, but this can have awkward results. Your best bet is to hide icons from these programs via <code>aria-hidden="true"</code>, then let it speak a piece of visually hidden text.

How to use an icon as text:

``` html
<p>I <span class="icon icon-heart" aria-hidden="true"></span><span class="sr-only">love</span> web development</p>.
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

How to use an icon font inside a button:
``` html
<button type="button" class="button">
  <span class="icon icon-heart" aria-hidden="true"></span> Like
</button>
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

Or, if you don't want to show the text:
``` html
<button type="button" class="button">
  <span class="icon icon-heart" aria-hidden="true"></span><span class="sr-only">Like</span>
</button>
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Focus Styling

This one is simple. Don't remove outline focus styling on elements that can be tabbed to.

Don't just blindly do this:

``` css
:focus { outline: none; /* or outline: 0 */ }
```

If you need to remove outline styling, add in alternate styling:
* Change the <code>background-color</code>
* Change the <code>border-color</code>
* Change the <code>color</code>
* Add <code>text-decoration: underline</code>

More information about the outline styling and accessibility:
* [http://www.outlinenone.com/](http://www.outlinenone.com/)
* [WCAG Accessibility Guidelines for Keyboard Focus](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-visible)
* Detect user input methods with [What Input](https://github.com/ten1seven/what-input)
* Remove outline only on mousedown with [outline.js](https://github.com/lindsayevans/outline.js)

## Optimize For Keyboard Accessibility

### Tabindex

To add an element into the tab order of a page, set the HTML attribute <code>tabindex="0"</code>. Zero will tell the browser to tab into the element in sequential order. You may also specify the order by setting different numbers.

To remove an element from the tab order, set the tabindex attribute to -1: <code>tabindex="-1"</code>.

Elements that are naturally in sequential tab order (and do not need <code>tabindex="0"</code> added) include: <code>&lt;a&gt;</code>, <code>&lt;area&gt;</code>, <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;object&gt;</code>, <code>&lt;select&gt;</code>, and <code>&lt;textarea&gt;</code>.

### Access Keys

Access keys provide shortcuts to developer defined elements. Example:

``` html
<a href="/home" accesskey="h">Home</a>
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

There is no standard for setting access keys, but fairly common convention includes:
* <code>accesskey="1"</code> or <code>accesskey="h"</code> for homepage link
* <code>accesskey="2"</code> for skip to content
* <code>accesskey="3"</code> for sitemap
* <code>accesskey="4"</code> for search field focus
* <code>accesskey="5"</code> for advanced search, if available
* <code>accesskey="6"</code> for site nav tree
* <code>accesskey="9"</code> for contact information
* <code>accesskey="0" </code>for access key details or menu

Access keys are [activated differently by different browsers](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey).

### Esc Key

Don't forget to add JS to allow the escape key to close obtrusive UI elements such as modals.

With jQuery:

``` js
$(document).on('keyup',function(e) {
    if (e.keyCode === 27) {
       // Hide your modal
    }
});
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

With vanilla JS:

``` js
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode === 27) {
        // Hide your modal
    }
};
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Accessible HTML

### ARIA Attributes

Learn your ARIA (Accessible Rich Internet Applications) attributes:
* [MDN web docs: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
* [Getting Started With ARIA](https://a11yproject.com/posts/getting-started-aria/)
* [ARIA Examples](http://heydonworks.com/practical_aria_examples/)
* [W3C ARIA Specification](https://www.w3.org/TR/wai-aria/)

### Tables

Use table captions to describe your tabular data:
``` html
<table>
  <caption>Names and emails of Mercury New Media employees.</caption>
  <tr>
    <th>Name</th>
    <th>Email</th>
  </tr>
  <tr>
    <td>Don Bickel</td>
    <td>dbickel@mercurynewmedia.com</td>
  </tr>
  <tr>
    <td>Chris Karlo</td>
    <td>ckarlo@mercurynewmedia.com</td>
  </tr>
</table>
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

### Headings

Learn how to use headings and sectioning elements properly: [http://accessiblehtmlheadings.com/](http://accessiblehtmlheadings.com/).

## Screen Readers

* [macOS VoiceOver (Free)](https://webaim.org/articles/voiceover/)
* [Windows Narrator (Free)](https://support.microsoft.com/en-us/help/22798/windows-10-narrator-get-started)
* [NVDA (Free)](https://www.nvaccess.org/)
* [JAWS (Paid)](http://www.freedomscientific.com/Products/Blindness/JAWS)

A good indication of how a screen reader will speak content on your site is to view your site as text. You can use a tool like [Textise](https://www.textise.net/) to try this out.

## Continued Learning

* [Web Accessibility Tips And Tricks](http://mercurynewmedia.com/blog/blog-archive/mercury-new-media-blog/2015/12/17/web-accessibility-tips-and-tricks)