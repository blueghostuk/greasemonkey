// BBC Radio Player Other Shows
// version 0.11 BETA!
// 07-07-2005
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
// select "BBC Radio Player Other Shows", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBC Radio Player Other Shows
// @namespace     http://www.blueghost.co.uk/bbc_rp3.html
// @description   Allows you to control playback more
// @include       http://www.bbc.co.uk/radio/aod/*
// ==/UserScript==

var more 	= document.getElementById('likethis');
var emb		= document.getElementsByTagName('embed');
var base	= "http://www.bbc.co.uk";
var days	= Array("mon", "tue", "wed", "thu", "fri", "sat", "sun");
var addon;
//var title;
for (var i=0; i < emb.length; i++){
	if (emb[i].type == "audio/x-pn-realaudio-plugin"){
		src = emb[i].src;
		i = emb.length; //endif
	}
}
if (src.indexOf('radio2') != -1){ /*radio 2 urls are different*/
	if (src.length >0){
		var index = src.lastIndexOf('_');
		var index2 = src.indexOf('_');
		if (index != index2){ /*has more than 1 _*/
			src = src.substring(0, index);
			src = src+"_";
		}
	}
}else{
	if (src.length >0){
		var index = src.indexOf('_');
		var si	= src.lastIndexOf('/');
		//title	= src.substring(si+1, src.length-8);
		//alert(title);
		src = src.substring(0, index);
		//alert(src);
		src = src+"_";
	}
}
var extra = Array();
window.setExtra = function (){
	var e_text = "";
	for (var i=0; i < extra.length; i++){
		//if (extra[i].indexOf(title) == -1)/* FILENAME != PERSON all the time HENCE REMOVED*/
		//if (extra[i].indexOf(src) == -1) //not same as src - DOESN:T WORK
		e_text += extra[i];
	}
	addon.innerHTML = '<div id="likethis">'+
		'<h3>Other Shows:</h3>'+
		e_text+
		'</div>';
}
var nonec = 0;
window.setNone = function (){
	nonec++;
	if (nonex == 7){
		addon.innerHTML = '<div id="likethis">'+
		'<h3>No Other Shows</h3>'+
		'</div>';
	}
}

if (more && (PlayerType !="live") && (src.length >0)) { // live shows won't have other listings
	addon 	= document.createElement("div");
	addon.innerHTML = '<div id="likethis">'+
			'<h3>Getting Other Shows ...</h3>'+
		'</div>';
	more.parentNode.insertBefore(addon, more);
	//extra = "";
	for (var j=0; j< days.length; j++){
		addon.innerHTML = '<div id="likethis">'+
			'<h3>Looking for other Shows</h3>'+
		'</div>';
		var src_url = src+days[j]+'.rpm';
		if (src.indexOf(base) == -1)
			src_url = base+src+days[j]+'.rpm'
		GM_xmlhttpRequest({
    		method: 'GET',
    		url: src_url,
    		headers: {
        		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml',
    		},
    		onload: function(responseDetails) {
				//var addon 	= document.createElement("div");
				if (responseDetails.status == 200){ //check response ok
					if ( responseDetails.responseText.indexOf('redirect') == -1 ){ 
						extra.push('<div id="ext_show_">'+
							'<a onclick="PlayPause();" href="'+responseDetails.responseText+'" title="Play in standalone Player">' +
							'<img src="http://www.bbc.co.uk/radio/aod/images/ico_realplayer.gif" width="16" height="12" border="0" alt="Play in RealPlayer" />' +
							' Listen using stand-alone Real Player</a>'+
							'</div>');
						setExtra();
					}
				}else{
					setNone();
				}
   			}
		});
	}
}