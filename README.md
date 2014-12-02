angular-iframed
===============

A simple AngularJS wrapper that drives an iframe in which you can manually set location.


## Why? -
While developing and testing apps for certain SmartTVs using an iframe pointed at our development machine on the same network. 

The original implementation used gulp and hard wired the dev machine's IP address to the iframe. Therefore you had to push a new build to the TV each time. 

### Features -
 - **Browser Test Suite** (external links)
  - [Modernizr test](http://modernizr.github.io/Modernizr/test)
  - [BrowserMark](http://browsermark.rightware.com)
  - [WASP ACID3 test](http://acid3.acidtests.org)
  - [CSS Animations](http://bennettfeely.com/csscreatures)
  - [CSS Animated Periodic table ](http://mrdoob.github.io/three.js/examples/css3d_periodictable.html)

- **On-Screen Keyboard** for use with SmartTVs that have mouse-like remotes.
  - hard-wired shortcuts to commonly used fragments (*localhost*, *192.168.*)

- **iFrame controls**
  - Refresh iframe shortcut
  - Reposition 

### Getting Started

    npm install
    bower install
    gulp

**Test in browser**

    gulp serve

**_or test dist_**

    gulp serve:dist

**Build to dist**

    gulp build


#### TO DO -
 - Bookmarkable urls
 - Better looking On-Screen Keyboard (OSK)
 - Add more test suites
 - Add browser information so that it's easily accessible
 - General performance enhancements

 #### Known bugs
  + Sometimes OSK behaves weirdly and a click is handled multiple times