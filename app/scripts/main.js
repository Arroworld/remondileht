//bucketid


const buckets = document.getElementsByClassName('bucket');
for (let i = 0; i < buckets.length;i++) {
    const bucket = buckets[i];
    bucket.addEventListener("mouseover", onMouseOver);
    bucket.addEventListener("mouseout", onMouseOut);
}

function onMouseOver(evt) { // onMouseOver'i sees tahame võtta elemendi seest värvi ja panna selle taustaks
    const element = evt.currentTarget; // eventi küljest saame kätte elemendi, mille peal hover juhtus
    const color = element.getAttribute('data-color'); // elemendi küljest saab pärida atribuute
    setBackgroundColor(color); // edasi tahame muuta taustavärvi, saadud värvi vastu
}

function onMouseOut(evt) { // onMouseOut'i sees tahame lihtsalt panna elemendile värviks transparent
    const element = evt.currentTarget;
    setBackgroundColor('#3e4f57');
}

function setBackgroundColor(color) {
    const element = document.getElementById("varviala");
    element.style.backgroundColor = color;
}
	var div = document.getElementById("oranzikas");
	div.onmouseover = function(){
		var h3s = document.getElementById("varviala");
		h3s.style.backgroundColor = "#eb690a"
		var h2s = document.getElementById("kast");
		h2s.style.backgroundColor = "#3e4f57"
	};
	var div = document.getElementById("oranzikas");
	div.onmouseout = function() {
	  document.getElementById("kast").backgroundColor = '#eb690a';
	  var h2s = document.getElementById("kast");
	  h2s.style.backgroundColor = '#eb690a';
	};

//ikoonid ja href
var scrollpos3 = window.scrollY;
var leftside2 = document.getElementById("left-side2");

function add_class_on_scroll3() {
    leftside2.classList.add("scrolled3");
}

function remove_class_on_scroll3() {
    leftside2.classList.remove("scrolled3");
}

window.addEventListener('scroll', function(){ 
scrollpos3 = window.scrollY;

    if(scrollpos3 > 650){
        console.log("lisa");
    add_class_on_scroll3();
}
    else {
        console.log("eemalda");
    remove_class_on_scroll3();
}
    
    });

//breakpointid
// var scrollpos4 = window.scrollY;
// var breakpointid = document.getElementById("animatsioon");

// function add_class_on_scroll4() {
//     breakpointid.classList.add("breakpoint2");
// }

// function remove_class_on_scroll4() {
//     breakpointid.classList.remove("breakpoint2");
// }

// window.addEventListener('scroll', function(){ 
// scrollpos4 = window.scrollY;

//     if(scrollpos4 > 1250){
//         console.log("lisaa");
//     add_class_on_scroll4();
// }
//     else {
//        return;
// }
    
//     });

//navbar
var scrollpos = window.scrollY;
var header = document.getElementById("menuu");

function add_class_on_scroll() {
    header.classList.add("scrolled");
}

function remove_class_on_scroll() {
    header.classList.remove("scrolled");
}

window.addEventListener('scroll', function(){ 
scrollpos = window.scrollY;

	if(scrollpos > 650){
	add_class_on_scroll();
}
	else {
	remove_class_on_scroll();
}
	console.log(scrollpos);
	});

// window.addEventListener('scroll', function(){ 
// scrollpos2 = window.scrollY;

// 	if(scrollpos2 > 540){
// 	add_class_on_scroll2();
// }
// 	else {
// 	remove_class_on_scroll2();
// }
// 	console.log(scrollpos2);
// 	});

// var scrollpos3 = window.scrollY;
// var header = document.getElementById("left-side2");

// function add_class_on_scroll() {
//     header.classList.add("scrolled2");
// }

// function remove_class_on_scroll() {
//     header.classList.remove("scrolled2");
// }

// window.addEventListener('scroll', function(){ 
// scrollpos3 = window.scrollY;

//     if(scrollpos3 > 650){
//     add_class_on_scroll();
// }
//     else {
//     remove_class_on_scroll();
// }
//     console.log(scrollpos);
//     });

//fline
(function () {
    'use strict';

 	var $containers = $('.fline');

    if ($containers.length === 0) {
        return;
    }

    var sliceHeight = 24;

    var windowHeight = $(window).height();
    var offsetFromBottom = 80;

    var i = 0;

    var slices = [];
    var steps = [];
    var bubbles = [];

    var lastScroll = 0;
    var bubbleCount = 0;

    var scrollingDown = true;

    $containers.each(function () {
        var height = $(this).height();

        var sliceCount = Math.ceil(height / sliceHeight);

        var includesBubbles = false;

        if ($(this).find('> .breakpoint').length === 1) {
            includesBubbles = true;
        }

        for (var start = 0; start < sliceCount; start++) {

            $(this).append('<div class="fslice fslice-' + i + '"></div>');
            var $elem = $('.fslice-' + i + '');
            $elem.fromTop = $elem.offset().top;
            slices.push($elem);
            i++;
        }

        if (includesBubbles) {
            var $bubble = $(this).find('> .breakpoint');
            slices[i - 1].hasBubble = true;
            slices[i - 1].bubble = $bubble;
            slices[i - 1].bubbleCount = bubbleCount;

            $bubble.fromTop = $bubble.offset().top;
            bubbles.push($bubble);
            bubbleCount++;
        }
    });

    var $steps = $('.step');

    $steps.each(function () {
        steps.push(this);
    });

    $('#button-scroll').on('click', function () {
        $('html, body').animate({
            scrollTop: $('.easy-heading').offset().top - $('.easy-heading').height() - 50
        }, 2000);
    });

    $(window).on('scroll', function () {

        var scrollTop = $(window).scrollTop();
        var enableFrom = windowHeight - offsetFromBottom + scrollTop;

        if (scrollTop > lastScroll) {
            scrollingDown = true;
        } else {
            scrollingDown = false;
        }

        if (scrollTop >= 80) {
            $('#button-scroll').addClass('b-disabled');
        } else if (scrollTop < 80) {
            $('#button-scroll').removeClass('b-disabled');
        }
    });

    setTimeout(function () {
        var animateInterval = setInterval(function () {
            var enableFrom = windowHeight - offsetFromBottom + $(window).scrollTop();


            for (var j = 0; j < slices.length; j++) {

                if ($(slices[j]).hasClass('enabled')) {
                    continue;
                }

                if (enableFrom > slices[j].fromTop) {
                    $(slices[j]).addClass('enabled');

                    if (typeof slices[j].hasBubble !== 'undefined' && slices[j].hasBubble) {
                        $(slices[j].bubble[0]).addClass('b-enabled');
                        $(steps[slices[j].bubbleCount]).addClass('s-enabled');
                    }
                }

                break;
            }

            for (var k = slices.length - 1; k > 1; k--) {

                if (!$(slices[k]).hasClass('enabled')) {
                    continue;
                }

                if (enableFrom < slices[k].fromTop) {
                    $(slices[k]).removeClass('enabled');

                    if (typeof slices[j].hasBubble !== 'undefined' && slices[j].hasBubble) {
                        $(slices[j].bubble[0]).removeClass('b-enabled');
                        $(steps[slices[j].bubbleCount]).removeClass('s-enabled');
                    }
                }

                break;
            }

            lastScroll = $(window).scrollTop();
        }, 20);
    }, 500);

    setTimeout(function () {
        $(window).trigger('scroll');
    }, 1000);
})();