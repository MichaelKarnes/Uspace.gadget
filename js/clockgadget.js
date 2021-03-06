console.log('loaded: clockgadget.js');

var font;
var color;
var opacity;
// var negativeVerticalMargin;
// var negativeHorizontalMargin;

var toTime;
var toDate;
var toMonth;
var toDay;

var targetWidth;
var targetHeight;

function clockinit() {
	console.log('[clockinit]');

	readSettings();
	createTextObjects();
	refresh(true);
}

function readSettings() {
	console.log('[readSettings]');

	font = System.Gadget.Settings.readString('font') || 'Arial';
	color = System.Gadget.Settings.readString('color') || 'blueviolet';
	opacity = System.Gadget.Settings.read('opacity') || 70;
	// negativeVerticalMargin = System.Gadget.Settings.read('negativeVerticalMargin') || 0;
	// negativeHorizontalMargin = System.Gadget.Settings.read('negativeHorizontalMargin') || 0;

	console.log('    font: '+font);
	console.log('    color: '+color);
	console.log('    opacity: '+opacity);
}

function createTextObjects() {
	console.log('[createTextObjects]');

	var background = document.getElementById('background');
	background.removeObjects();

	// 0's are dummy chars for initial text object alignment
	toTime = background.addTextObject('00:00 AM', font, 105, color, 0, 0);
	toDate = background.addTextObject('0', font, 80, color, toTime.left, 90); //(toTime.top+toTime.height)*0.69);
	toMonth = background.addTextObject('0', font, 45, color, toDate.left+toDate.width, 95);
	toDay = background.addTextObject('0', font, 30, color, toDate.left+toDate.width, 135);

	//we really don't want to be changing the width of the gadget because of clock time
	//because gadgets are anchored on the desktop by the left side, and the content is right-aligned

	targetWidth = document.getElementsByTagName('body')[0].style.width = toTime.width;
	targetHeight = document.getElementsByTagName('body')[0].style.height = toDay.top + toDay.height;
}

function refresh(autoreload) {
	console.log('[refresh]');

	console.log('    font: '+font);
	console.log('    color: '+color);
	console.log('    opacity: '+opacity);


	var currentTime = System.Time.getLocalTime(System.Time.currentTimeZone);
	var currentDate = new Date(Date.parse(currentTime));

	var hours = currentDate.getHours();
	var meridiem = hours >= 12 ? ' PM' : ' AM';
	if(hours == 0) {
		hours = 12;
	}

	var minutes = currentDate.getMinutes();
	minutes = ((minutes < 10) ? ':0' : ':') + minutes;


	toTime.value = hours > 12 ? (hours-12) + minutes + meridiem : hours + minutes + meridiem;
	toTime.font = font;
	toTime.color = color;
	toTime.opacity = opacity;

	toTime.left = targetWidth - toTime.width;
	toTime.top = 0;


	toDate.value = currentDate.getDate();
	toDate.font = font;
	toDate.color = color;
	toDate.opacity = opacity;

	toDate.left = toTime.left;
	toDate.top = 90; // - negativeVerticalMargin;


	toMonth.value = m[currentDate.getMonth()];
	toMonth.font = font;
	toMonth.color = color;
	toMonth.opacity = opacity;

	toMonth.left = toDate.left + toDate.width;
	// goofly little formula here to goose the month riiiigh up to but not touching the time, for most fonts
	toMonth.top = toDate.top + 4 + (toDate.top * 0.05) ; //95;


	toDay.value = d[currentDate.getDay()];
	toDay.font = font;
	toDay.color = color;
	toDay.opacity = opacity;

	toDay.left = toMonth.left;
	toDay.top = toMonth.top + 41; //135;


	console.log('    width: '+toTime.width+', height: '+toDay.top + toDay.height);
	console.log('    toTime: x='+toTime.left+', y='+toTime.top+', h='+toTime.height+', w='+toTime.width);
	

	if (autoreload && System.Gadget.Settings.readString('app') == 'clock' ) {
		setTimeout(function() { refresh(true); }, 60*1000);
	}
}
