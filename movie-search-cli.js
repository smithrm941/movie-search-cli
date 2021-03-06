const cheerio = require('cheerio')
const http = require('http')
const searchString = process.argv.slice(2).join('+')

function searchMovies(searchString, callback) {
  http.get({
      host: 'www.imdb.com',
      path: '/find?ref_=nv_sr_fn&q=' + searchString + '&s=all'
    }, (res) => {
      var html = ''
      res.on('data', (chunk) => {html += chunk})
      res.on('end', () => {
      const movieNames = getMovieNames(html)
      callback(movieNames)
      })
    })
}

function getMovieNames(html) {
  const $ = cheerio.load(html) //mimicks the jQuery convention
  const movieNames = $('.findSection')
    .first()
    .find('.result_text')
    .map((i, elm) => $(elm).text())
    .toArray()
  console.log(movieNames.join('\n'))
  return movieNames;
}

searchMovies(searchString, getMovieNames)

module.exports = {getMovieNames,
  searchMovies,
}
