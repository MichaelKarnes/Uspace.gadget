/** @type {Array} */
//var _0xec43 = ["EUR|BE|BE011|LANGEMARK|", "metric", "settingsUI", "Gadget", "Settings.html", "onSettingsClosed", "file", "Location", "read", "Settings", "", "write", "units", "width", "style", "130px", "height", "67px", "src", "url(images/bg-docked.png)", "beginTransition", "removeObjects", "daytimeHigh", "forecastArray", "\u00b0 / ", "nighttimeLow", "\u00b0", "Segoe UI", "White", "addTextObject", "align", "temperature", "images/icons/lg/", "icon", ".png", "addImageObject",
//"length", "city", "substr", "...", "NA\u00b0 / NA\u00b0", "NA\u00b0", "No data ...", "images/icons/lg/01.png", "retrieveWeather()", "setTimeout", "WScript.Shell", "url"];
//var location = "EUR|BE|BE011|LANGEMARK|";
/** @type {null} */
var xmlData = null;
//var units = "metric";
var app = "home";

////////////////////////////////////////////////////////////////////////////////////////////////////
//Two small functions to make gadgets high-dpi compatible by the author of 8GadgetPack  (Version 1)
//Include this if you use addTextObject or addImageObject.
//You also have to wrap fixDpiObject around every call to one of those functions.
//For example replace "g.addTextObject(...)" with "fixDpiObject(g.addTextObject(...))"
////////////////////////////////////////////////////////////////////////////////////////////////////

function getDpiScaling() {
    var wshShell = new ActiveXObject("WScript.Shell");
    var DPI = 96;
    try {
        try {
            //You can set custom DPI in 8GadgetPack
            DPI = wshShell.RegRead("HKCU\\Software\\8GadgetPack\\ForceDPI");
        }
        catch (e) {
            //In case no custom DPI is set or 8GadgetPack isn't installed
            DPI = wshShell.RegRead("HKCU\\Control Panel\\Desktop\\LogPixels");
        }
        wshShell.RegRead("HKCU\\Software\\8GadgetPack\\NoGadgetScalingFix"); //In case I'll be able to fix this in sidebar.exe I will set this registry entry
        DPI = 96;
    }
    catch (e) { }
    return parseInt((DPI / 96) * 100) / 100;
}
var dpiScaling = getDpiScaling();
function fixDpiObject(obj) {
    if ("fontsize" in obj) {
        obj.left = obj.left * dpiScaling;
        obj.top = obj.top * dpiScaling;
    }
    else {
        obj.left = obj.left * dpiScaling + (obj.width * dpiScaling - obj.width) / 2;
        obj.top = obj.top * dpiScaling + (obj.height * dpiScaling - obj.height) / 2;
    }
    obj.width = obj.width * dpiScaling;
    obj.height = obj.height * dpiScaling;
    return obj;
}
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


//@return {undefined}

function init() {
    System.Gadget.settingsUI = "settings.html";
    System.Gadget.onSettingsClosed = function() {
		if(app == "clock"){
			readSettings();
			createTextObjects();
			refresh(false);
		}
		
		if(app == "percentage"){
			readPercentSettings();
			createPercentTextObjects();
			refreshPercent(false);
		}
		
		if(System.Gadget.Settings.readString('app') == "weather"){
			weatherinit();
		}
		
		if(app != System.Gadget.Settings.readString('app')){
			app = System.Gadget.Settings.readString('app');
			setApp();
		}
	};
	app = System.Gadget.Settings.readString('app');
	setApp();
}

function setApp() {
	System.Gadget.document.getElementById("home").style.display = "none";
	System.Gadget.document.getElementById("clock").style.display = "none";
	//System.Gadget.document.getElementById("facebook").style.display = "none";
	System.Gadget.document.getElementById("weather").style.display = "none";
	System.Gadget.document.getElementById("calculator").style.display = "none";
	System.Gadget.document.getElementById("percentage").style.display = "none";
	switch(app) {
		case "home":
		System.Gadget.document.getElementById("home").style.display = "";
		homeInit();
		break;
		case "clock":
		System.Gadget.document.getElementById("clock").style.display = "";
		clockInit();
		break;
		/*case "facebook":
		System.Gadget.document.getElementById("facebook").style.display = "";
		facebookInit();
		break;*/
		case "weather":
		System.Gadget.document.getElementById("weather").style.display = "";
		weatherInit();
		break;
		case "calculator":
		System.Gadget.document.getElementById("calculator").style.display = "";
		calculatorInit();
		break;
		case "percentage":
		System.Gadget.document.getElementById("percentage").style.display = "";
		percentageInit();
		break;
		default:
		System.Gadget.document.getElementById("home").style.display = "";
		homeInit();
		break;
	}
};

function change_app(new_app) {
	app = new_app;
	setApp();
};

function homeInit() {
	//background.src = "url(images/background2.png)";
	background.removeObjects();
	System.Gadget.Settings.write('app', 'home');
	System.Gadget.document.getElementById("background").addImageObject("images/logo.png", 0, 0);
	//System.Gadget.document.getElementById("background").addImageObject("images/icons/clock.png", 0, 45);
	document.getElementsByTagName('body')[0].style.height = "160px";
	document.getElementsByTagName('body')[0].style.width = "130px";
};

function clockInit() {
	System.Gadget.Settings.write('app', 'clock');
	document.getElementsByTagName('body')[0].style.width = "190px";
	document.getElementsByTagName('body')[0].style.height = "200px";
	clockinit();
}

function facebookInit() {
	//background.src = "url(images/background_large.png)";
	System.Gadget.Settings.write('app', 'facebook');
	background.removeObjects();
	document.getElementsByTagName('body')[0].style.height = "120px";
};

function twitterInit() {
	//background.src = "url(images/background_large.png)";
	System.Gadget.Settings.write('app', 'twitter');
	background.removeObjects();
    background.style.height = "120px";
	document.getElementsByTagName('body')[0].style.height = "450px";
	//document.getElementsByTagName('body')[0].style.width = "400px";
};

function weatherInit() {
	//background.src = "url(images/background_large.png)";
	System.Gadget.Settings.write('app', 'weather');
	background.removeObjects();
	document.getElementsByTagName('body')[0].style.height = "60px";
	//document.getElementsByTagName('body')[0].style.width = "160px";
	weatherinit();
};

function calculatorInit() {
	//background.src = "url(images/background_large.png)";
	System.Gadget.Settings.write('app', 'calculator');
	background.removeObjects();
	document.getElementsByTagName('body')[0].style.height = "180px";
	calculatorinit();
};

function percentageInit() {
	//background.src = "url(images/background.png)";
	System.Gadget.Settings.write('app', 'percentage');
	background.removeObjects();
	document.getElementsByTagName('body')[0].style.width = "50px";
	document.getElementsByTagName('body')[0].style.height = "50px";
	percentageinit();
};