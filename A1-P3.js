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
    
    if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
  
      
      var min;
      var max = 0;
      var grades; 
      var sum = 0;
      var ave = 0.0;
      var len = 0;
      
      
      for (var i in query['grades'])
      {
        sum = sum + parseFloat(query['grades'][i]);
      }
    
        grades = query['grades'];
        len = grades.length;
        ave = sum/len;
        
        max = query['grades'][0];
       
       for(var i = 0; i < len; i++)
       {
          if(max < query['grades'][i])
            max = query['grades'][i];
       }
       
       min = query['grades'][0];
       
       for(var i = 0; i < len; i++)
       {
          if(min > query['grades'][i])
            min = query['grades'][i];
       }
       
       res.write('<pre>'+"Ave:"+ave+" Min:"+min+" Max:"+max+'</pre>');
    }
    else
    {
      res.end('');
    }
}