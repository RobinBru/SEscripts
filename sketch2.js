let z = 0;
let rows, snap;
let card;
let memoryRaw = [];
let memoryCompiled = [];
let slideNumb = 0;
let defRaw, defComp;
let slides = [];
let index;

$(document).ready(function(){
  defineDefault();
  save();
  function addCard() {
    $('.body').append("<div class='card'><button class='close'>x</button></div>");
    $('.card').last().css('z-index', z);
    z++;

    $('.close').each(function(){
      $(this).on('click', close);
    });

    $(".card").draggable({
      containment: ".body",
      stack: ".card",
      grid: [ 10, 10 ]
    });
  }

  $('#newTable').on('click', function (){
    addCard();
    $('.card').last().append("<div class='tableHeader'><input type='text' placeholder='Title'></div>");
    $('.card').last().append("<table></table>");
    $('.card').last().find('table').append("<tr><th>rank</th><th>ploeg naam</th><th>punten</th></tr>");
    $('.card').last().append("<button class='newTeam'>Team toevoegen</button>");
    $('.card').last().append("<button class='sortTable'>sorteren</button>");
    $('.card').last().find('.newTeam').on('click', newTeam);
    $('.card').last().find('.sortTable').on('click', sortTable);
  });


  $('#newImage').on('click', function (){
    addCard();
    $('.card').last().append("<input type='text' placeholder='source'>");
    $('.card').last().append("<input type='submit' value='ok' class='image'>");
    $('.card').last().find('input[type=submit]').on('click', showImage);
  });


  $('#newText').on('click', function (){
    addCard();
    $('.card').last().append("<div class='textTitle'><input type='text' placeholder='Title'></div>");
    $('.card').last().append("<textarea rows='4' cols='50' spellcheck='false'></textarea>");
  });

  $('#newVideo').on('click', function (){
    addCard();
    $('.card').last().append("<input type='text' placeholder='source'>");
    $('.card').last().append("<input type='submit' value='ok' class='showVideo'>");
    $('.card').last().find('input[type=submit]').on('click', showVideo);
  });

  $('select').on('change', handleThemeUpdate);


 $('#background').on('click',function () {
  if ($('#background').is(':checked')) {
    $('#backUrl').css('display', 'block');
  } else {
    $('#backUrl').css('display', 'none');
    $('.body').removeAttr("style");
    $('.body').css('background-color', '#e9e9e9');
  }
  });

  $('#backUrl input[type=submit]').on('click',function () {
    let source = $('#backUrl input[type=text]').val();
    $('.body').css('background-image', "url('" + source + "')");
   });

// scroll
$('#container').contents().on('mousewheel', function(event) {
  if (event.originalEvent.wheelDelta >= 0) {
    if (slideNumb > 0){
      slideNumb--;
    }
  } else {
    if (slideNumb < memoryCompiled.length-1){
      slideNumb++;
    }
  }
  scrollToSlideNumber();
});
$('.slideList').on('mousewheel', function(event) {
  if (event.originalEvent.wheelDelta >= 0) {
    if (slideNumb > 0){
      slideNumb--;
    }
  } else {
    if (slideNumb < memoryCompiled.length-1){
      slideNumb++;
    }
  }
  scrollToSlideNumber();
});



//Save

   $('#saveSlide').on('click', function() {
     save();
   });

  $('#saveChanges').on('click', function(){
    save();
  });

  $('#saver').on('click', function() {
    saveFile();
  });

//new slide
  $('#newSlide').on('click', function() {
    $('slideEditor').html('');
    $('slideEditor').append(defRaw);
    memoryCompiled.push(defComp);
    memoryRaw.push(defRaw);
    setSelect();
    $('#slideEditor .slide').html("");
    $('#slideEditor .slide').append(memoryRaw[slideNumb]);
    save();
  });

// go to editor

  $('#edit').on('click',function(){
    slideEdit();
  });

// got to order
  $('#order').on('click',function(){
    save();
    $('#navigation').prop('checked', true);
    $('#edit').css('display', 'block');
    $('#edit').css('left', 'calc(100% - 120px)');
    $('#edit').css('top', '20px');
    setTimeout(function() {
      let left = (slideNumb % memoryCompiled.length) * 100;
      $('#container').contents().find('body #container').css("left", -left  + "vw");
      $('#sequenceEditor').css('display', 'block');
      setTimeout(function() {
        $('#container').css('transform', 'scale(0.6)');
        $('#container').css('top', '20%');
        $('#container').css('left', '20%');
        $('#edit').css('left', 'calc(80% - 120px)');
        $('#edit').css('top', 'calc(20% + 20px)');
        $('#navigation2').prop('checked', false);
        $('#navigation3').prop('checked', false);
        $('#navigation').prop('checked', false);
      }, 200);
    }, 400);
  });

//select
});



