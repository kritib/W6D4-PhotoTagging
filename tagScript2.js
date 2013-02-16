
var namesForTags = ["Ned", "Jonathan", "Kush"];

function makePhoto(filename) {
  var photo = {
    name: filename,
    tags: []
  };
};

function makeTagsController(element) {
  var tagsController = {
    photo: null,

    bind: function (photo) {
      this.photo = $(photo);

      this.photo.click(this.handleClick.bind(this));
    },

    handleClick: function (event) {
      this.relPos = {
        x: event.pageX,
        y: event.pageY
      };

      this.showTagBox(this.relPos);
    },

    namesTable: function(pos) {
      var table = $("<div></div>")
          .addClass("nameList")
          .css("left", pos.x + 60)
          .css("top", pos.y - 50);

      namesForTags.forEach(function(name) {
        table.append(
          $("<div></div>")
          .addClass("name")
          .append("<well>" + name + "</well>")
          // add hidden positional info
          )
      });

    //   $('.nameList').on(click, '.name', function(event) {
    // // create tag object & saves location with name
    //   })

      return table;
    },

    showTagBox: function (pos) {
      this.photo.prepend(
        $("<div></div>")
          .addClass("tag")
          .css("left", pos.x - 50)
          .css("top", pos.y - 50)
      );

      this.photo.prepend(this.namesTable(pos));
    },

    createTag: function()
  };

  tagsController.bind(element);

  return tagsController;
};


$(function () {
  var photos = $(".photo");

  photos.each(function () {
    makeTagsController(this);
  });
});


  function SelectPhoto(el, photos, clickCallback) {
    var that = this;

    this.unbinder = null;

    this.renderPhotoLink = function (photo) {
      var link = $('<a href="#"></a>');

      link.text("<well>" + name + "</well>");
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
      $('.buttons').addClass('photoShowing');
      var photoID = $(event.target).attr("data-photo-id");
      that.unbinder = clickCallback(Photo.find(photos, photoID));
    };


  // }