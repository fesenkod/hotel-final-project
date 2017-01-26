// generation of rooms content

var filterSet = [];
var roomsObject = localStorage.getItem('roomsObject');

if (!roomsObject) {
    localStorage.setItem('roomsObject', JSON.stringify(roomsList));
}

roomsList = JSON.parse(localStorage.getItem('roomsObject'));


function roomsGenerator(roomsList, filtparams) {
  var result = "<div id='page1' class='visible' >";
  var page = 1;
  var fullIteration = 0;        // for the sake of pagination
  for (var i = 0; i < roomsList.length; i++) {
    // can we include this room to the page (according to filter settings) ?
    var flag = true;
    for (var k = 0; k < filtparams.length; k++) {
      if (roomsList[i][filtparams[k]] == false) {
        flag = false;
      };
    };
    if (flag == false) {
      continue;
    };

    fullIteration++;
    result += "<div class='roomBlock'><img src='" + roomsList[i]['image'] + "' alt=''>" +
    "<div class='roomInfo'><h3>Номер категории " + roomsList[i].category + "</h3>" +
    "<p class='descr'>" + roomsList[i].description + "</p>" +
    "<ul class='roomFeatures'>" + (roomsList[i].cond ? "<li><i class='fa fa-check-circle-o' aria-hidden='true'></i>Кондиционер</li>" : "") +
    (roomsList[i].wifi ? "<li><i class='fa fa-check-circle-o' aria-hidden='true'></i>Wi-fi</li>" : "") +
    (roomsList[i].smoke ? "<li><i class='fa fa-check-circle-o' aria-hidden='true'></i>Для курящих</li>" : "") +
    (roomsList[i].restrAbility ? "<li><i class='fa fa-check-circle-o' aria-hidden='true'></i>Для гостей с ОВ</li>" : "") +
    (roomsList[i].veranda ? "<li><i class='fa fa-check-circle-o' aria-hidden='true'></i>С террасой</li>" : "") +
    (roomsList[i].kingSizeBed ? "<li><i class='fa fa-check-circle-o' aria-hidden='true'></i>Большая кровать</li>" : "") + "</ul>" +
    "<p class='roomPrice'>Цена: " + roomsList[i].price + "</p>" +
    "<p>Занято: " + roomsList[i].numBusy + "</p>" +
    "<p>Свободно: " + roomsList[i].numFree + "</p> </div>" +
    "<button type='submit' class='reservationButton'>БРОНИРОВАТЬ</button>" + "</div>";

    // set proper IDs for further pagination
    if ((fullIteration)%5 == 0 && (i+1) != roomsList.length) {
      page++;
      result += "</div><div id='page" + page + "' class='invisible' >";
    }
    else if (i+1 == roomsList.length) {
      result += "</div>";
    }
  };

  // pagination box
  result += "<div id='pagination'>";
  for (var j = 1; j <= page; j++) {
    if (j==1) {
      result += "<button type='button' class='active-pageButton' id='" + j + "'>" + j + "</button>";
    }
    else {
      result += "<button type='button' id='" + j + "'>" + j + "</button>";
    }
  }
  result += "</div>";
  return result;
};

function writeHTML() {
  document.getElementsByClassName("rooms-information")[0].innerHTML = roomsGenerator(roomsList, filterSet);
};

function paginate() {
  // make pagination works
  var paginationDiv = document.getElementById('pagination');

  paginationDiv.addEventListener('click', function(event) {
    var target = event.target;
    if (target.tagName != "BUTTON") return;

    var pageID = target.id;
    paginationDiv.getElementsByClassName('active-pageButton')[0].removeAttribute('class');
    target.setAttribute('class', 'active-pageButton');


    var forClassDel = document.getElementsByClassName('rooms-information')[0].getElementsByClassName("visible")[0]
    forClassDel.removeAttribute('class');
    forClassDel.setAttribute('class', 'invisible');

    var pageDiv = document.getElementById('page' + pageID);
    pageDiv.removeAttribute('class');
    pageDiv.setAttribute('class', 'visible');
    window.scrollTo(0, 0);
  })
};

function sorting() {
  document.getElementsByClassName('sorting')[0].addEventListener('change', function(event) {
    var order = event.target.id;
    roomsList.sort(function (a, b) {
      if (order == 'ascending' && a.price > b.price ) {
        return 1;
      };
      if (order == 'descending' && a.price < b.price) {
        return 1;
      };
      return -1;
    });
    writeHTML();
    paginate()
  })
};

function filtrate() {
  document.getElementsByClassName('filters')[0].addEventListener('change', function(event) {
    filterSet = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        filterSet.push(checkboxes[i].id);
      };
    };
    writeHTML();
    paginate();
  });
}

window.onload = function() {
	writeHTML();
  paginate();
  sorting();
  filtrate();
};
