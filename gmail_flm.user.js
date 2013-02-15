// Google GMAIL Fixed Left Menu + Search
// version 0.42 BETA!
// 30-10-2005
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
// @description   Fixes the Left Menu + Top Navigation Bar in Place
// @include       http*://*mail.google.com/*mail/*
// ==/UserScript==

(function(){

//copies the search query to the top search box
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

//fixes chevron pointing to emails in folders
window._gm_fixChevron	= function(){
	//not yet implemented
}

window._gm_unFixer = function(){
	
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
	var label_menu		= document.getElementById('nb_0');
	if (label_menu !=null){
		var f_link			= document.createElement('div');
		f_link.id			= '_gm_side_bar_fixer';
		label_menu.parentNode.insertBefore(f_link, label_menu.previousSibling);
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

//fixes the top menu
window._gm_fixTopMenu = function (){
	var t = document.getElementById('tc_top');
	if (t != null){/*LOOKING AT INBOX/FOLDER*/
		t.style.position = "fixed";
	}else{/*VIEWING MAIL*/
		var tbl	= document.getElementsByTagName('table');
		for (var i=0; i <tbl.length; i++){
			if (tbl[i].className == 'th'){ /*GET FIRST TABLE LIKE THIS ONLY*/
				tbl[i].style.position 	= "fixed";
				//tbl[i].style.zIndex 	= "10000";
				i = tbl.length;
			}
		}
		//move right hand side across
		var sps	= document.getElementsByTagName('span');
		for (var i=0; i <sps.length; i++){
			if (sps[i].className == 'roz'){
				sps[i].style.position 	= "fixed;";
				sps[i].style.right		= "5px;";
				i = sps.length;
			}
		}
	}
	var et = document.getElementById('fi');
	if (et != null){/*READING EMAIL*/
		et.style.padding = "2em 26ex 0pt 8px";
	}else{/*LOOKING AT A FOLDER*/
		var tb = document.getElementById('tb');
		if (tb != null){
			tb.style.margin = "3em 0px 0px 0px";
		}
	}
	
	//fixes the adbar
	var adbar = document.getElementById('rh');
	if (adbar !=null){/*then in email, hence ads*/
		adbar.style.position 	= "fixed;";
		//adbar.style.top 		= "100px";
		adbar.style.margin = "3em 0px 0px 0px";
		//adbar.style.zIndex 		= "50";
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

window._gm_validateControls = function(){
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
		var strTarget = e.target;
	
		//Let gmail's code run first...
		var retval = routeEvent(e);
		
		//Wait for the page to redisplay then revalidate...
		_gm_validateControls();
		setTimeout("_gm_validateControls()", 500);
		setTimeout("_gm_validateControls()", 2000);
		setTimeout("_gm_validateControls()", 4000);
		setTimeout("_gm_validateControls()", 8000);
		setTimeout("_gm_validateControls()", 16000);
		//call smart-delete
		if (ProcessEvent)
			ProcessEvent(e);
			
		if (retval == false) return false;
   		else return true;
	} catch(e) {
		//GM_log("[ProcessEvent]: " + e);
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
		//GM_log("[ProcessKeyPressEvent]: " + e);
	}
};

_gm_initHandlers();
_gm_fixLeftMenu();
_gm_fixTopMenu();
})() 