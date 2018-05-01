require("dotenv").config();
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var value = "";
var action = process.argv[2];
for (var i = 3; i < process.argv.length; i++) {
    value = value + " " + process.argv[i];
};

switch (action) {
    case "my-tweets":
    myTweets();
      break;
    case "spotify-this-song":
    spotifySong();
      break;
    case "movie-this":
    movieThis();
      break;
    case "do-what-it-says":
    doWhat();
      break;
    }
function spotifySong(){
    spotify.search({ type: 'track', query: value, limit: 2 }, function (error, data) {
        if (error) {
            return console.log('Error: ' + error);
        }
        var song = data.tracks.items[0];
        for (var k = 0; k < song.artists.length; k++) {
            console.log("Artist: " + song.artists[k].name)
        }
        console.log("Track: " + song.name);
        console.log("Album: " + song.album.name);
        console.log("Preview Link: " + song.external_urls.spotify);
    });
}
function myTweets(){
    client.get('statuses/user_timeline', 'rishikesh_n18', function (error, twitters, response) {
        if (error) {
            return console.log("Error: " + error)
        }
        else {
            console.log("Tweets: \n");
            for (var j = 0; j < 10; j++){
                var tweet = twitters[j];
                console.log(tweet.text);
                console.log(tweet.created_at);
                
               // console.log(tweet.created_at + "\n");
               //console.log(response);
            };
        }
    });
}
function movieThis() {
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (error) {
            return console.log("Error: " + error)
        }
        else if (response.statusCode === 200) {
            var movieInfo = JSON.parse(body);
            console.log("Title: " + movieInfo.Title)
            console.log("Year: " + movieInfo.Year)
            console.log("IMDB Rating: " + movieInfo.imdbRating)
            if (movieInfo.Ratings[1]) {
            console.log("Tomatometer: " + movieInfo.Ratings[1].Value)
            }
            else if (!movieInfo.Ratings[1]){console.log("Tomatometer: No Rating Available")}
            console.log("Country: " + movieInfo.Country);
            console.log("Language(s): " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors)
        }
    })
}
function doWhat() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }
        var arr = data.split(",");
        value = arr[0];
        action = arr[1];
        
    });
}
