var http = require('http')
http.get({
  hostname: 'api.openweathermap.org',
  path: '/data/2.5/weather?q=' + encodeURIComponent(process.argv[2]) + '&mode=json&appid=bebb75726c4ad7fd70673963bf37adce',
  port: 80,
}, (res) => {
  var str = ''

  res.on('data', function(chunk) {
    str += chunk
  })

  res.on('end', function() {
    var parsed = JSON.parse(str)
    var tempInFarenheit = ((9/5)*parsed.main.temp) - 459.67
    console.log("Temperature in Farenheit:", tempInFarenheit.toFixed(2));
  })
})
