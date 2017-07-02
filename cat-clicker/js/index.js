$(function() {
  var model = {
    init: function() {
      if (!localStorage.cats) {
        var cats = [];
        cats.push({ "name": "Lyle",    "imgSrc": "images/cat_picture0.jpeg", "numClicks": 0 });
        cats.push({ "name": "Beniga",  "imgSrc": "images/cat_picture1.jpeg", "numClicks": 0 });
        cats.push({ "name": "Anthony", "imgSrc": "images/cat_picture2.jpeg", "numClicks": 0 });
        cats.push({ "name": "Lee",     "imgSrc": "images/cat_picture3.jpeg", "numClicks": 0 });
        cats.push({ "name": "Vinh",    "imgSrc": "images/cat_picture4.jpeg", "numClicks": 0 });
        localStorage.cats = JSON.stringify(cats);
      }
    },
    getAllCats: function() {
      return JSON.parse(localStorage.cats);
    },
    getCatAtIndex: function(index) {
      var cats = this.getAllCats();
      if (index <= cats.length - 1) {
        return cats[index];
      }

      return;
    },
    incrementClicks: function(index) {
      var cats = this.getAllCats();
      cats[index]["numClicks"] += 1;
      localStorage.cats = JSON.stringify(cats);
    }
  };

  var octopus = {
    init: function() {
      model.init();
      view.init();
    },
    getAllCats: function() {
      return model.getAllCats();
    },
    getCatAtIndex: function(index) {
      return model.getCatAtIndex(index);
    },
    incrementClicks: function(index) {
      model.incrementClicks(index);
    }
  };

  var view = {
    init: function() {
      this.catsList = $("#cats-list");
      view.renderHeader();

      // Bind click events for header/navbar elements
      $("#cats-list a").click(function() {
        var catIndex = parseInt(this.id.replace("cat-", ""));
        view.renderContent(catIndex);
      });

      view.renderContent();

      // Bind click events for images
      $("#cat-image").click(function() {
        var catIndex = parseInt(this.src.split("/").pop().replace("cat_picture", "").split(".")[0]);

        octopus.incrementClicks(catIndex);
        view.renderContent(catIndex);
      });
    },
    renderHeader: function() {
      var htmlStr = '';
      var cats    = octopus.getAllCats();

      for(var i = 0; i < cats.length; i++) {
        htmlStr += '<li><a id="cat-' + i + '" href="#">' + cats[i].name + '</a></li>';
      }      

      this.catsList.html(htmlStr);
    },
    renderContent: function(catIndex = 0) {
      var cat = octopus.getCatAtIndex(catIndex);

      $("#cat-name").text(cat.name);
      $("#cat-image").attr("src", cat.imgSrc);
      $("#cat-num-clicks").text(cat.numClicks);
    }
  };

  octopus.init();
});