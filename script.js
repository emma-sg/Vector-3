/*

This is a remake of the Vector 3 game in the form of a web app, originally created by Greg Costikyan.
Like the original, This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License, the terms of which maybe found here: https://creativecommons.org/licenses/by-nc/4.0/.

*/


var accelLevel = [0, 0]; // Tech levels
var laserLevel = [0, 0];

var ShipPoints = [48, 48]; // Ship points

var vpoints = [0, '<marquee scrollamount="820">AAAAAARRRRRRGGGGGG!</marquee>']; // Victory points

var sixpodShip = 16;
var ninepodShip = 32;
var twelvepodShip = 48;


// Costs (not used at the moment...)
var cargo = 1;
var cabin = 2;
var laser = 4;
var launch = 5;
var Screen = 8;
var tp = 6;
var gt = 2;
var ut = 1;
var m = 0.5;

var sixCost = 18; // Minimum cost of a 6-pod ship
var nineCost = 36; // Minimum cost of a 9-pod ship

var buttonsClicked = 0; // Count the number of buttons in the first screen when this == 2

var p0ships = new Array() // Player 0's multidimensional array of ships.
var p0shipsval = 0; // The first dimension contains the separate ships (ie. [0] is the first ship, [1] is the second, etc.).
// The second dimension contains the ship-specific variables: destroyed, position, acceleration, pods.
// [ship][0] contains the pods. 1=Cargo, 2=Cabin, 4=Laser.


$(document).ready(function() {
    $('#start').css('display', 'none').click(function() { // Start off with the start button hidden. Start the 'click' event listener.
        $(this).css('display', 'none'); // Hide button when clicked
        $('#end').css('display', 'inherit'); // Show the End Game button
        $('#results').remove(); // Remove the Game Results (if they exist)
    });

    $('*').removeAttr('disabled').trigger('change'); // Un-disable anything that shouldn't start disabled
    // These check to see when one of the buttons about starting tech levels is clicked. When it is, both it and the other button for that player are disabled.
    $('button[name="1"]').click(function() {
        accelLevel[0] = 2; // Set Acceleration tech level
        laserLevel[0] = 2; // Set Laser tech level
        $('button[name="1"]').addClass('disabled');
        $('button[name="2"]').addClass('secondary disabled');
        buttonsClicked++; // Increment the counter
        removeFirstThing(); // A function that closes the dialog and opens the next one.
    });
    $('button[name="2"]').click(function() {
        accelLevel[0] = 1; // Set Acceleration tech level
        laserLevel[0] = 3; // Set Laser tech level
        $('button[name="1"]').addClass('secondary disabled');
        $('button[name="2"]').addClass('disabled');
        buttonsClicked++;
        removeFirstThing();
    });
    $('button[name="3"]').click(function() {
        accelLevel[1] = 2; // Set Acceleration tech level
        laserLevel[1] = 2; // Set Laser tech level
        $('button[name="3"]').addClass('disabled');
        $('button[name="4"]').addClass('secondary disabled');
        buttonsClicked++;
        removeFirstThing();
    });
    $('button[name="4"]').click(function() {
        accelLevel[1] = 1; // Set Acceleration tech level
        laserLevel[1] = 3; // Set Laser tech level
        $('button[name="3"]').addClass('secondary disabled');
        $('button[name="4"]').addClass('disabled');
        buttonsClicked++;
        removeFirstThing();
    });

    // When one of the select boxes is changed, calculate and update the cost of the ship.
    $('.six-pod select').change(function(event) {
        var sixvalues = $('.six-pod select option:selected');
        sixCost = 16 + parseFloat($('.six-pod select option:selected:first').attr('data-cost'));
        sixCost = sixCost + parseFloat($('.six-pod select option:selected:last').attr('data-cost'));
        $('.six-pod-cost').text(sixCost + ' Ship Points');
    });
    $('.nine-pod select').change(function(event) {
        var ninevalues = $('.nine-pod select option:selected');
        nineCost = 32 + parseFloat($('.nine-pod select option:selected').eq(0).attr('data-cost'));
        nineCost = nineCost + parseFloat($('.nine-pod select option:selected').eq(1).attr('data-cost'));
        nineCost = nineCost + parseFloat($('.nine-pod select option:selected').eq(2).attr('data-cost'));
        nineCost = nineCost + parseFloat($('.nine-pod select option:selected').eq(3).attr('data-cost'));
        $('.nine-pod-cost').text(nineCost + ' Ship Points');
    });

    // ALWAYS check to see if the player can afford the ship(s). If not, disable the Purchase button.
    $('body').keydown(function() {
        if (sixCost > ShipPoints[0]) {
            $('#six-pod-select').attr('disabled', 'disabled');
        } else {
            $('#six-pod-select').removeAttr('disabled');
        }
        if (nineCost > ShipPoints[0]) {
            $('#nine-pod-select').attr('disabled', 'disabled');
        } else {
            $('#nine-pod-select').removeAttr('disabled');
        }
        if (ShipPoints[0] < 48) {
            $('#done0').removeClass('disabled');
        }
    });
    $('body').click(function() {
        if (sixCost > ShipPoints[0]) {
            $('#six-pod-select').attr('disabled', 'disabled');
        } else {
            $('#six-pod-select').removeAttr('disabled');
        }
        if (nineCost > ShipPoints[0]) {
            $('#nine-pod-select').attr('disabled', 'disabled');
        } else {
            $('#nine-pod-select').removeAttr('disabled');
        }
        if (ShipPoints[0] < 48) {
            $('#done0').removeClass('disabled');
        }
    });

    // First, subtract the cost of the pending ship from the player's ship points and update number shown. Then, create new ship in p0ships array to correspond to ship purchased.
    $('#six-pod-select').click(function(event) {
        ShipPoints[0] -= sixCost;
        $('#sp1').text('Ship Points remaining: ' + ShipPoints[0]);
        p0ships[p0shipsval] = new Array();
        p0ships[p0shipsval][0] = [parseFloat($('.six-pod select option:selected:first').attr('data-cost')), parseFloat($('.six-pod select option:selected:last').attr('data-cost')), 2, 2, 2, 2];
        p0shipsval++;
    });
    $('#nine-pod-select').click(function(event) {
        ShipPoints[0] -= nineCost;
        $('#sp1').text('Ship Points remaining: ' + ShipPoints[0]);
        p0ships[p0shipsval] = new Array();
        p0ships[p0shipsval][0] = [parseFloat($('.nine-pod select option:selected').eq(0).attr('data-cost')), parseFloat($('.nine-pod select option:selected').eq(1).attr('data-cost')), parseFloat($('.nine-pod select option:selected').eq(2).attr('data-cost')), parseFloat($('.nine-pod select option:selected').eq(3).attr('data-cost')), 2, 2, 2, 2, 2];
        p0shipsval++;
    });


    // When the End Game button is pressed, show game results, hide End Game button, and show New Game button.
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

var removeFirstThing = function() {
    if (buttonsClicked == 2) {                          // Check if two buttons have been pressed
        setTimeout(function() {                         // Wait for a bit
            $('.inittech').css('display', 'none');      // Hide them...
            $('.initships1').css('display', 'inherit'); // And show the next dialog
            $('#sp1').text('Ship Points remaining: ' + ShipPoints[0]); // Show the number of Ship Points.
        }, 500);

    }
};
