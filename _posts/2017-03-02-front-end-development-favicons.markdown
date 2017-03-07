---
layout: post
title: "Favicons"
author: Zachary Winnie, Senior Interface Designer
date: 2017-03-02 10:36:00 -0500
lastUpdated: 2017-03-02 13:42:00 -0500;
categories: front-end-development favicons
permalink: /front-end-development/favicons
order: 70.10
child: true
---

## Browser Support

At minimum, provide the following for the browsers that Mercury supports:
* 32x32 PNG Icon
* 180x180 PNG apple-touch-icon 
* macOS Safari safari-pinned-tab SVG
* Android Chrome meta theme color, manifest.json, and android-chrome PNG icons
* browserconfig.xml for Windows Metro and mstile PNG icons

Note: You don't really need a .ico file anymore unless you need to support Internet Explorer versions older than IE11.

## Creating Favicons

Use Real Favicon Generator to create your favicons: [Real Favicon Generator](http://realfavicongenerator.net/). Suggested steps:
1. Create a 260x260 pixel (minimum) image, export to PNG
2. Upload to Real Favicon Generator
3. Adjust settings for iOS
4. Adjust settings for Android
  * A solid color background
5. Adjust settings for Windows Metro
  * This looks best with the white silhouette option selected, with the brand color as the tile color
6. Adjust settings for macOS Safari pinned tab svg icon
  * This icon is limited to one color, so a solid one color logo works best
7. Adjust Generator Options
  * You can specify a path to your favicons
  * You can add compression to the favicon files (you can usually select the full compression)
  * Select a scaling algorithm (Lanczos is usually the best)
8. Hit the generate button
9. Download your icons and copy your code


## Resources

### Wikipedia

Wikipedia has surprisingly good documentation on using favicons, including instructions on how to use, browser support, and history: [https://en.wikipedia.org/wiki/Favicon](https://en.wikipedia.org/wiki/Favicon).

### Favicon Cheat Sheet

[Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet)