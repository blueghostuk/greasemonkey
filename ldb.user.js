// LiveDepartureBoardFixer
// version 0.1 BETA!
// 31-08-2005
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
// select "LiveDepartureBoardFixer", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
// And http://platypus.mozdev.org/
//
// --------------------------------------------------------------------
// ==UserScript==
// @name            LiveDepartureBoardFixer
// @namespace       http://www.blueghost.co.uk/ldb.html
// @include         http://www.livedepartureboards.co.uk/ldb/*

function do_platypus_script() {
platypus_do_function(window, 'isolate',document.getElementById('contentwrap'),'null');
platypus_do_function(window, 'erase',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'erase',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'null');
platypus_do_function(window, 'do_insert_html',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<div id="departuresandnew"><div id="departures"><div class="containertitlebig"><h2><span class="red">LIVE</span> DEPARTURES &amp; ARRIVALS</h2></div><div class="containerbody"><form name="form2" method="get" action="http://www.nationalrail.co.uk/ldb/"><fieldset><legend class="hidden">Journey Details</legend> <label for="journeyplannerfrom" class="hidden">From - station or city</label> <h3>Station:</h3><input name="a" value="findDepartureBoard" type="hidden"> <input name="station_query" id="journeyplannerfrom" value="enter station" size="17" class="qjp" onfocus="clearText(this)" onblur="setText(this)" type="text"> <label for="departtype" class="hidden">Departure type</label> <select name="boardType" id="departtype" class="qjp"><option value="departures">Departures</option><option value="arrivals">Arrivals</option><option value="both" selected="selected">Both</option></select><br> <span class="bold">Limit by;</span><span class="italic">(optional)</span><br> <label for="trains" class="hidden">Trains</label> <select name="originOrDestination" id="trains"><option value="" selected="selected"></option><option value="origin">From</option><option value="destination">To</option></select> <label for="stationlimit" class="hidden">Station</label> <input name="stationFilter_query" id="stationlimit" value="enter station" size="17" onfocus="clearText(this)" onblur="setText(this)" type="text"><br> <div class="hdsubmit"><input src="http://www.nationalrail.co.uk/templates/images/buttons/find_trains.gif" name="Submit" id="submit" class="homedepartsubmit" alt="Find trains" type="image"></div></fieldset></form></div></div>',false,false);
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/H2[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'text-align: center;font-size: x-large;');
platypus_do_function(window, 'set_style_script',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/H2[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'color: black;text-align: center;font-size: x-large;');
platypus_do_function(window, 'do_insert_html',document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<ul class="secondnav"><li><a href="http://www.nationalrail.co.uk">Go to the National Rail Home Page</a></li><li><a href="http://www.nationalrail.co.uk/incidents/today.html">Currnet Incidents</a></li><li><a href="http://www.nationalrail.co.uk/service_bulletins/cleared.html">Cleared Problems</a></li><li><a href="http://www.nationalrail.co.uk/service_bulletins/currentAndFuture.html">Future Works</a></li></ul>',false,false);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);//.user.js