// BBC Video Player Play Externally
// version 0.1 BETA!
// 22-07-2005 (UK FORMAT)
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
// select "BBC Video Player Play Externally", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBC Video Player Play Externally
// @namespace     http://www.blueghost.co.uk/bbc_vp.html
// @description   Allows you to play all content externally
// @include       http://news.bbc.co.uk/nolavconsole/*
// @include       http://news.bbc.co.uk/sol/*
// @include		  http://www.bbc.co.uk/weather/broadband/*
// ==/UserScript==

(function(){

var emb		= document.getElementById('nolplayer');
if (!emb){
	var emb	= document.getElementById('nolplayer2');
}
if (!emb)
	return;

//detect existing link via playback img
var src 	= emb.src;
var d = document.getElementById('vidhml8');

if (d != null){
	var extra = ' | <a id="vp_ext_link" href="'+src+'" title="Click to play externally"><img src="http://www.bbc.co.uk/radio/aod/images/ico_realplayer.gif" width="16" height="12" border="0" alt="Play in RealPlayer" /></a></div>';
	d.innerHTML	= d.innerHTML + extra;
}
})() 