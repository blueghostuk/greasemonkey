// Google GMAIL Fixed Left Menu + Search
// version 0.2.1 BETA!
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
// select "Google GMAIL Fixed Left Menu + Search", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
// and also thanks to gmail-smart-delete-button (or previous), http://smart-delete-button.blogspot.com/.
// The code there helped me fix the 'reloading bug'
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google GMAIL Fixed Left Menu + Search
// @namespace     http://www.blueghost.co.uk/gmail_flm.html
// @description   Fixes the Left Menu in place
// @include       http*://*mail.google.com/*mail*
// ==/UserScript==

(function(){
window._gm_fillSBox		= function(){
	var sb	= document.getElementById('ss_box');
	var rb	= document.getElementsByTagName('input');
	for (var i=0; i <rb.length; i++){
		if (rb[i].name == 'q'){
			rb[i].value= sb.value;
			return;
		}
	}
}
//fixes the left menu and adds the search box+button
window._gm_fixLeftMenu = function(){
	var menu 			= document.getElementById('nav');
	if (menu !=null){
		menu.style.position = "fixed";
	}
	var l_m				= document.getElementById('in');
	if (l_m == null){/*try again???*/
		l_m				= document.getElementById('nb_1');
	}
	if (l_m != null){
		var s_form			= document.createElement('div');
		s_form.id			= '_gm_side_bar_search';
		s_form.innerHTML 	= '<form id="s_2" class="s" style="padding-bottom: 5px; white-space: nowrap;" onsubmit="return top.js._MH_OnSearch(window,0)">'+
							'<input style="width: 100%;" maxlength="2048" id="ss_box" name="q_2" value=""><br/>'+
							'<input value="Search&nbsp;Mail" onclick="javascript:_gm_fillSBox();" type="submit">'+
							'</form>';
		l_m.parentNode.insertBefore(s_form, l_m.nextSibling);
	}
};
//thanks to gmail-smart-delete-button (or previous), http://smart-delete-button.blogspot.com/
window._gm_initHandlers = function(){
	if (window.captureEvents) {
		window.addEventListener('click',	_gm_ProcessEvent,false);
		window.addEventListener('keypress',	_gm_ProcessKeyPressEvent,false);
		window.addEventListener('focus',	_gm_ProcessEvent,false);
		window.addEventListener('blur',		_gm_ProcessEvent,false);											
	}
};

window.validateControls = function(){
	var s_form	= document.getElementById('_gm_side_bar_search');
	if (!s_form){
		_gm_fixLeftMenu();
		_gm_fixTopMenu();
		_gm_fixChevron();
	}
};

//thanks to gmail-smart-delete-button (or previous), http://smart-delete-button.blogspot.com/
window._gm_ProcessEvent = function _gm_ProcessEvent(e) 
{   		
	try{
		if (!e) var e = window.event;
	
		//Let gmail's code run first...
		var retval = routeEvent(e);
		
		//Wait for the page to redisplay then revalidate...
		_gm_validateControls();
		setTimeout("_gm_validateControls()", 500);
		setTimeout("_gm_validateControls()", 2000);
		setTimeout("_gm_validateControls()", 4000);
		setTimeout("_gm_validateControls()", 8000);
		setTimeout("_gm_validateControls()", 16000);
		if (ProcessEvent)
			ProcessEvent(e);
		if (retval == false) return false;
   		else return true;
	} catch(e) {
		GM_log("[ProcessEvent]: " + e);
	}
};

//thanks to gmail-smart-delete-button (or previous), http://smart-delete-button.blogspot.com/
window._gm_ProcessKeyPressEvent = function _gm_ProcessKeyPressEvent(e) 
{   		
	try{
		if (!e) var e = window.event;
		var retval = routeEvent(e);
		
		//First call out generic event handler to validate controls...
		_gm_ProcessEvent(e);
		if (ProcessKeyPressEvent)
			ProcessKeyPressEvent(e);
		if (retval == false) return false;
   		else return true;
	} catch(e) {
		GM_log("[ProcessKeyPressEvent]: " + e);
	}
};

_gm_initHandlers();
_gm_fixLeftMenu();
})() 