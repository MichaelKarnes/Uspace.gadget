var app;

function init() {
    System.Gadget.onSettingsClosing = SettingsClosing;
    app = System.Gadget.Settings.read("app");
    /*if (_0xe387x3 == "metric") {
        unit[1]["checked"] = true;
    };*/
    /*currentLocation = System["Gadget"]["Settings"]["read"]("");
    if (currentLocation != _0x730b[8]) {
        envVar[_0x730b[9]] = currentLocation;
    };*/
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
};