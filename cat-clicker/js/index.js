$(function() {
  var model = {
    init: function() {
      if (!localStorage.cats) {
        var cats            = [];
        var currentCatIndex = 0;

        cats.push({ "name": "Lyle",    "imgSrc": "images/cat_picture0.jpeg", "numClicks": 0 });
        cats.push({ "name": "Beniga",  "imgSrc": "images/cat_picture1.jpeg", "numClicks": 0 });
        cats.push({ "name": "Anthony", "imgSrc": "images/cat_picture2.jpeg", "numClicks": 0 });
        cats.push({ "name": "Lee",     "imgSrc": "images/cat_picture3.jpeg", "numClicks": 0 });
        cats.push({ "name": "Vinh",    "imgSrc": "images/cat_picture4.jpeg", "numClicks": 0 });
        localStorage.cats            = JSON.stringify(cats);
        localStorage.currentCatIndex = currentCatIndex;
      }
    },
    getAllCats: function() {
      return JSON.parse(localStorage.cats);
    },
    getCurrentCatIndex: function() {
      return localStorage.currentCatIndex;
    },
    setCurrentCatIndex: function(index) {
      localStorage.currentCatIndex = index;
    },
    getCurrentCat: function() {
      var index = model.getCurrentCatIndex();
      return JSON.parse(localStorage.cats)[index];
    },
    incrementClicks: function() {
      var cats = this.getAllCats();
      var currentCatIndex = model.getCurrentCatIndex();
      cats[currentCatIndex]["numClicks"] = parseInt(cats[currentCatIndex]["numClicks"]) + 1;
      localStorage.cats = JSON.stringify(cats);
    },
    updateCat: function(name, imgSrc, numClicks) {
      var cats = this.getAllCats();
      var currentCatIndex = model.getCurrentCatIndex();

      cats[currentCatIndex]["name"]      = name;
      cats[currentCatIndex]["imgSrc"]    = imgSrc;
      cats[currentCatIndex]["numClicks"] = parseInt(numClicks);

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
    getCurrentCatIndex: function() {
      return model.getCurrentCatIndex();
    },
    setCurrentCatIndex: function(index) {
      model.setCurrentCatIndex(index);
    },
    getCurrentCat: function() {
      return model.getCurrentCat();
    },
    incrementClicks: function() {
      model.incrementClicks();
    },
    updateCat: function(name, imgSrc, numClicks) {
      model.updateCat(name, imgSrc, numClicks);
    }
  };

  var view = {
    init: function() {
      this.catsList = $("#cats-list");
      view.renderHeader();
      view.bindNavbarElements();
      view.renderContent();

      // Bind click events for images
      $("#cat-image").click(function() {
        octopus.incrementClicks();
        view.renderContent();
      });

      // Bind Admin button
      var $adminForm = $("#admin-form");
      var $name      = $("#name");
      var $imgUrl    = $("#img-url");
      var $numClicks = $("#num-clicks");
      var $cancelButton = $("#cancel-btn");

      // Hide form by default
      $adminForm.hide();

      $("#admin-btn").click(function() {
        $adminForm.toggle();
      });

      // Bind form submission
      $adminForm.submit(function(e){
        // octopus.addCat($name.val(), $imgUrl.val(), $numClicks.val());
        octopus.updateCat($name.val(), $imgUrl.val(), $numClicks.val());
        view.renderHeader();
        view.renderContent();
        $adminForm.hide();
        
        // Re-bind navbar elements
        view.bindNavbarElements();

        e.preventDefault();
      });

      // Bind Cancel button
      $cancelButton.click(function(e) {
        $adminForm.hide();
        e.preventDefault();
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
    renderContent: function() {
      var cat = octopus.getCurrentCat();

      $("#cat-name").text(cat.name);
      $("#cat-image").attr("src", cat.imgSrc);
      $("#cat-num-clicks").text(cat.numClicks);

      $("#name").val(cat.name);
      $("#img-url").val(cat.imgSrc);
      $("#num-clicks").val(cat.numClicks);
    },
    bindNavbarElements: function() {
      // Bind click events for header/navbar elements
      $("#cats-list a").click(function() {
        octopus.setCurrentCatIndex(this.id.replace("cat-", ""));
        view.renderContent();
      });
    }
  };

  octopus.init();
});