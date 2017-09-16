$(document).ready(function() {

  // $("#search-wiki").on("blur", function() {
  //   this.value = "";
  // });

  $("#cross").on("click", function() {
    // location.reload();
    $("#search-wiki").val("");
    $(".search-result-container").html("");
    $("#cross").css("opacity", "0");
    $(".outer-container").animate({
      top: "50%"
    }, 300);
  });

  $("#search-wiki").on("keydown", function(e) {
    if (e.which == 13) {
      $(".outer-container").animate({
        top: "15%"
      }, 300);
      $(".search-result-container").html("");

      $("#cross").css("opacity", "1");

      let searchQuery = this.value;
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" +
          encodeURIComponent(searchQuery),
        success: function(data) {
          console.log(data);
          if (typeof data === "string") {
            data = JSON.parse(data);
          }
          let articles = data.query.search;
          if (articles.length === 0) {
            let errorMsg =
              '<article class="search-results-item" style="text-align:center;">' +
              '   <p class="sri-heading">No results found&#33;</p>' +
              '</article>';

            $(".search-result-container").append(errorMsg);
            $(".search-result-container").removeClass("hide");
            return;
          }
          articles.forEach(function(article, index) {

            let articleNode =
              '<article id="article' + index + '" class="search-results-item">' +
              '   <p class="sri-heading">' + article.title + '</p>' +
              '   <p class="sri-snippet">' + article.snippet + '</p>' +
              '</article>';

            $(".search-result-container").append(articleNode);

            $("#article" + index).on("click", function() {
              window.open("http://en.wikipedia.org/?curid=" + article.pageid, "_blank");
            });

          })
          $(".search-result-container").removeClass("hide");
        }
      })
    }
  });

})
