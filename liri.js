//linking differnt npm and other files
require("dotenv").config();
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//grabing user command
var action = process.argv[2];

//grabing user input
var value = "";
for (var i = 3; i < process.argv.length; i++) {
    value = value + " " + process.argv[i];
};

//switch case of the user command line (user inputs)
function runSwitch(action) {
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
};

//commands to get latest 20 tweets
function myTweets(){
    client.get('statuses/user_timeline', 'rishikesh_n18', function (error, twitters, response) {
        if (error) {
            return console.log("Error: " + error)
        }
        else {
            console.log("Tweets: \n");
            for (var j = 0; j < 20; j++){
                var tweet = twitters[j];
                console.log(tweet.text+ ", Created at: "+ tweet.created_at);
                //console.log(tweet.created_at);
                
               // console.log(tweet.created_at + "\n");
               //console.log(response);
            };
        }
    });
}
//Commands to get song details
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
//command to get movie informations
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
//command to do from the ramdom.txt file
function doWhat() {
        value="";
        action= "";
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log("Error: " + error);
        }else {
        var arr = data.split(",");
        action = arr[0];
        value = arr[1];
        console.log(value);
        console.log(action);
        runSwitch(action);
        }
    });
}

runSwitch(action);
