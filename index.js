// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello VNAJ API' });
});

Date.prototype.isValid = function () {
              
  // If the date object is invalid it
  // will return 'NaN' on getTime() 
  // and NaN is never equal to itself.
  return this.getTime() === this.getTime();
};

app.get("/api", function (req, res){
  let parsedDate = new Date();
  const timestampInMs = parsedDate.getTime();
  res.json({ "unix": timestampInMs, "utc": parsedDate.toUTCString() })
})

app.get("/api/:date", function (req, res) {
    console.log("Received date: ", req.params.date)
    let parsedDate = new Date(req.params.date);
    console.log("Parsed date: ", parsedDate)
    console.log(typeof parsedDate)
    

    if (parsedDate.isValid()) {
      // 👇️ timestamp in milliseconds
      const timestampInMs = parsedDate.getTime();
      res.json({ "unix": timestampInMs, "utc": parsedDate.toUTCString() })
    }
    else {
      parsedDate = new Date(parseInt(req.params.date))
      const timestampInMs = parsedDate.getTime();
      if (parsedDate.isValid()) {
        res.json({ "unix": timestampInMs, "utc": parsedDate.toUTCString() })
      }
      else{
        res.json({ error: "Invalid Date" })
      }
      
    }
});



// listen for requests :)
//process.env.PORT
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//http://localhost:3000/