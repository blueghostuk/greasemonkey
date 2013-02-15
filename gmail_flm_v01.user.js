// Google GMAIL Fixed Left Menu + Search
// version 0.1.1 BETA!
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
// select "Google GMAIL Fixed Left Menu", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google GMAIL Fixed Left Menu
// @namespace     http://www.blueghost.co.uk/gmail_flm.html
// @description   Fixes the Left Menu in place
// @include       http*://*mail.google.com/*mail*
// ==/UserScript==

(function(){

window._gm_fixLeftMenu = function(){
	var menu 			= document.getElementById('nav');
	if (menu !=null){
		menu.style.position = "fixed";
	}
};

_gm_fixLeftMenu();
})()