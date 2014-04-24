var accelLevel = [0, 0];
var laserLevel = [0, 0];
var ShipPoints = [48, 48];

var vpoints = [0, 'AAAAAARRRRRRGGGGGG!'];

var sixpodShip = 16;

var ninepodShip = 32;
var twelvepodShip = 48;
var cargo = 1;
var cabin = 2;
var laser = 4;
var launch = 5;
var Screen = 8;
var tp = 6;
var gt = 2;
var ut = 1;
var m = 0.5;

$(document).ready(function() {
	$('#start').click(function() {
		$(this).css('display', 'none');
		$('#end').css('display', 'inherit');
		$('#results').remove();
	});





	$('#submit').click(function(event) {
		accelLevel[0]=$('input:button')
	});








    $('#end').click(function() {
    	$('#start').css('display', 'inherit');
        $('body').append('<div id="results"><p>Player 1 VP: <span class="vp">' + vpoints[0] + '<p>Player 2 VP: <span class="vp">' + vpoints[1] + '</div>');
        $(this).css('display', 'none');
        if (vpoints[0] < vpoints[1]) {
        	$('#results').append('<p>You win!</p>');
        } else if (vpoints[0] > vpoints[1]) {
        	$('#results').append('<p><i>You</i> win!</p>');
        } else {
        	$('#results').append('<p>Nobody wins!</p>');
        }
    });
});
