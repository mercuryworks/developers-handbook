---
layout: post
title: "Internet Explorer"
author: Zachary Winnie
authorTitle: Senior Interface Designer
date: 2018-01-10 19:41:00;
lastUpdated: 2018-01-20 15:28:00;
categories: front-end-development internet explorer ie ie11 ie10 ie9 ie8 edge browser support testing
permalink: /front-end-development/internet-explorer
order: 70.30
child: true
---

## Internet Explorer 11

* 10.5% and falling in the USA
* IE11 needs to be thoroughly supported for the foreseeable feature with Windows 10

## Older Internet Explorer Versions

* 1% or less or not on the charts in the USA
* Includes IE10, IE9, IE8, and older IE versions

## Microsoft Support Of Internet Explorer

Microsoft no [longer supports Windows XP](https://www.microsoft.com/en-us/windowsforbusiness/end-of-xp-support){:target="_blank"} or [IE10 or older versions of IE](https://www.microsoft.com/en-us/windowsforbusiness/end-of-ie-support){:target="_blank"}. Usage is so small for these browsers that these browsers can be ignored for clients for USA/Florida presence. Global clients (especially in emerging markets and lower income countries) should be researched thoroughly and may need older IE support. There is still prevalence of Windows XP and thus IE8 in these areas. Talk to your PO or RM when estimating for new clients or projects, as older browser support will significantly impact the cost of projects.

## Compatibility Mode

* Compatibility Mode is included in IE11, IE10, IE9, and IE8 browsers
* This mode forces IE to render as IE7, forcing a layout engine that doesn't support modern CSS features
* Clients will often get tripped up on this and leave this setting on, which breaks the layout of modern sites
* Some internal IT departments set Compatibility Mode to on by default for internal web app support
* [Microsoft Edge](https://www.microsoft.com/en-us/windows/microsoft-edge){:target="_blank"} no longer has Compatibility Mode
* Refer to this [Microsoft support article about Compatibility Mode](https://support.microsoft.com/en-us/kb/2536204){:target="_blank"} for more

## Resources

* [StatCounter Browser Version USA Stats](http://gs.statcounter.com/browser-version-market-share/all/united-states-of-america){:target="_blank"}
* [w3school Internet Explorer Stats](https://www.w3schools.com/browsers/browsers_explorer.asp){:target="_blank"}
* [Windows VM's for testing IE](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/){:target="_blank"}
* [Microsoft Edge Platform Status](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/){:target="_blank"}