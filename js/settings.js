/*var app;

function init() {
    System.Gadget.onSettingsClosing = SettingsClosing;
    app = System.Gadget.Settings.read("app");
    if (_0xe387x3 == "metric") {
        unit[1]["checked"] = true;
    };
    currentLocation = System["Gadget"]["Settings"]["read"]("");
    if (currentLocation != _0x730b[8]) {
        envVar[_0x730b[9]] = currentLocation;
    };
	//System.Gadget.document.parentWindow.getElementById("home").innerHTML = "meow";
};

function change_app(new_app) {
	app = new_app;
	//System.Gadget.Settings.write("app", new_app);
	//System.Gadget.document.getElementById("home").style.backgroundColor = "red";
};

function SettingsClosing(event) {
    if (event.closeAction == event.Action.commit) {
        System.Gadget.Settings.write("app", app);
    };
    event.cancel = false;
};*/
System.Gadget.onSettingsClosing = function(e) {
	fontPicker.settingsClosing(e);
	colorPicker.settingsClosing(e);
	
	System.Gadget.Settings.write('opacity', document.getElementById('foregroundOpacity').value);
	// System.Gadget.Settings.write('negativeVerticalMargin', document.getElementById('negativeVerticalMargin').value);
	// System.Gadget.Settings.write('negativeHorizontalMargin', document.getElementById('negativeHorizontalMargin').value);
}

function revertApp(){
	System.Gadget.Settings.write('app', 'home');
}

function init() {
	fontPicker.init();
	colorPicker.init();

	document.getElementById('foregroundOpacity').value = System.Gadget.Settings.read('opacity') || 30;
	// document.getElementById('negativeVerticalMargin').value = System.Gadget.Settings.read('negativeVerticalMargin') || 0;
	// document.getElementById('negativeHorizontalMargin').value = System.Gadget.Settings.read('negativeHorizontalMargin') || 0;
}


