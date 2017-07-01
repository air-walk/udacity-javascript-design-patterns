window.onload = function() {
  var name1 = "Lyle";
  var name2 = "Beniga";

  var name1Ele = document.getElementById("name-1");
  var name2Ele = document.getElementById("name-2");
  var picture1 = document.getElementById("picture-1");
  var picture2 = document.getElementById("picture-2");
  var counter1 = document.getElementById("counter-1");
  var counter2 = document.getElementById("counter-2");

  name1Ele.innerText = name1;
  name2Ele.innerText = name2;

  picture1.addEventListener('click', function(e) {
    counter1.innerText = parseInt(counter1.innerText) + 1;
  }, false);

  picture2.addEventListener('click', function(e) {
    counter2.innerText = parseInt(counter2.innerText) + 1;
  }, false);
};
