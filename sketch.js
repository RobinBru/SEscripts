let slideNumber = 0;
let sliderCount;
let slides = document.getElementsByClassName('slide');
let slideTime = 6000;

$(document).ready(function() {
  sliderCount = $('.slide').length;
});

window.addEventListener("load", function(){
  var videos = document.getElementsByTagName('video');
	var load_screen = document.getElementById("load_screen");
	document.body.removeChild(loadScreen);
});


$(document).ready(function() {
  window.setInterval(slide, slideTime);
  window.setInterval(playVid, slideTime);


  function slide() {
    slideNumber++;
    let left = -(slideNumber % sliderCount)*100;
    $("#container").css('left', left + 'vw');
  }

  var videos = document.getElementsByTagName('video');
  function playVid() {
    for (let i = 0; i < videos.length; i++) {
      if($.contains(slides[slideNumber % sliderCount], videos[i]) && videos[i].currentTime == 0){
        videos[i].play();
      }else if(!$.contains(slides[slideNumber % sliderCount], videos[i])) {
        videos[i].pause();
        videos[i].currentTime = 0;
      }
    }
  }

});
