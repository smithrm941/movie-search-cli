const cheerio = require('cheerio')
const http = require('http')

http.get({
    host: 'www.imdb.com',
    path: '/find?ref_=nv_sr_fn&q=' + process.argv.slice(2).join('+') + '&s=all'
  }, (res) => {
    var html = ''
    res.on('data', (chunk) => {html += chunk})
    res.on('end', () => {
    getMovieNames(html)
    })
  })

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

module.exports = getMovieNames;
