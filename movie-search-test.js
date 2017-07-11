var expect = require('chai').expect;
var getMovieNames = require('./movie-search-cli.js').getMovieNames;
var searchMovies = require('./movie-search-cli.js').searchMovies;
const http = require('http')

describe('getMovieNames', function() {
  it("returns an array of movie names", function(done){
    searchMovies("movie", (movieNames) => {
      expect(movieNames).to.be.an('array');
      done();
    })
  })
})
