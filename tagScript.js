var photo1 = {name: "Hedgehogs2.png", tags: [{name: "Ned", x: 200, y: 300 },
                             {name: "Kush", x: 400, y: 200}]}


function showPhoto(photo) {
  var screenShot = $('.photos');

  screenShot.append("<img src=" + photo.name + ">");

  return {

    showTags: function() {
      photo.tags.forEach(function(tag) {
        screenShot.append(
          $("<div><strong>" + tag.name + "</strong></div>")
            .addClass("tag")
            .css("left", (tag.x - 50) + 'px')
            .css("top", (tag.y - 50) + 'px')
        )
      })
    }
  }
}

$(function() {
  var page = showPhoto(photo1);
  $('#showTags').click(function() {
    page.showTags();
  });
});