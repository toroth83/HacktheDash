window.setInterval(function() {

	document.querySelector("body").style.backgroundColor = "rgb(63,63,63)";
	document.querySelector("#dashboardContainer > h1").style.color = "white";

	//These are the colors that we'll get from the dashboard so that
	//things work on either theme.
	var routinecolor, mediumcolor, highcolor, criticalcolor;
	var grayboxcolor = document.defaultView.getComputedStyle(document.querySelector("#pie-example-32 > svg"),null).getPropertyValue("background-color");
	console.log(grayboxcolor);

	//these are the colors we'll use from CW, we tweaked a few
	var cwroutinecolor = "rgb(99,162,255)";
	var cwmediumcolor = "rgb(255,255,11)";
	var cwhighcolor = "rgb(252,135,9)";
	var cwcriticalcolor = "rgb(252,0,7)";




	//##############################
	//FIX THE PIE
	//##############################


	var legend = document.querySelector("#pie-example-32 > svg > g.dxc-legend > g");
	var pie = document.querySelector("#pie-example-32 > svg > g.dxc-series-group > g > g");


	//Retrieve the current colors from the legend, update the the legend colors
	//while we're already there.
	for (var i = 0 ; i < legend.childNodes.length; i++) 
	{
		var e = legend.childNodes[i];
		if (e.innerHTML.indexOf("Routine") > -1) 
		{
			routinecolor = document.defaultView.getComputedStyle(legend.childNodes[(i-1)],null).getPropertyValue("fill");
			legend.childNodes[(i-1)].style.fill = cwroutinecolor;
		};

		if (e.innerHTML.indexOf("Medium") > -1) 
		{
			mediumcolor = document.defaultView.getComputedStyle(legend.childNodes[(i-1)],null).getPropertyValue("fill");
			legend.childNodes[(i-1)].style.fill = cwmediumcolor;
		};

		if (e.innerHTML.indexOf("High") > -1) 
		{
			highcolor = document.defaultView.getComputedStyle(legend.childNodes[(i-1)],null).getPropertyValue("fill");
			legend.childNodes[(i-1)].style.fill = cwhighcolor;
		};

		if (e.innerHTML.indexOf("Critical") > -1) 
		{
			criticalcolor = document.defaultView.getComputedStyle(legend.childNodes[(i-1)],null).getPropertyValue("fill");
			legend.childNodes[(i-1)].style.fill = cwcriticalcolor;
		};
	};

	//Update the pie parts with the proper colors.
	for (var i = 0; i < pie.childNodes.length; i++) 
	{
		var e = pie.childNodes[i];
		if ( document.defaultView.getComputedStyle(e,null).getPropertyValue("fill") == routinecolor ) 
		{
			e.style.fill = cwroutinecolor;
		};
		if ( document.defaultView.getComputedStyle(e,null).getPropertyValue("fill") == mediumcolor ) 
		{
			e.style.fill = cwmediumcolor;
		};
		if ( document.defaultView.getComputedStyle(e,null).getPropertyValue("fill") == highcolor ) 
		{
			e.style.fill = cwhighcolor;
		};
		if ( document.defaultView.getComputedStyle(e,null).getPropertyValue("fill") == criticalcolor ) 
		{
			e.style.fill = cwcriticalcolor;
		};
	};
	


	//This contains all the paths and boxes for the pie labels
	var pielabelg = document.querySelector("#pie-example-32 > svg > g.dxc-labels-group > g");

	//loop through all the child elements so we can make the following changes:
	//1. update the boxes to match pie section color (rect)
	//2. update the link lines to math pie section color (path)
	//3. change text-color to black (text)
	for (var i = 0; i < pielabelg.getElementsByTagName("*").length; i++) {
		var e = pielabelg.getElementsByTagName("*")[i];

		if (e.tagName == "rect")
		{
			var c = document.defaultView.getComputedStyle(e,null).getPropertyValue("fill");
			switch (c)
			{
				case (routinecolor):
				e.style.fill = cwroutinecolor;
				break;
				case (mediumcolor):
				e.style.fill = cwmediumcolor;
				break;
				case (highcolor):
				e.style.fill = cwhighcolor;
				break;
				case (criticalcolor):
				e.style.fill = cwcriticalcolor;
				break;

			}
		}

		if (e.tagName == "path")
			var c = document.defaultView.getComputedStyle(e,null).getPropertyValue("stroke");
		switch (c)
		{
			case (routinecolor):
			e.style.fill = cwroutinecolor;
			break;
			case (mediumcolor):
			e.style.fill = cwmediumcolor;
			break;
			case (highcolor):
			e.style.fill = cwhighcolor;
			break;
			case (criticalcolor):
			e.style.fill = cwcriticalcolor;
			break;
		}
	

		if (e.tagName == "text")
		{
			e.style.fill = "black";
		}
	}
	//set pie background color.
	document.querySelector("#pie-example-32 > svg > g.dxc-title > g > text").style.fill = "white";
	document.querySelector("#pie-example-32 > svg").style.backgroundColor = "rgb(63,63,63)";





	//##############################
	//FIX NEW MSP TICKETS COLOR
	//##############################

	//set the font-color
	document.querySelector("#text-title-27").style.color = "black";

	//get the number of new tickets and update the color appropriately 
	var newtixel = document.querySelector("#dashboardContainer > div > div > div:nth-child(8) > div.grid-stack-item-content");
	var newtix = parseInt(document.querySelector("#text-value-27").innerHTML);
	
	switch(true) {
		case (newtix <= 4):
		newtixel.style.backgroundColor = cwroutinecolor;
		break;
		case (newtix >= 5 && newtix < 7):
		newtixel.style.backgroundColor = cwmediumcolor;
		break;
		case (newtix >= 8 && newtix <= 10):
		newtixel.style.backgroundColor = cwhighcolor;
		break;
		case (newtix >= 11):
		newtixel.style.backgroundColor = cwcriticalcolor;
		break;
	}



	//##############################
	//FIX MSP IDLE
	//##############################


	var mspidlebox = document.querySelector("#dashboardContainer > div > div > div:nth-child(12) > div.grid-stack-item-content");
	var mspidleval = parseInt(document.querySelector("#text-value-31").innerHTML);
	document.querySelector("#text-title-31").style.color = "black";
	switch(true) {
		case (mspidleval <= 1):
		mspidlebox.style.backgroundColor = cwroutinecolor;
		break;
		case (mspidleval == 2):
		mspidlebox.style.backgroundColor = cwmediumcolor;
		break;
		case (mspidleval == 3):
		mspidlebox.style.backgroundColor = cwhighcolor;
		break;
		case (mspidleval >= 4):
		mspidlebox.style.backgroundColor = cwcriticalcolor;
		break;
	}



	//##############################
	//FIX 95% SLA NEW
	//##############################


	var new95slabox = document.querySelector("#dashboardContainer > div > div > div:nth-child(4) > div.grid-stack-item-content");
	var new95slaval = parseInt(document.querySelector("#text-value-23").innerHTML);
	document.querySelector("#text-title-23").style.color = "black";
	document.querySelector("#text-subtitle-23").style.color = "black";
	if (new95slaval > 0) {
		new95slabox.style.backgroundColor = cwcriticalcolor;
	}
	else {
		new95slabox.style.backgroundColor = cwroutinecolor;
	}



	//##############################
	//FIX 95% SLA ASSIGNED
	//##############################


	var assigned95slabox = document.querySelector("#dashboardContainer > div > div > div:nth-child(5) > div.grid-stack-item-content");
	var assigned95slaval = parseInt(document.querySelector("#text-value-24").innerHTML);
	document.querySelector("#text-title-24").style.color = "black";
	document.querySelector("#text-subtitle-24").style.color = "black";
	if (assigned95slaval > 0) {
		assigned95slabox.style.backgroundColor = cwcriticalcolor;
	}
	else {
		assigned95slabox.style.backgroundColor = cwroutinecolor;
	}



	//##############################
	// CRITICAL TICKETS
	//##############################


	var criticaltixbox = document.querySelector("#dashboardContainer > div > div > div:nth-child(7) > div.grid-stack-item-content");
	var criticaltixval = parseInt(document.querySelector("#text-value-26").innerHTML);
	console.log(criticaltixval);
	document.querySelector("#text-title-26").style.color = "black";
	switch (true) {
		case (criticaltixval == 0):
			criticaltixbox.style.backgroundColor = cwroutinecolor;
			break;
		case (criticaltixval == 1):
			criticaltixbox.style.backgroundColor = cwmediumcolor;
			break;
		case (criticaltixval == 2):
			criticaltixbox.style.backgroundColor = cwhighcolor;
			break;
		case (criticaltixval >= 3):
			console.log("three");
			criticaltixbox.style.backgroundColor = cwcriticalcolor;
			break;
	}



	//##############################
	// OPEN MSP TICKETS
	//##############################
	// math about the values here:
	// with 7 techs and ~100 tickets on the board it's "Average" 
	// 70% of tix are usually msp, so less than 70 should be good.
	// this # will need to be constantly tweaked.
	var openmsptixbox = document.querySelector("#dashboardContainer > div > div > div:nth-child(3) > div.grid-stack-item-content");
	var openmsptixval = parseInt(document.querySelector("#text-value-22").innerHTML);
	document.querySelector("#text-title-22").style.color = "black";
	switch (true) {
		case (openmsptixval < 75):
			openmsptixbox.style.backgroundColor = cwroutinecolor;
			break;
		case (openmsptixval >= 75 && openmsptixval <= 85):
			openmsptixbox.style.backgroundColor = cwmediumcolor;
			break;
		case (openmsptixval > 85 && openmsptixval <= 99):
			openmsptixbox.style.backgroundColor = cwhighcolor;
			break;
		case (openmsptixval > 99):
			openmsptixbox.style.backgroundColor = cwcriticalcolor;
			break;
	}




	//##############################
	// IDLE CRITICAL/HIGH
	//##############################


	var crithighidlebox = document.querySelector("#dashboardContainer > div > div > div:nth-child(6) > div.grid-stack-item-content");
	var crithighidleval = parseInt(document.querySelector("#text-value-25").innerHTML);
	document.querySelector("#text-title-25").style.color = "black";
	document.querySelector("#text-subtitle-25").style.color = "black";
	switch (true) {
		case (crithighidleval == 0):
		crithighidlebox.style.backgroundColor = cwroutinecolor;
		break;
		case (crithighidleval == 1):
		crithighidlebox.style.backgroundColor = cwmediumcolor;
		break;
		case (crithighidleval == 2):
		crithighidlebox.style.backgroundColor = cwmediumcolor;
		break;
		case (crithighidleval >= 3):
		crithighidlebox.style.backgroundColor = cwcriticalcolor;
		break;
	}



	//##############################
	// CLIENT RESPONDED
	//##############################


	var clientrespondedbox = document.querySelector("#dashboardContainer > div > div > div:nth-child(2) > div.grid-stack-item-content");
	var clientrespondedval = parseInt(document.querySelector("#text-value-19").innerHTML);
	document.querySelector("#text-title-19").style.color = "black";
	document.querySelector("#text-subtitle-19").style.color = "black";
	switch (true) {
		case (clientrespondedval <= 2):
		clientrespondedbox.style.backgroundColor = cwroutinecolor;
		break;
		case (clientrespondedval >= 3 && clientrespondedval <= 4):
		clientrespondedbox.style.backgroundColor = cwmediumcolor;
		break;
		case (clientrespondedval >= 5 && clientrespondedval <= 6):
		clientrespondedbox.style.backgroundColor = cwmediumcolor;
		break;
		case (clientrespondedval >= 7):
		clientrespondedbox.style.backgroundColor = cwcriticalcolor;
		break;
	}



	//##############################
	// MISSED EVENT
	//##############################


	var missedeventbox = document.querySelector("#dashboardContainer > div > div > div:nth-child(1) > div.grid-stack-item-content");
	var missedeventval = parseInt(document.querySelector("#text-value-18").innerHTML);
	document.querySelector("#text-title-18").style.color = "black";
	document.querySelector("#text-subtitle-18").style.color = "black";
	switch (true) {
		case (missedeventval <= 3):
		missedeventbox.style.backgroundColor = cwroutinecolor;
		break;
		case (missedeventval >= 4 && missedeventval <= 6):
		missedeventbox.style.backgroundColor = cwmediumcolor;
		break;
		case (missedeventval >= 7 && missedeventval <= 9):
		missedeventbox.style.backgroundColor = cwmediumcolor;
		break;
		case (missedeventval >= 10):
		missedeventbox.style.backgroundColor = cwcriticalcolor;
		break;
	}



	//##############################
	// SLA ADHERENCE 
	//##############################


	var slaadherencebox = document.querySelector("#dashboardContainer > div > div > div:nth-child(16) > div.grid-stack-item-content");
	var slaadherenceval = parseInt(document.querySelector("#text-value-35").innerHTML);
	document.querySelector("#text-title-35").style.color = "black";
	document.querySelector("#text-subtitle-35").style.color = "black";
	switch (true) {
		case (slaadherenceval == 100):
		slaadherencebox.style.backgroundColor = cwroutinecolor;
		break;
		case (slaadherenceval == 99):
		slaadherencebox.style.backgroundColor = cwmediumcolor;
		break;
		case (slaadherenceval == 98):
		slaadherencebox.style.backgroundColor = cwmediumcolor;
		break;
		case (slaadherenceval <= 97):
		slaadherencebox.style.backgroundColor = cwcriticalcolor;
		break;
	}



	//##############################
	// AFTER HOUR ESCALATIONS 
	//##############################


	var afterhoursbox = document.querySelector("#dashboardContainer > div > div > div:nth-child(15) > div.grid-stack-item-content");
	var afterhoursval = parseInt(document.querySelector("#text-value-34").innerHTML);
	document.querySelector("#text-title-34").style.color = "black";
	document.querySelector("#text-subtitle-34").style.color = "black";
	switch (true) {
		case (afterhoursval == 0):
		afterhoursbox.style.backgroundColor = cwroutinecolor;
		break;
		case (afterhoursval == 1):
		afterhoursbox.style.backgroundColor = cwmediumcolor;
		break;
		case (afterhoursval == 2):
		afterhoursbox.style.backgroundColor = cwmediumcolor;
		break;
		case (afterhoursval >= 3):
		afterhoursbox.style.backgroundColor = cwcriticalcolor;
		break;
		case (afterhoursval == 56)
		afterhoursbox.style.backgroundColor = cwroutinecolor;
		break;
	}



	//##############################
	// MTTR
	//##############################


	var mttrbox = document.querySelector("#dashboardContainer > div > div > div:nth-child(9) > div.grid-stack-item-content");
	var mttrval = parseFloat(document.querySelector("#text-value-28").innerHTML);
	document.querySelector("#text-title-28").style.color = "black";
	document.querySelector("#text-subtitle-28").style.color = "black";
	switch (true) {
		case (mttrval < 3.7):
		mttrbox.style.backgroundColor = cwroutinecolor;
		break;
		case (mttrval >= 3.7 && mttrval < 3.8):
		mttrbox.style.backgroundColor = cwmediumcolor;
		break;
		case (mttrval >= 3.8 && mttrval < 3.9):
		mttrbox.style.backgroundColor = cwmediumcolor;
		break;
		case (mttrval >= 3.9):
		mttrbox.style.backgroundColor = cwcriticalcolor;
		break;
	}



	//##############################
	// Fix ENTERED/RESOLVED COLORS
	//##############################
	document.querySelector("#dashboardContainer > div > div > div:nth-child(10) > div.grid-stack-item-content").style.backgroundColor = "rgb(63,63,63)";
	document.querySelector("#text-value-29").style.color = "white";
	document.querySelector("#text-title-29").style.color = "white";
	document.querySelector("#dashboardContainer > div > div > div:nth-child(11) > div.grid-stack-item-content").style.backgroundColor = "rgb(63,63,63)";
	document.querySelector("#text-value-30").style.color = "white";
	document.querySelector("#text-title-30").style.color = "white";



}, 5000);





//BATMAN LOGO
// var img = new Image();
// var div = document.getElementById('dashboardContainer');

// img.src = 'http://data.whicdn.com/images/44881368/original.png';
// img.style.height = "10em";
// img.style.width = "20em";
// img.style.position = "absolute";
// img.style.zindex = 99;
// img.style.top = "175px";
// img.style.left = "50px";
// img.style.transform = 'rotate(-45deg)';

// img.onload = function() {
//   div.appendChild(img);
// };



//var ab = document.querySelector("#text-title-27");
//ab.style.textShadow = "0px 0px 8px #000000"