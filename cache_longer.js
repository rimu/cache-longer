console.log("Loading Cache Longer");


browser.webRequest.onHeadersReceived.addListener(
  function(details) {
  	var expires_found = false;
  	var cache_control_found = false;
    var d = new Date();
    d.setMonth(d.getMonth() + 6);
    new_expires = d.toUTCString();  //6 months in the future
    for (var header of details.responseHeaders) {
      if (header.name.toLowerCase() === 'expires') {
        header.value = new_expires;
        expires_found = true;
      }
      if (header.name.toLowerCase() === 'cache-control') {
      	header.value = 'public, max-age=15780000'; //6 months
      	cache_control_found = true;
      }
    }
    if(!expires_found) {
    	// If we are here, we didn't find any existing matching header.
    	details.responseHeaders.push({name: "Expires", value: new_expires });
    }
    if(!cache_control_found) {
    	details.responseHeaders.push({name: "Cache-Control", value: 'public, max-age=15780000' });	
    }

      
    
    return { responseHeaders: details.responseHeaders };
  },
  { urls: ["<all_urls>"], types: ["font", "image", "script", "stylesheet"] },
  ["blocking", "responseHeaders"]
);