window.onload = function() {
  var picture = document.getElementById("picture");
  var counter = document.getElementById("counter");

  picture.addEventListener('click', function(e) {
    counter.innerText = parseInt(counter.innerText) + 1;
  }, false);
};