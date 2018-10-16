This application uses Node.js to create Liri bot (similar to iPhone's Siri). Liri is a command line application that takes in arguments and returns data based on one of four commands:

concert-this
spotify-this-song
movie-this
do-what-it-says

concert-this
Retrieves concert information including Venue and date of event.
node liri.js concert-this <band name>

spotify-this-song
Retrieves song information for a track. If no argument is passed, song defaults to "The Sign" by Ace of Base.
node liri.js spotify-this-song <song name>

movie-this
Retrieves movie information for a movie. If no argument is passed, movie defaults to "Mr. Nobody".
node liri.js movie-this <movie name>

do-what-it-says
Takes info from random.txt (a song) and performs spotify-this-song:

<img width="1326" alt="screen shot 2018-10-15 at 9 30 42 pm" src="https://user-images.githubusercontent.com/40179134/46989244-04f1fa00-d0c2-11e8-84c1-84d90ade7057.png">
# liri-node-app
