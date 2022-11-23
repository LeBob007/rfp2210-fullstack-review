const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoName: String,
  owner: String,
  url: {type: String, unique: true},
  forks: Number,
  watchers: Number,
  size: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.find({owner: repos[0].owner}).then((res) => {
    let data = res.map((repo) => {
      return repo.url;
    })
    let arr = [];
    repos.forEach((repo) => {
      if (!data.includes(repo.url)) arr.push(repo)
    })

    Repo.insertMany(arr, {ordered: false})
      .then((res) => {
        console.log('success insertion! pog!')
        callback(null, res)
      })
  })

}

let filter = (callback) => {
  Repo.find().sort({watchers: -1}).limit(25).then((res) => {
    let data = res.map((repo) => {
      return {
        repoName: repo.repoName,
        owner: repo.owner,
        url: repo.url,
        watchers: repo.watchers
      }
    })
    callback(null, data)
  })
}

module.exports.save = save;
module.exports.filter = filter;