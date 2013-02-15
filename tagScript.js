var TagScript = (function () {
  function Tag(photoID, name, x, y) {
    this.photoID = photoID;
    this.name = name;
    this.x = x;
    this.y = y;
  }

  function addTag(photoID, name, x, y) {
    var tag = new TagScript.Tag(photoID, name, x, y);

    var photo = PhotoScript.Photo.find(photoArray, photoID);

    photo.tags.push(tag);
  }

  return {
    Tag: Tag,
    addTag: addTag
  }

})();


var PhotoScript = (function () {
  function Photo(id, filename, tags) {
    this.id = id;
    this.filename = filename;
    this.tags = tags;
  }

  Photo.find = function (photoList, id) {
    return _.find(photoList, function (p) {
      return p.id == id;
    });
  }

  // Photo.all && Photo.find will go here once we have multiple photos

  function ShowPhoto(el, photo) {
    this.renderPhoto = function () {
      el.empty();
      el.append("<img src=" + photo.filename + ">");
    }

    this.renderTags = function () {
      photo.tags.forEach(function(tag) {
        el.append(
          $("<div><strong>" + tag.name + "</strong></div>")
            .addClass("tag")
            .css("left", (tag.x - 50) + 'px')
            .css("top", (tag.y - 50) + 'px')
        )
      })
    }

    this.bind = function () {

    },

    this.unbind = function () {

    }
  }

  function SelectPhoto(el, photos, clickCallback) {
    var that = this;

    this.renderPhotoLink = function (photo) {
      var link = $('<a href="#"></a>');

      link.text(photo.id);
      link.attr("data-photo-id", photo.id);
      link.click(that.clickPhoto.bind(that));

      return link;
    };

    this.render = function () {
      var ul = $("<ul></ul>");

      _.each(photos, function (photo) {
        var link = that.renderPhotoLink(photo);
        ul.append($("<li></li>").append(link));
      });

      $(el).html(ul);
    };

    this.clickPhoto = function (event) {
      var photoID = $(event.target).attr("data-photo-id");
      clickCallback(Photo.find(photos, photoID));
    };


  }

  return {
    Photo: Photo,
    ShowPhoto: ShowPhoto,
    SelectPhoto: SelectPhoto
  };

})();

var photoArray = [new PhotoScript.Photo(1, "Hedgehogs2.png", []),
                  new PhotoScript.Photo(2, "hedgehogs1.jpg", [])];

var tagsArray = [new TagScript.addTag(1, "Ned", 200, 300),
                 new TagScript.addTag(1, "Kush", 400, 200),
                 new TagScript.addTag(2, "Jon", 100, 150),
                 new TagScript.addTag(2, "Giorgio", 300, 100)];

$(function() {
  var main = $("#main");
  var sidebar = $("#sidebar");
  var showTagsButton = $('#showTags');


  var photoSelector = new PhotoScript.SelectPhoto(
    sidebar, photoArray, function (photo) {



      // oldHandler.unbind();
      // create newHandler
      // call newHandler.bind(button1, button2)

      showTagsButton.unbind("click", handleTagsClick);

      var photoShower = new PhotoScript.ShowPhoto(main, photo);
      photoShower.renderPhoto();

      function handleTagsClick() {
        photoShower.renderTags();
      };
      showTagsButton.click(handleTagsClick);


  });

  photoSelector.render();

});