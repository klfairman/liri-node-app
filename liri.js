require("dotenv").config();

var request = require("request");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var keys = require("./keys.js");
var fs = require("fs");

// var used for terminal command if/elses
var liriArg = process.argv[2];

//Terminal Commands//

if (liriArg === "concert-this") {
    concert();
} else if (liriArg === "spotify-this-song") {
    song();
} else if (liriArg === "movie-this") {
    movie();
} else if (liriArg === "do-what-it-says") {
    doThis();
} else {
    console.log("You must enter a commands: concert-this, spotify-this-song, movie-this, do-what-it-says.");
}


//Movie Data----OMDB//

function movie() {

    var args = process.argv;
    var movieName = "";

    for (i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            movieName = movieName + "+" + args[i];
        } else {
            movieName = args[i];
        }
    };

    if (movieName === "") {
        movieName = "Mr." + "+" + "Nobody"
    };

    //call for the OMDB API with the specified movie//

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("-------------------------------------------------------------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-------------------------------------------------------------------------------------------");
        } else {
            console.log("Something went awry");
        }
    });
};

function concert () {

    var args = process.argv;
    var bandName = "";
    for (i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            bandName = bandName + "+" + args[i];
        } else {
            bandName = args[i];
        }
    };

    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log("Something went awry: " + error);
            return;
        }
        console.log("Band name    " + result.bandName)
        console.log("Venue name   " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY")
    );
    });
    


//Spotify section//

function song() {

    var spotify = new Spotify(keys.spotify);
    var args = process.argv;
    var songName = "";

    for (i = 3; i < args.length; i++) {
        if (i > 3 && i < args.length) {
            songName = songName + " " + args[i];
        } else {
            songName = args[i];
        }
    };
    //console.log(songName);
    if (args.length < 4) {
        songName = "the sign ace of base"
        process.argv[3] = songName;
    }
    //console.log(songName);
    spotify.search({
        type: "track",
        query: songName,
        limit: 1
    }, function (err, data) {
        if (err) {
            console.log("Something went awry: " + err);
            return;
        }
        console.log("-------------------------------------------------------------------------------------------");
        console.log("*Artist:       " + data.tracks.items[0].album.artists[0].name);
        console.log("*Song:         " + data.tracks.items[0].name);
        console.log("*Preview link: " + data.tracks.items[0].external_urls.spotify);
        console.log("*Album:        " + data.tracks.items[0].album.name);
        console.log("-------------------------------------------------------------------------------------------");

    })
};


function doThis () {
    

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var data = data.split(',');

        if (data[0] === "spotify-this-song") {
            process.argv[3] = data[1];
            song();
        }
    })
};
};

 








