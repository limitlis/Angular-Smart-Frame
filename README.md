angular-iframed
===============

A simple AngularJS wrapper that drives an iframe in which you can manually set location.


## Why?
While developing and testing apps for certain SmartTVs using an iframe pointed at our development machine on the same network was the quickest and easiest method to see results on the tv.

The original implementation hard wired the dev machine's IP address to the iframe. Therefore you had to push a new build to the TV each time. It was very time consuming. This small tool aims to fix that by allowing you to enter a specific machine's IP address to point the iframe at. So the tool can remain on the TV. 

## Features
 - **Browser Test Suite** (external links)
  - [Modernizr test](http://modernizr.github.io/Modernizr/test)
  - [BrowserMark](http://browsermark.rightware.com)
  - [WASP ACID3 test](http://acid3.acidtests.org)
  - [CSS Animations](http://bennettfeely.com/csscreatures)
  - [CSS Animated Periodic table ](http://mrdoob.github.io/three.js/examples/css3d_periodictable.html)

- **On-Screen Keyboard** for use with SmartTVs that have mouse-like remotes.
  - hard-wired shortcuts to commonly used fragments (*localhost*, *192.168.*)

- **iFrame Overlay Controls**
  - Refresh iframe
  - Reposition overlay controls
  - Return to main screen

## Getting Started

    npm install
    bower install
    gulp

**View in browser**

    gulp serve

**_or view dist in browser_**

    gulp serve:dist

**Build to dist**

    gulp build


## TO DO
 
 - Bookmarkable urls
 - Add more test suites
 - General performance enhancements
 - ~~Add browser information so that it's easily accessible~~
 - ~~Better looking On-Screen Keyboard (OSK)~~ It's a bit better :)
 - 

 #### Known bugs
  + Sometimes OSK behaves weirdly and a click is handled multiple times