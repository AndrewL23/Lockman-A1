var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      
      var word1 = query["word1"];
      var word2 = query["word2"];
      var str1 = word1.length;
      var str2 = word2.length;
      var num = str1 + str2;
      var dots = [];

      /*
      res.write(word1);
      for(var i = 0; i < 30-num; i++)
      {
        res.write(".");
      }
      res.write(word2);
      */
      for(var i = 0; i < 30-num; i++)
      {
        dots[i] = ".";
      }
      
      var newStr = dots.join("");
      
      res.write('<pre>' + word1 + newStr + word2 + '</pre>');
      
      res.end('');
    }
    else
    {
      res.end('');
    }
}