const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const API_BASE_URL = 'https://data.nba.net/data/10s/prod/v1/2019/';
const API_ALL_PLAYERS = 'https://data.nba.net/data/10s/prod/v1/2019/players.json';
const API_PLAYER_PROFILE = proxyurl + 'http://data.nba.net/data/10s/prod/v1/2019/players/'; //{{player_id}}_profile.json
const PICTURE_BASE_URL = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/'; //{{player_id}}.png

function processPlayer(element) {}

const Http = new XMLHttpRequest();

//Allows

const base_url = proxyurl + API_BASE_URL;
const all_players_url = proxyurl + API_BASE_URL + 'players.json';

// fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
//       .then(response => response.text())
//       .then(contents => console.log(contents))
//   .catch(() =>
//     console.log("Can’t access " + url + " response. Blocked by browser?")
//   );

Http.open('GET', all_players_url);
Http.send();

Http.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.status);
    $('.searchButton').click(function() {
      $.getJSON(all_players_url, function(result) {
        var players = result.league.standard;
        getInformation(players);
        var info = getInformation(players);
        var id = info[1];
        changePicture(id);
        $.getJSON(API_PLAYER_PROFILE + id + '_profile.json', function(result) {
          var playerStats = result.league.standard.stats.latest;
          getStats(playerStats);
        });
        $.getJSON(API_PLAYER_PROFILE + id + '_gamelog.json', function(result) {
          console.log(result);
        });
      });
    });
  }
};

function getName() {
  var input = document.getElementById('NameInput').value;
  input = input.toLowerCase();
  return input;
}

function getInformation(obj) {
  var name = getName();
  for (var i = 0; i < obj.length; i++) {
    var player = obj[i];
    var personId = player.personId;
    var playerName = player.temporaryDisplayName;
    playerName = playerName.toLowerCase();
    if (name == playerName) {
      document.getElementById('playerId').innerHTML = personId;
      document.getElementById('playerName').innerHTML = player.temporaryDisplayName;
      return [playerName, personId];
    }
  }
}

function changePicture(playerId) {
  if (playerId) {
    var picUrl = PICTURE_BASE_URL + playerId + '.png';
    document.getElementById('profile_picture').src = picUrl;
  } else document.getElementById('profile_picture').src = 'default.png';
}

function getStats(playerStats) {
  if (playerStats) {
    document.getElementById('ppg').innerHTML = playerStats.ppg;
    document.getElementById('rpg').innerHTML = playerStats.rpg;
    document.getElementById('apg').innerHTML = playerStats.apg;
    document.getElementById('spg').innerHTML = playerStats.spg;
    document.getElementById('bpg').innerHTML = playerStats.bpg;
    document.getElementById('fgp').innerHTML = playerStats.fgp;
    document.getElementById('ftp').innerHTML = playerStats.ftp;
    document.getElementById('topg').innerHTML = playerStats.topg;
    document.getElementById('mpg').innerHTML = playerStats.mpg;
  }
}
