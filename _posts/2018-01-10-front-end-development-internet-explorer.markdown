---
layout: post
title: "Internet Explorer"
author: Zachary Winnie
authorTitle: Senior Interface Designer
date: 2018-01-10 19:41:00;
lastUpdated: 2018-01-10 19:41:00;
categories: front-end-development internet explorer browser support testing
permalink: /front-end-development/internet-explorer
order: 70.30
child: true
---

## IE11 (Current)

* 16.39% and falling (USA)
* IE11 needs to be thoroughly supported for the foreseeable feature with Windows 10

## IE10
0.98% and falling slowly (USA)

## IE9
0.90% and falling slowly (USA)

## IE8
1.18% and falling slowly (USA)

## IE7, IE6, and all others
Not on the charts (USA)

## Microsoft Support Of IE
Microsoft no longer supports Windows XP or IE8, and for IE9 and IE10, their usage is so small that these browsers can be ignored for clients for USA/Florida presence. Global clients (especially in emerging markets and lower income countries) should be researched thoroughly and may need older IE support. There is still prevalence of Windows XP and thus IE8 in these areas. Talk to your PO/RM and Chris when estimating for sales, as older browser support will significantly impact the cost of projects.

## Compatibility Mode
* Compatibility Mode is included in IE11, IE10, IE9, and IE8 browsers
* Forces IE to render as IE7, basically forcing a layout that doesn't support modern CSS box-sizing
* Clients will often get tripped up on this and leave this setting on, which breaks the layout of most sites
* Some internal IT departments set Compatibility Mode to on by default for internal web app support
* Edge no longer has Compatibility Mode
* Microsoft support/help article: [https://support.microsoft.com/en-us/kb/2536204](https://support.microsoft.com/en-us/kb/2536204){:target="_blank"}
