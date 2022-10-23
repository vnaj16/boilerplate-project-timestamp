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

app.get("/api/:date", function (req, res) {
  if (req.params.date) {
    console.log("Received date: ", req.params.date)
    let parsedDate = new Date(req.params.date);
    console.log("Parsed date: ", parsedDate)

    if (parsedDate === "Invalid Date") {
      parsedDate = new Date(parseInt(req.params.date))
      if (parsedDate === "Invalid Date") {
        res.json({ error: "Invalid Date" })
      }
      res.json({ "unix": req.params.date, "utc": parsedDate.toUTCString() })
    }
    else {
      // 👇️ timestamp in milliseconds
      const timestampInMs = parsedDate.getTime();

      res.json({ "unix": timestampInMs, "utc": parsedDate.toUTCString() })
    }
  }
  else {
    let parsedDate = new Date();
    const timestampInMs = parsedDate.getTime();
    res.json({ "unix": timestampInMs, "utc": parsedDate.toUTCString() })
  }

});



// listen for requests :)
//process.env.PORT
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//http://localhost:3000/