window.onscroll = function() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 560) {
    //document.getElementById('main-nav').style.borderBottom = "1px solid black";
    document.getElementById('main-nav').style.boxShadow = "0px 0px 10px 1px #ccc"
  }
  else if (scrollTop < 560) {
    document.getElementById('main-nav').style.borderBottom = "";
    document.getElementById('main-nav').style.boxShadow = ""
  };
};
