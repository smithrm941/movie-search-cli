var expect = require('chai').expect;
var getMovieNames = require('./movie-search-cli.js');
const http = require('http')

describe('getMovieNames', function() {
  it("returns an array of movie names", function(done){
    http.get({
        host: 'www.imdb.com',
        path: '/find?ref_=nv_sr_fn&q=' + process.argv.slice(2).join('+') + '&s=all'
      }, (res) => {
        var html = ''
        res.on('data', (chunk) => {html += chunk})
        res.on('end', () => {
        expect(getMovieNames(html)).to.be.an('array');
        done();
        })
      })
  })
})
