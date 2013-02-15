<?php
	header('Content-type: application/x-javascript');
	function write_header($file,$text){
   		if (!$handle = fopen($file, 'w')) {
      		echo "Cannot Open File ($file)";
			exit;
   		}

   		if (!fwrite($handle, $text)) {
      		echo "Cannot write to file ($file)";
      		exit;
   		}

   		//echo "Success, wrote ($text) to file ($file)";

   		fclose($handle);
	}
?>
// BBC News - See Also: Blogs
// version 0.1 BETA!
// 19-07-2005
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
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBC News - See Also: Blogs
// @namespace     http://www.blueghost.co.uk/bbc_blog.html
// @description   Gets blog posts about BBC News Stories
// @include       http://news.bbc.co.uk/*
// ==/UserScript==

(function(){
	// Evaluate an XPath expression aExpression against a given DOM node
	// or Document object (aNode), returning the results as an array
	// thanks wanderingstan at morethanwarm dot mail dot com for the
	// initial work.
	window.evaluateXPath = function(aNode, aExpr) {
  		var xpe = new XPathEvaluator();
  		var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
    		aNode.documentElement : aNode.ownerDocument.documentElement);
  		var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
  		var found = [];
  		while (res = result.iterateNext())
    		found.push(res);
  		return found;
	}
	window.showResults = function(weblogs, permalinks){
		var divs = document.getElementsByTagName('div');
		var prev;
		for (var i=0; i< divs.length; i++){
			if (divs[i].className == 'nlp'){
				prev = divs[i];
				i = divs.length;
			}
		}
		if (prev != null){
			var title = document.createElement('div');
			title.id  = 'sa_blogs';
			title.className = 'sah';
			title.innerHTML = 'SEE WEBLOGS';
			prev.parentNode.insertBefore(title, prev);
			var it = 2;
			var ip	= 0;
			for (var i=0; i < weblogs.length; i++){
				if (permalinks[ip+1] != null){
					if (permalinks[ip+1].nodeValue.indexOf(permalinks[ip].nodeValue) != -1)/*if has a permalink*/
						it = 2;
					else/*else use homepage link only*/
						it = 1;
				}else
					it = 1;
				var newT	= document.createElement('div');
				newT.id 	= 'sa_blog_'+i;
				newT.className	= 'arr';
				if (it == 2){
					newT.innerHTML 	= '<a href="'+permalinks[ip+1].nodeValue+'" target="_blank">'+weblogs[i].nodeValue+'</a>';
					ip+=2;
				}else{
					newT.innerHTML 	= '<a href="'+permalinks[ip].nodeValue+'" target="_blank">'+weblogs[i].nodeValue+'</a>';
					ip++;
				}
				title.parentNode.insertBefore(newT, title.nextSibling);
				title	= newT;
			}
			var newT	= document.createElement('div');
			newT.id 	= 'sa_blog_techlink';
			newT.innerHTML = '<a href="http://www.technorati.com/" target="_blank">SRC: Technorati</a>';
			title.parentNode.insertBefore(newT, title.nextSibling);
			title	= newT;
			var line = document.createElement('div');
			line.id	= 'sa_blog_line';
			line.innerHTML = '<img alt="Line" src="http://newsimg.bbc.co.uk/nol/shared/img/v3/line_seealso.gif" height="2" width="203">';
			title.parentNode.insertBefore(line, title.nextSibling);
		}
	}
	
	weblogs			= null;
	permalinks 		= null;
	var key			= '<?php echo $key;?>';
	var cosmos_url	= 'http://api.technorati.com/cosmos?key=';
	var params		= '&url='+document.location.href;
	
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: cosmos_url+key+params,
    	headers: {
      		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
      		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			//alert("Got XML");
        	var parser 		= new DOMParser();
        	var xmlDoc 		= parser.parseFromString(responseDetails.responseText, "application/xml");
			var permalinks 	= evaluateXPath(xmlDoc, "//nearestpermalink/text() | //weblog/url/text()");
			var weblogs 	= evaluateXPath(xmlDoc, "//weblog/name/text()");
			showResults(weblogs, permalinks);
    	}
	});
})() 