function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function openURL(url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
var currentColor = "";

var colors = [
  "#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#2ECC40",
  "#01FF70", "#FFDC00", "#FF851B", "#FF4136", "#85144B", "#F012BE",
  "#B10DC9", "#111111"
];

var currentQuote = "";
var currentAuthor = "";

function getRandomQuote() {
  var color = Math.floor(Math.random() * colors.length);


  $.ajax({
    headers: {
      "X-Mashape-Key": "4mBkdThZUUmshvifvKSnqm506LIqp1fOMlSjsnmexNsAhO5ZAG",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1",
    success: function(data) {

      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      currentQuote = data.quote;
      currentAuthor = data.author;

      $(".share-twitter").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" -' + currentAuthor));

      $(".share-tumblr").attr("href", 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');

      $(".quote-text").animate({
        opacity: 0
      }, 500, function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $(".quote-text").text(currentQuote);
      });

      $(".quote-author").animate({
        opacity: 0
      }, 500, function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $(".author-name").text(currentAuthor);
      });

      $(".bg-color-random").animate({
        backgroundColor: colors[color]
      }, 1000);
      $(".color-random").animate({
        color: colors[color]
      }, 1000);
    },
    error: function(_, status, errorMsg) {
      $(".quote-text").text(("" + status + ": " + errorMsg).toUpperCase());
    }
  });

}

$(document).ready(function() {
  getRandomQuote();

  $(".new-quote").click(getRandomQuote);

  $(".share-twitter").click(function() {
    if (!inIframe()) {
      openURL("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" -' + currentAuthor));
    }

  })
  $(".share-tumblr").click(function() {
    if (!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }
  })
});
