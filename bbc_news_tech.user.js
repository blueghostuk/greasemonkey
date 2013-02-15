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
// @include       http://newsvote.bbc.co.uk/*
// @include       http://news.bbc.co.uk/cbbcnews/*
// ==/UserScript==

(function(){
		  
	function addGlobalStyle(css) {
    	var head, style;
   	 	head = document.getElementsByTagName('head')[0];
    	if (!head) { return; }
    	style = document.createElement('style');
    	style.type = 'text/css';
    	style.innerHTML = css;
    	head.appendChild(style);
	}
	
	function showHideBlogs(id, a){
		var block 	= document.getElementById(id);
		var ele		= document.getElementById(a);
		if (block.style.display == ""){
			block.style.display = "none";
			ele.innerHTML 		= "SHOW BLOGS";
			ele.title			= "Click here to show blogs";
		}else{
			block.style.display = "";
			ele.innerHTML 		= "HIDE BLOGS";
			ele.title			= "Click here to hide blogs";
		}
	}
	
	// Evaluate an XPath expression aExpression against a given DOM node
	// or Document object (aNode), returning the results as an array
	// thanks wanderingstan at morethanwarm dot mail dot com for the
	// initial work.
	function evaluateXPath(aNode, aExpr) {
  		var xpe = new XPathEvaluator();
  		var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
    		aNode.documentElement : aNode.ownerDocument.documentElement);
  		var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
  		var found = [];
  		while (res = result.iterateNext())
    		found.push(res);
  		return found;
	}
	
	function showResults(permalinks, weblogs, t){
		//alert("t sent = "+t+", t set = "+parseInt(GM_getValue('sa_time', 0)));
		var tc = parseInt(GM_getValue('sa_time', 0));//need to convert from string to maintain correct value, see http://www.forum4designers.com/message271507.html
		
		if (tc == t){/*same request*/
			var title = document.getElementById('sa_blog_container');
			if (weblogs.length > 0){
				var data = "";
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
					if (permalinks[ip] != null){
						if (it == 2){
							data	+= '<a href="'+permalinks[ip+1].nodeValue+'" target="_blank">'+weblogs[i].nodeValue+'</a>';
							ip+=2;
						}else{
							data	+='<a href="'+permalinks[ip].nodeValue+'" target="_blank">'+weblogs[i].nodeValue+'</a>';
							ip++;
						}
					}
				}
				data	+= '<hr class="divider" />';
				data	+= '<a href="http://www.technorati.com/" target="_blank">SRC: Technorati</a>';
				title.innerHTML = '<div id="blog_title">SEE WEBLOGS: <a id="shb" title="Click here to Hide Blogs" href="javascript:showHideBlogs(\'blog_data\', \'shb\');">HIDE BLOGS</a></div><div id="blog_data">'+data+'</div>';
			}else{
				title.innerHTML = '<div id="blog_title">NO WEBLOGS</div>';
				title.innerHTML = '<div id="blog_title">NO WEBLOGS</div><div id="blog_data"><hr class="divider" /><a href="http://www.technorati.com/" target="_blank">SRC: Technorati</a></div>';
			}
		}
	}

	var key	= '5eef53aca8a50922f1c149d5adcc29ae';
	var cosmos_url	= 'http://api.technorati.com/cosmos?key=';
	var params		= '&url='+document.location.href;
	
	addGlobalStyle('#sa_blog_container {position: fixed;top: 0px;right: 0px;border: thin solid #000000;font-family: Verdana, Arial, Helvetica, sans-serif;width:auto;float:right;margin-right: 5px;margin-top: 5px;}');
	addGlobalStyle('#blog_title {text-align:right;font-size: small;font-weight: bold;text-transform: uppercase;color: #000000;text-decoration: underline;background-color: #CCCCCC;padding: 2px;}');
	addGlobalStyle('#blog_title a {text-decoration: underline;}');
	addGlobalStyle('#blog_title a:hover {color: #FF0000;text-decoration: underline;}');
	addGlobalStyle('#blog_data {font-size: small;background-color: #ECE9D8;padding: 2px;}');
	addGlobalStyle('#blog_data a {text-decoration: underline;display: block;}');
	addGlobalStyle('#blog_data a:hover {color: #FF0000;text-decoration: underline;}');
	addGlobalStyle('hr.divider {border: thin solid #000000;}');
	
	var divs = document.getElementsByTagName('div');
	var prev;
	
	for (var i=0; i< divs.length; i++){
		if (divs[i].className == 'nlp'){
			prev = divs[i];
			i = divs.length;
		}
	}
	
	if (prev != null){
		var t = new Date().getTime();
		//alert("t was= "+t+", t set = "+GM_getValue('sa_time'));
		GM_setValue('sa_time', t + ""); //need to convert to string to maintain correct value, see http://www.forum4designers.com/message271507.html

		var title = document.createElement('div');
		title.id  = 'sa_blog_container';
		title.innerHTML = '<div id="blog_title">LOADING WEBLOGS</div>';
		prev.parentNode.insertBefore(title, prev);
		var c = 0;
			
		GM_xmlhttpRequest({
    		method: 'GET',
    		url: cosmos_url+key+params,
    		headers: {
      			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
      			'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onreadystatechange: function(responseDetails) {
				if (c >3){
					c = 0;
					title.innerHTML = '<div id="blog_title">LOADING WEBLOGS....('+responseDetails.readyState+')</div>';
				}else{
					var cs = "";
					for (var i=0; i < c; i++)
						cs +=".";
					title.innerHTML = '<div id="blog_title">LOADING WEBLOGS'+cs+'('+responseDetails.readyState+')</div>';
					c++;
				}
			},
			onerror: function(responseDetails) {
				title.innerHTML = '<div id="blog_title">ERROR GETTING RESULTS</div>';
			},
			onload: function(responseDetails) {
				//alert("Got XML");
        		var parser 		= new DOMParser();
        		var xmlDoc 		= parser.parseFromString(responseDetails.responseText, "application/xml");
				var permalinks 	= evaluateXPath(xmlDoc, "//nearestpermalink/text() | //weblog/url/text()");
				var weblogs 	= evaluateXPath(xmlDoc, "//weblog/name/text()");
				showResults(permalinks, weblogs, t);
    		}
		});
	}
})() 