function save() {
  $('.slide').clone().appendTo('#save');
  $('#save input').each(function(){
    $(this).replaceWith($(this).val());
  });
  $('#save textarea').each(function(){
    let width = $(this).width() + 60;
    let height = $(this).height() + 90;
    $(this).parents('.card').css('width', width + 'px');
    $(this).parents('.card').css('height', height + 'px');
    $(this).replaceWith($(this).val());
    $(this).parent();

  });
  $('#save textarea br').remove();
  $('#save button').remove();
  switch ($('select').val()) {
    case '1':
      $('#save .slide').attr('id', 'slideOne');
      break;
    case '2':
      $('#save .slide').attr('id', 'slideTwo');
      break;
    case '3':
      $('#save .slide').attr('id', 'slideThree');
      break;
    case '4':
      $('#save .slide').attr('id', 'slideFour');
      break;
  }
  $('#save .card').attr('class', 'card');

   var $temp = $("<input>");
   $("body").append($temp);
   $temp.val($('#save').html()).select();
   document.execCommand("copy");
   $temp.remove();
   memoryCompiled[slideNumb] = $('#save').html().replace(/(\r\n\t|\n|\r\t)/gm,"");
   memoryCompiled[slideNumb] = findAndReplace(memoryCompiled[slideNumb], "  ", "");
   $('#save').html(" ");

   $('input').each(function() {
     let value = $(this).val();
     $(this).attr('value', value);
   });
   $('textarea').each(function() {
     let value = $(this).val();
     $(this).text(value);
   });

   memoryRaw[slideNumb] = $('#slideEditor .slide').html();
   $('#container').contents().find('head').html("");
   $('#container').contents().find('head').html("<link rel='stylesheet' href='style.css' type='text/css'>");
   $('#container').contents().find('body').html("<div id='container'></div>");
   for (let i = 0; i < memoryCompiled.length; i++) {
     $('#container').contents().find('body #container').append(memoryCompiled[i]);
   }
   slides = [];
   $('#container').contents().find('.slide').each(function(){
     slides.push([$(this).find('.title').text(),$(this).attr('id')]);
   });
   $('.slideList').html("");
   for(let i = 0; i < slides.length; i++){
     $('.slideList').append('<li class="' + slides[i][1] + '">' + slides[i][0] + '</li>');
   }
   $(".slideList").sortable({
     delay: 200,
   });
   $(".slideList").disableSelection();
   $(".slideList li").each(function(){
     $(this).mousedown(function(e){
       slideNumb = $(this).index();
       scrollToSlideNumber();
       e.preventDefault();
       $('.select').removeClass('select');
       $(this).addClass('select');
       index = $(this).index();
     });
     $(this).click(function(e){
       slideNumb = $(this).index();
       scrollToSlideNumber();
       e.preventDefault();
       $('.select').removeClass('select');
       $(this).addClass('select');
     });
     $(this).mouseup(function () {
      setTimeout(function() {
        let index2 = $('.slideList li.select').index();
        if (index != index2){
          move(memoryRaw, index, index2);
          move(memoryCompiled, index, index2);
          move(slides, index, index2);
          slideNumb = index2;
          setSelect();
          $('#slideEditor .slide').html("");
          $('#slideEditor .slide').append(memoryRaw[slideNumb]);
          save();
        }
      }, 10);
     });
   });
   $('.slideList li')[slideNumb].click();
}


function findAndReplace(string, target, replacement) {
 var i = 0, length = string.length;
 for (i; i < length; i++) {
   string = string.replace(target, replacement);
 }
 return string;
}

function defineDefault() {
  defRaw = $('#slideEditor .slide').html();
  $('.slide').clone().appendTo('#save');
  $('#save input').each(function(){
    $(this).replaceWith($(this).val());
  });
  $('#save textarea').each(function(){
    let width = $(this).width() + 60;
    let height = $(this).height() + 90;
    $(this).parents('.card').css('width', width + 'px');
    $(this).parents('.card').css('height', height + 'px');
    $(this).replaceWith($(this).val());
    $(this).parent();

  });
  $('#save textarea br').remove();
  $('#save button').remove();
  switch ($('select').val()) {
    case '1':
      $('#save .slide').attr('id', 'slideOne');
      break;
    case '2':
      $('#save .slide').attr('id', 'slideTwo');
      break;
    case '3':
      $('#save .slide').attr('id', 'slideThree');
      break;
    case '4':
      $('#save .slide').attr('id', 'slideFour');
      break;
  }
  $('#save .card').attr('class', 'card');
   defComp = $('#save').html().replace(/(\r\n\t|\n|\r\t)/gm,"");
   defComp = findAndReplace(defComp, "  ", "");
   $('#save').html(" ");
}

function removeSlide(number) {
  memoryRaw.splice(number, 1);
  memoryCompiled.splice(number, 1);
  $('.slideList li')[number].remove();
  save();
}

