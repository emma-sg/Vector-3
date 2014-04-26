var accelLevel = [0, 0];
var laserLevel = [0, 0];
var ShipPoints = [48, 48];

var vpoints = [0, '<marquee scrollamount="820">AAAAAARRRRRRGGGGGG!</marquee>'];

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

var costlinesss = 16;

var buttonsClicked = 0;




$(document).ready(function() {
    $('#start').css('display', 'none').click(function() {
        $(this).css('display', 'none');
        $('#end').css('display', 'inherit');
        $('#results').remove();
    });




    $('button').removeAttr('disabled').trigger('change');
    $('button[name="1"]').click(function() {
        accelLevel[0] = 2;
        laserLevel[0] = 2;
        $('button[name="1"]').attr('disabled', 'disabled');
        $('button[name="2"]').attr('disabled', 'disabled');
        buttonsClicked++;
        removeFirstThing();
    });
    $('button[name="2"]').click(function() {
        accelLevel[0] = 1;
        laserLevel[0] = 3;
        $('button[name="1"]').attr('disabled', 'disabled');
        $('button[name="2"]').attr('disabled', 'disabled');
        buttonsClicked++;
        removeFirstThing();
    });
    $('button[name="3"]').click(function() {
        accelLevel[1] = 2;
        laserLevel[1] = 2;
        $('button[name="3"]').attr('disabled', 'disabled');
        $('button[name="4"]').attr('disabled', 'disabled');
        buttonsClicked++;
        removeFirstThing();
    });
    $('button[name="4"]').click(function() {
        accelLevel[1] = 1;
        laserLevel[1] = 3;
        $('button[name="3"]').attr('disabled', 'disabled');
        $('button[name="4"]').attr('disabled', 'disabled');
        buttonsClicked++;
        removeFirstThing();
    });


    $('.six-pod select').change(function(event) {
        var values = $('.six-pod select option:selected');
        costlinesss = 16 + parseFloat($('.six-pod select option:selected:first').attr('data-cost'));
        costlinesss = costlinesss + parseFloat($('.six-pod select option:selected:last').attr('data-cost'));


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

var removeFirstThing = function() {
    if (buttonsClicked == 2) {
        $('.inittech').css('display', 'none');
        $('.initships1').css('display', 'inherit');
        $('#sp1').append('Ship Points: ' + ShipPoints[0]);

    }
};
