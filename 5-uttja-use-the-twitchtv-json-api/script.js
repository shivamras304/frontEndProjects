// https://wind-bow.glitch.me/twitch-api/streams/ESL_SC2
// https://wind-bow.glitch.me/twitch-api/channels/ESL_SC2

const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function loadChannelInfo() {

  function getUrl(type, channelName) {
      const baseUrl = "https://wind-bow.glitch.me/twitch-api/";
      return baseUrl + type + "/" + channelName + "?callback=?";
  }
    for(const channel of channels) {
      let gameName, gameStatus;
      $.getJSON(
        getUrl("streams", channel),
        function(data) {
          if(data.stream === null) {
            gameName = "Offline";
            gameStatus = "offline";
          } else if (data.stream === undefined) {
            gameName = "Account Closed";
            gameStatus = "offline";
          } else {
            gameName = data.stream.game;
            gameStatus = "online";
          }
          $.getJSON(
            getUrl("channels", channel),
            function(data) {
              const gameLogo = data.logo || "https://goo.gl/a9VX81",
                gameName = data.display_name || channel,
                gameDesc = (gameStatus === "online" ? gameName +  ': ' + data.status : "<em>Offline</em>");

              const html = `
              <li  class="clearfix ${gameStatus}">
                <img src="${gameLogo}">
                <div>
                  <a class="channel-name" href="${data.url}" target="_blank">${gameName}</a>
                  <p class="channel-info">${gameDesc}</p>
                </div>
              </li>
              `;

              $("#channelList").append(html);
            }
          )
      })
    }
}

$(document).ready(function() {
  loadChannelInfo();
  $(".tabItem").on("click", function(event) {
    $(".tabItem").removeClass("active");
    $(this).addClass("active");
    var that = this;
    $("main").slideUp(600, function() {
      var status = $(that).attr('id');
      switch(status) {
        case "all" :
          $(".online").removeClass("hidden");
          $(".offline").removeClass("hidden");

          break;
        case "online" :
          // $("main ul li").toggleClass("hidden")
          $(".online").removeClass("hidden");
          $(".offline").addClass("hidden");
          break;
        case "offline" :
          $(".offline").removeClass("hidden");
          $(".online").addClass("hidden");
          break;
      }
      $("main").slideDown(600);
    });
  })

});
