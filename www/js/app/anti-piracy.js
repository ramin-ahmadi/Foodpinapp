var iframe_content = document.getElementsByTagName('html'),
    anti_piracy_alert = document.createElement("h3"),
    supported_bowser_alert = document.createElement("h3"),
    anti_piracy_text = document.createTextNode("Please close the debug console and refresh the page to continue trying this app."),
    supported_bowser_text = document.createTextNode("Please try this demo on a webkit browser (Chrome or Safari)."),
    isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

anti_piracy_alert.setAttribute("id", "anti-piracy-alert");
anti_piracy_alert.appendChild(anti_piracy_text);
supported_bowser_alert.setAttribute("id", "supported-browser-alert");
supported_bowser_alert.appendChild(supported_bowser_text);

// First check if we are on a supported browser
if (!isChrome && !isSafari)
{
  document.removeChild(iframe_content[0]);
  document.appendChild(supported_bowser_alert);
  document.getElementById("supported-browser-alert").style.textAlign = "center";
}

jdetects.create(function(status){
  if(status == "on"){
    document.removeChild(iframe_content[0]);
    document.appendChild(anti_piracy_alert);
    document.getElementById("anti-piracy-alert").style.textAlign = "center";
  }

  if(status == "off"){

  }
});
