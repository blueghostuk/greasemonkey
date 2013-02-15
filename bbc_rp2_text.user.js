// BBC Radio Player Extra Controls Text Version
// version 0.22 BETA!
// 09-10-2005
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
// select "BBC Radio Player Play Externally", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBC Radio Player Extra Controls Text Version
// @namespace     http://www.blueghost.co.uk/bbc_rp2.html
// @description   Allows you to control playback more
// @include       http://www.bbc.co.uk/radio/aod/*
// ==/UserScript==

/*overwrite existing as it want to access to non-existant playpause button*/
unsafeWindow.ImgPlay = function (){
	//do nothing
}
/*overwrite existing as it want to access to non-existant playpause button*/
unsafeWindow.ImgPause = function (){
	//do nothing
}

var more 	= document.getElementById('controls');
var emb		= document.getElementsByTagName('embed');
var base	= "http://www.bbc.co.uk";
for (var i=0; i < emb.length; i++){
	if (emb[i].type == "audio/x-pn-realaudio-plugin"){
		src = emb[i].src;
		i = emb.length; //endif
	}
}
if (more && (unsafeWindow.PlayerType !="live") && (src.length >0)) { //only for recorded content
	//more.className = 'statinfo';
	more.innerHTML = '<embed src="'+base+src+'" type="audio/x-pn-realaudio-plugin" pluginspage="http://www.bbc.co.uk/webwise/askbruce/articles/download/howdoidownloadrealplayer_1.shtml" width="0" height="0" name="RP" autostart="true" console="one" nojava="true" />'+
	'<table cellpadding="0" cellspacing="0" border="0" width="247">'+
		'<tr>'+
			'<td rowspan="2" valign="top">'+
				'<a style="cursor: pointer;" href="#" accesskey="4" onclick="javascript:if (this.title==\'Pause\'){document.RP.DoPause();this.title=\'Play\'; this.innerHTML=\'->\';}else{document.RP.DoPlay();this.title=\'Pause\'; this.innerHTML=\'||\';}" title="Pause">||</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="Rewind(15);" accesskey="5" title="Back 15 Mins">-15</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="Rewind(3);" accesskey="6" title="Back 3 Mins">-3</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="Rewind(1);" accesskey="7" title="Back 1 Min">-1</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="FForward(1);" accesskey="8" title="Foward 1 Min">+1</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="FForward(3);" accesskey="9" title="Foward 3 Mins">+3</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="FForward(15);" title="Foward 15 Mins">+15</a>' +
			'</td>'+
			'<td align="right">'+
				' | <a style="cursor: pointer;" href="#" onclick="VolChange(-20);" accesskey="w" title="Vol. -">--</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="VolChange(20);" accesskey="q" title="Vol. +">++</a>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td align="right">'+
				'<img src="/radio/aod/images/pic_vol0.gif" width="53" height="11" alt="Volume indicator" border="0" name="volume" />'+
			'</td>'+
		'</tr>'+
	'</table>';
}
if (more && (unsafeWindow.PlayerType =="live") && (src.length >0)) { //only for live controls
	//more.className = 'statinfo';
	more.innerHTML = '<embed src="'+base+src+'" type="audio/x-pn-realaudio-plugin" pluginspage="http://www.bbc.co.uk/webwise/askbruce/articles/download/howdoidownloadrealplayer_1.shtml" width="0" height="0" name="RP" autostart="true" console="one" nojava="true" />'+
	'<table cellpadding="0" cellspacing="0" border="0" width="247">'+
		'<tr>'+
			'<td rowspan="2" valign="top">'+
				'| <a style="cursor: pointer;" href="#" accesskey="4" onclick="javascript:if (this.title==\'Pause\'){document.RP.DoPause();this.title=\'Play\'; this.innerHTML=\'Play\';}else{document.RP.DoPlay();this.title=\'Pause\'; this.innerHTML=\'Pause\';}" title="Pause">Pause</a> |' +
			'</td>'+
			'<td align="right">'+
				' | <a style="cursor: pointer;" href="#" onclick="VolChange(-20);" accesskey="w" title="Vol. -">--</a>' +
				' | <a style="cursor: pointer;" href="#" onclick="VolChange(20);" accesskey="q" title="Vol. +">++</a>'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td align="right">'+
				'<img src="/radio/aod/images/pic_vol0.gif" width="53" height="11" alt="Volume indicator" border="0" name="volume" />'+
			'</td>'+
		'</tr>'+
	'</table>';
}