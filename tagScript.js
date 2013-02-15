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
    var that = this;
    this.renderPhoto = function () {
      el.empty();
      el.append("<img src=" + photo.filename + ">");

      // var showTagsButton = $('#showTags');
      // hardcode add tag button
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


      // showTagsButton.unbind("click", handleTagsClick);
      // function handleTagsClick() {
      //   photoShower.renderTags();
      // };
      // showTagsButton.click(handleTagsClick);


    this.bind = function () {
      $('#showTags').click(that.renderTags);
    }

    this.unbind = function () {
      $('#showTags').unbind("click", that.renderTags);
    }
  }

  function SelectPhoto(el, photos, clickCallback) {
    var that = this;

    this.unbinder = null;

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
      if (that.unbinder) {
        that.unbinder();
      }
      var photoID = $(event.target).attr("data-photo-id");
      that.unbinder = clickCallback(Photo.find(photos, photoID));
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



  var photoSelector = new PhotoScript.SelectPhoto(
    sidebar, photoArray, function (photo) {
      // 1. create ShowPhoto
      // 2. tell it to bind to events
      // 3. return to PhotoSelector a method for it
      //    to call before next click which unbindes ShowPhoto.


      // oldHandler.unbind();
      // create newHandler
      // call newHandler.bind(button1, button2)


      var photoShower = new PhotoScript.ShowPhoto(main, photo);
      photoShower.renderPhoto();
      photoShower.bind()

      return function() {
        photoShower.unbind();
      }



  });

  photoSelector.render();

});
