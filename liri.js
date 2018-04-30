require("dotenv").config();
var request = require("request");
//var Twitter = require("twitter");
//var Spotify=require("spotify");

var keys = require("./key");

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
//console.log(client);
// Load the fs package to read and write
var fs = require("fs");
// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
  value = value + "+"+ process.argv[i];
}
console.log(value);
// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
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
var Twitter = require('twitter');
function myTweets() {
	// Load twitter module from npm
	

	// From exports of keys.js file
	// var client = new Twitter({
	// 	consumer_key: twitterCredentials.consumer_key,
	// 	consumer_secret: twitterCredentials.consumer_secret,
	// 	access_token_key: twitterCredentials.access_token_key,
	// 	access_token_secret: twitterCredentials.access_token_secret
	// });

	// Twitter API parameters
	var params = {
		screen_name: 'rishikesh_n18',
		count: 10
	};

	// GET request for last 20 tweets on my account's timeline
	twitClient.get('statuses/user_timeline', params).then(function(tweets) {
		console.log('\n');
		for(var i = 0; i < (tweets.length < 20 ? tweets.length : 20); i++) {
				var date = new Date(tweets[i].created_at);
				console.log(
						'\nUser: ' + params.screen_name
						+ '\"\nDate: ' + Moment(date).format('LLL')
						+ '\nTweet: \"' + tweets[i].text 
						+ '\"\n'
				);
		}
		console.log('\n');
})
.catch(function(err){
		console.log(err);
});
};

function spotifySong() {
  spotify.search({ type: 'track', query: songName })
    .then(function(response) {
        var items = response.tracks.items;
        for(var i = 0; i < items.length; i++) {
            console.log(
                // '\nArtist: ' + items[0].artists[0].name
                // + '\nSong Name: ' + items[0].name
                // + '\nPreview URL: ' + items[0].preview_url
                // + '\nAlbum: ' + items[0].album.name
                '\nArtist: ' + items[i].artists[0].name
                + '\nSong Name: ' + items[i].name
                + '\nPreview URL: ' + items[i].preview_url
                + '\nAlbum: ' + items[i].album.name
            );
        }
        console.log('\n');
    })
    .catch(function(err) {
        searchSong('The Sign');
    });
};

var Imdb = require('imdb-api');

function movieThis (){
	Imdb.get((name + '').replace(/,/g, ' '), {apiKey: Keys.omdbKeys['apiKey'], timeout: 30000})
	.then(function(movie) {
			console.log(
					'\nTitle: ' + movie.title
					+ '\nDate: '+ movie.year
					+ '\n' + movie.ratings[0].Source 
					+ ': '+ movie.ratings[0].Value
					+ '\n'+ movie.ratings[1].Source
					+ ': '+ movie.ratings[1].Value
					+ '\nCountry: ' + movie.country
					+ '\nLanugages: ' + movie.languages
					+ '\nPlot: ' + movie.plot+ '\n'
			);
	})
	.catch(function(err){
			imdbInfo('Mr. Nobody.');
	});
}

function doWhat() {
	return new Promise(function(resolve, reject) {
		fs.readFile('random.txt', 'utf8', function(error, data) {
				if (error) {
						console.log(error);
						reject(error);
				}
				resolve(data.split(','));
		});
});
}
