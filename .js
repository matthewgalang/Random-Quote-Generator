//inspired by https://codepen.io/freeCodeCamp/full/ONjoLe and twitter


$(document).ready(function(){
  // Background element
  
  
  
  var quote ="";
  var author ="";
  var colors = ['#5BBFEA', '#FCE74B', '#99C43C', '#E55B34', '#F97720', '#EA5BBF', '#4BFCE7', '#3C99C4', "#34E55B", "#673CC4"];
  var pics =['puppy', 'kitten', 'birds', 'dolphin', 'giraffe', "turtle", "human", "kids", "goat", "lamb", "cow", "pig", "horse", "city", "baby"];
  
  function getNewQuote () {
    $.ajax({
      url:'https://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      data: {
        method:'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success: function(response) {
        quote = response.quoteText;
        author = response.quoteAuthor;
        $('#quoteText').text(quote);
        if (author) {
          $('#quoteAuthor').text(author);
          $('#quoteAuthorSmall').text('#' + author.match(/\S/g).join('') + 'Quotes');
        } else {
          $('#quoteAuthor').text('Unknown');
          $('#quoteAuthorSmall').text('#UnknownQuotes');
        }
      }
    });
  }
  

  function getImage () {
    var pic = Math.floor(Math.random() * pics.length);
    var rand = Math.floor(Math.random() * 8);
    $.ajax({
      url:'https://pixabay.com/api/',
      data: {
        key:'6181477-ab9d27ee1f5c11afaebf99bcd',
        q: pics[pic],
        image_type:'photo',
      },
      success: function(response) {
        imgSrc = response.hits[rand].webformatURL;
        $("#theImage").attr("src", imgSrc);
      }
    });
  }
  
  
  
  function colorRandomizer(){
    var color1=Math.floor(Math.random() * colors.length);
    var color2=Math.floor(Math.random() * colors.length);
    colorChange(colors[color1],colors[color2]);
  }
  
  function colorChange (color1,color2) {
    if (color1 == color2) {
      colorRandomizer();
    } else {
      $('.gradient.b').attr("style","background-image:linear-gradient(to bottom right,"+color1+","+color2+");");
      $('#b').removeClass().addClass('gradient b');
      $('.gradient.b').fadeIn(500,null,function(){
        $('.gradient.a').attr("style","background-image:linear-gradient(to bottom right,"+color1+","+color2+");");
        $('#a').removeClass().addClass('gradient a').css("display","inline");;
        $('#b').fadeOut();
      });
    }
  }
                     
  
  $('.get-quote').on('click', function(event) {
    event.preventDefault();
    getNewQuote();
    colorRandomizer();
    getImage();
  });
  
  $('.tweet-quote').on('click', function(event) {
    event.preventDefault();
    if (quote && author) {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '" ' + '-' + author));
    } else {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"I love random quotes!" - Random Quote Generator'));
    }
  });
  
  colorRandomizer();
  getImage();

});
