
var img_list = ["img0.jpg","img1.jpg","img2.jpg","img3.jpg","img4.jpg", "img5.jpg" ];


function galleryGenerator(img_list) {
  var result = "<ul>";
  for (var i = 0; i < img_list.length; i++) {
    result += "<li><img id='" + i + "'src='img/gallery/" + img_list[i] + "' alt=''></li>";
  }
  return result + "</ul>";
};

document.getElementById("gallery_list").innerHTML = galleryGenerator(img_list);

function setImage(number) {
  document.getElementById("img-view").firstElementChild.src = "img/gallery/img" + number + ".jpg";
};

window.onload = function() {
	setImage(0);
};

document.getElementById('gallery_list').addEventListener("click", function(event) {
  var target = event.target;
  if (target.tagName != "IMG") return;

  setImage(target.id);

});
