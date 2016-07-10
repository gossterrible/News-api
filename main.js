$(function() {
  $('select').on('change', function() {

    $('header').switchClass("headlarge", "headsmall", 1000, "easeOutQuad");
    $('img').switchClass("logolarge", "logosmall", 1000, "easeOutQuad");

    $(".all-categories").empty();
    $('.loading').show();

    var select = $('.selection').val();
    $.ajax({

      method: 'GET',
        //url: 'http://api.nytimes.com/svc/topstories/v1/' + select + '.json?api-key=766c9f7c67d153d7f4ae5f1861604d43:8:75124094'
    url: "https://newsapi.org/v1/articles?source=" + select + "&apiKey=d0bafad2da594e8f966c960256a9ff35"
    })

        .done(function(data) {

          if (data.articles.length === 0) {
            $('.all-categories').append("<p>Sorry, nothing found! Please try again.</p>");
          }
          else {
              var nytData = data.articles;
              nytData = nytData.filter(function(item) {
                  return item.urlToImage;
              });

              nytData.forEach(function(item, index) {

                  $('.all-categories').append('<div class="articlepics story-' + index + '"><div class="text"><a href="' + item.url + '"> ' + item.title + '</a></div></div>');
                  $('.story-' + index).css('background-image', 'url("' + item.urlToImage  + '")');
                  });
                }
                }).always(function() {
                  $('.loading').hide();
              });
            });
});
