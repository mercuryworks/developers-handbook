---
layout: post
title: "SASS"
author: Zachary Winnie
authorTitle: Senior Interface Designer
date: 2018-01-10 09:41:00;
lastUpdated: 2018-01-19 21:10:00;
categories: front-end-development sass css
permalink: /front-end-development/sass
order: 70.30
child: true
---

* [Homepage](http://sass-lang.com/){:target="_blank"}
* [Documentation](http://sass-lang.com/documentation){:target="_blank"}

## Variables

Declaring variables is easy. Note: Think about abstracting variables into other variables if they are going to blue used extensively, like with colors.

``` scss
$mercury-blue: #0d5cab;
$primary-color: $mercury-blue;
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Mixins

Declaring mixins:

``` scss
@mixin background-color($color) {
    background-color: $color;
}
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

Using mixins:

``` scss
@include background-color($primary-color);
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

You can also use <code>@content</code> to simply pass through content.

``` scss
@mixin for-xxs-up {
    @media (min-width: $xxs) {
        @content;
    }
}
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

And to use <code>@content</code>:

``` scss
@include for-xxs-up {
    background-color: $primary-color;
}
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Nesting

Keep nesting to one or two levels to keep code readable and maintainable:

``` scss
.button {
    background-color: $primary-color;
    // renders as .button:hover {}
    &:hover {
        background-color: $primary-color--dark;
    }
    // renders as .button-group .button {}
    .button-group & {
        border-radius: 0;
    }
}
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Colors

Common ways to change a color:

``` scss
$primary-color--dark: darken($primary-color, 5%);
$primary-color--light: lighten($primary-color, 5%);
$primary-color--bright: saturate($primary-color, 5%);
$primary-color--muted: desaturate($primary-color, 5%);
$primary-color--transparent: rgba($primary-color, .5);
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Math

Math operations act like you'd expect:

``` scss
$spacer: 15px;
$padding--medium: $spacer;
$padding--large: $spacer*2; // 30px
$padding--small: $spacer/2; // 7.5px
$padding--smaller: floor($spacer/2); // 7px
$padding--small: ceil($spacer/2); // 8px
$padding--larger: $spacer + $spacer + $spacer; // 45px
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Loops

For loops:

``` scss
$columns: 12;
@for $i from 1 through $columns {
    .column--#{$i} {
        width: percentage($i / $columns);
    }
}
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Conditionals

SASS has if/else statements:

``` scss
$border-radius: false;
@if $border-radius == true {
    border-radius: 4px;
}
@else  {
    border-radius: 0;
}
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Maps

Store key value information using a map:

``` scss
$colors: (
    $primary-color: #0d5cab,
    $secondary-color: #72c267
);
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

Retrieve values from a map:

``` scss
map-get($colors, $primary-color);
```
{% if gitbook %}
{% else %}
  <button type="button" class="button button--white button--smallest button--copy">Copy Code</button>
{% endif %}

## Mixin Libraries

* [Susy Grids](http://oddbird.net/susy/){:target="_blank"}
* [Bourbon](https://www.bourbon.io/){:target="_blank"}
* [Neat](https://neat.bourbon.io/){:target="_blank"}
* [Bitters](http://bitters.bourbon.io/){:target="_blank"}
* [Refills](http://refills.bourbon.io/){:target="_blank"}
* [Andy](http://gillesbertaux.com/andy/){:target="_blank"}
* [Juice](http://kylebrumm.com/juice/){:target="_blank"}
* [Family.scss](https://lukyvj.github.io/family.scss/){:target="_blank"}

## Resources

* [SASS Guidelines](https://sass-guidelin.es/){:target="_blank"}
* [SASS Playground](https://www.sassmeister.com/){:target="_blank"}
* [SASS Cheatsheet](https://devhints.io/sass){:target="_blank"}
* [Sass Functions Cheat Sheet](https://gist.github.com/AllThingsSmitty/3bcc79da563df756be46){:target="_blank"}