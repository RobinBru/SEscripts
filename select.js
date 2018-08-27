$(document).ready(function() {



var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("cSelect");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", update);
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
      document.getElementsByClassName('selectWrapper')[0].classList.toggle("overflow")
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

});

function update(){
/*when an item is clicked, update the original select box,
and the selected item:*/
const root = document.documentElement

var y, i, k, s, h;
s = $("select")[0];
h = this.parentNode.previousSibling;
for (i = 0; i < s.length; i++) {
  if (s.options[i].innerHTML == this.innerHTML) {
    s.selectedIndex = i;
    h.innerHTML = this.innerHTML;
    y = this.parentNode.getElementsByClassName("same-as-selected");
    for (k = 0; k < y.length; k++) {
      y[k].removeAttribute("class");
    }
    this.setAttribute("class", "same-as-selected");
    break;
  }
}
h.click();
switch($('select').val()) {
  case '1':
    root.style.setProperty('--bg-main', '#FF5722');
    root.style.setProperty('--bg-maindark', '#F4511E');
    root.style.setProperty('--bg-mainlight', '#FF8A65');
    root.style.setProperty('--bg-light', '#FFCCBC');
    break;
  case '2':
    root.style.setProperty('--bg-main', '#FFC107');
    root.style.setProperty('--bg-maindark', '#FFB300');
    root.style.setProperty('--bg-mainlight', '#FFD54F');
    root.style.setProperty('--bg-light', '#FFECB3');
    break;
  case '3':
    root.style.setProperty('--bg-main', '#4CAF50');
    root.style.setProperty('--bg-maindark', '#43A047');
    root.style.setProperty('--bg-mainlight', '#81C784');
    root.style.setProperty('--bg-light', '#C8E6C9');
    break;
  case '4':
    root.style.setProperty('--bg-main', '#03A9F4');
    root.style.setProperty('--bg-maindark', '#03A9F4');
    root.style.setProperty('--bg-mainlight', '#4FC3F7');
    root.style.setProperty('--bg-light', '#B3E5FC');
    break;
  }
}
