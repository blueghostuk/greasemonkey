// Google Maps Fixed Map
// version 0.1 BETA!
// 15-07-2005
// Copyright (c) 2005, Michael Pritchard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Maps Fixed Map", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Maps Fixed Map
// @namespace     http://www.blueghost.co.uk/gmaps_fixed.html
// @description   Fixes the Map in place while scrolling down a list of directions
// @include       http*://maps.google.*
// ==/UserScript==

var map 	= document.getElementById('map');
map.style.position = "fixed";