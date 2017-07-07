/*example from http://code.runnable.com/VkYTcQjDxtM9vaFG/simple-http-get-request-for-node-js-api-and-ajax*/
var http = require('http');

console.log('Creating a simple HTTP request');

http.get("http://api.ipify.org?format=json", function(res) {
  var body = ''; // Will contain the final response
  // Received data is a buffer.
  // Adding it to our body
  res.on('data', function(data){
    body += data;
  });
  // After the response is completed, parse it and log it to the console
  res.on('end', function() {
    var parsed = JSON.parse(body);
    console.log(parsed);
  });
})
// If any error has occured, log error to console
.on('error', function(e) {
  console.log("Got error: " + e.message);
});


/*example from http://thewebivore.com/simple-http-requests-in-node-no-packages/
with https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/*/
var https = require('https')
var req = https.request({
  hostname: 'www.random.org',
  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new',
  port: 443,
  method: 'GET'
}, (res) => {
  var str = ''

  res.on('data', function (chunk) {
    str += chunk
  })

  res.on('end', function () {
    console.log(str);
  })
})

req.end()

/*example from http://thewebivore.com/simple-http-requests-in-node-no-packages/*/
var http = require('http')

http.get('http://nodejs.org/dist/index.json', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
