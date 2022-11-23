const express = require('express');
let app = express();
const github = require('../helpers/github');
const db = require('../database/index');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(404).send('Error')
    } else {
      db.save(data, (err, result) => {
        if (err) {
          res.status(404).send('Error')
        } else {
          res.status(201).send('Success!')
        }
      })
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.filter((err, result) => {
    if (err) {
      res.status(404).send('Error');
    } else {
      res.status(200).send(result);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