function slideEdit() {
  $('#slideEditor .slide').html("");
  $('#slideEditor .slide').append(memoryRaw[slideNumb]);
  $('script[src="select.js"]').remove();
  $('.select-selected').remove();
  $('.select-items').remove();
  $('<script>').attr('src', 'select.js').appendTo('head');
  setSelect();
  handleThemeUpdate();
  $('#container').css('transform', 'scale(1)');
  $('#container').css('top', '0');
  $('#container').css('left', '0');
  $('#navigation2').prop('checked', true);
  $('#navigation3').prop('checked', true);
  $('#navigation').prop('checked', true);
  $('#edit').css('display', 'none');
  setTimeout(function() {
    $('#sequenceEditor').css('display', 'none');
    $('#navigation').prop('checked', false);
  }, 400);
  reactivateButtons();
}

function handleThemeUpdate() {
  const root = document.documentElement;
  switch(slides[slideNumb][1]) {
    case 'slideOne':
      root.style.setProperty('--bg-main', '#FF5722');
      root.style.setProperty('--bg-maindark', '#F4511E');
      root.style.setProperty('--bg-mainlight', '#FF8A65');
      root.style.setProperty('--bg-light', '#FFCCBC');
      break;
    case 'slideTwo':
      root.style.setProperty('--bg-main', '#FFC107');
      root.style.setProperty('--bg-maindark', '#FFB300');
      root.style.setProperty('--bg-mainlight', '#FFD54F');
      root.style.setProperty('--bg-light', '#FFECB3');
      break;
    case 'slideThree':
      root.style.setProperty('--bg-main', '#4CAF50');
      root.style.setProperty('--bg-maindark', '#43A047');
      root.style.setProperty('--bg-mainlight', '#81C784');
      root.style.setProperty('--bg-light', '#C8E6C9');
      break;
    case 'slideFour':
      root.style.setProperty('--bg-main', '#03A9F4');
      root.style.setProperty('--bg-maindark', '#03A9F4');
      root.style.setProperty('--bg-mainlight', '#4FC3F7');
      root.style.setProperty('--bg-light', '#B3E5FC');
      break;
  }
}
function scrollToSlideNumber() {
  let left = (slideNumb % memoryCompiled.length) * 100;
  $('#container').contents().find('body #container').css("left", -left  + "vw");
  $('.slideList li')[slideNumb].click();

}
function move(array, oldPlace, newPlace) {
  let temp = array[oldPlace];
  array.splice(oldPlace, 1);
  array.splice(newPlace, 0, temp);
}

function reactivateButtons() {
  $('.close').each(function(){
    $(this).on('click', close);
  });
  $('.image').each(function(){
    $(this).on('click', showImage);
  });
  $('.newTeam').each(function(){
    $(this).on('click', newTeam);
  });
  $('.sortTable').each(function(){
    $(this).on('click', sortTable);
  });
  $('.video').each(function(){
    $(this).on('click', showVideo);
  });
  $('.card').each(function(){
    $(this).draggable({
      containment: ".body",
      stack: ".card",
      grid: [ 10, 10 ]
    });
  });
}

function newTeam() {
  $(this).parents('.card').find('table').append("<tr><td></td><td><input type='text'></td><td><input type='number' placeholder='0'></td></tr>");
}

function sortTable(){
  var shouldSwitch;
  rows = $(this).parents('.card').find('tr');
  let switching = true;
  while (switching) {
    switching = false;
    rows = $(this).parents('.card').find('tr');
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[2].getElementsByTagName('input')[0].value;
      y = rows[i + 1].getElementsByTagName("td")[2].getElementsByTagName('input')[0].value;
      if (Number(x) < Number(y)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  for (i = 1; i < rows.length; i++){
    rows[i].getElementsByTagName("td")[0].innerHTML = i;
  }
}
function showImage() {
  $(this).parents('.card').append("<img/>");
  let source = $(this).parents('.card').find('input[type=text]').val();
  $(this).parents('.card').find('img').attr('src', source);
  $(this).parents('.card').find('input').remove();
}

function showVideo() {
  $(this).parents('.card').append("<video></video>");
  let source = $(this).parents('.card').find('input[type=text]').val();
  $(this).parents('.card').find('video').append('<source src="' + source + '">');
  $(this).parents('.card').find('input').remove();
}

function close() {
  $(this).parents('.card').remove();
}

function setSelect() {
  switch (slides[slideNumb][1]) {
    case 'slideOne':
      $('select').val(1);
      break;
    case 'slideTwo':
      $('select').val(2);
      break;
    case 'slideThree':
      $('select').val(3);
      break;
    case 'slideFour':
      $('select').val(4);
      break;
  }
}

function saveFile() {
  $('#container').contents().find('head').append('<script src="sketch.js"></script>');
  var text = $('#container').contents().find('html').html();
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "Slides.html");
  $('#container').contents().find('script[src="sketch.js"]').remove();
}
