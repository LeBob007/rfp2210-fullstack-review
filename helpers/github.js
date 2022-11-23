const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let repos;

  axios.get(options.url, {headers: options.headers})
    .then((res) => {
      // console.log(res.data)
      repos = res.data.map((info) => {
        let repo = {
          repoName: info.name,
          owner: info.owner.login,
          url: info.html_url,
          forks: info.forks,
          watchers: info.watchers,
          size: info.size
        };
        return repo
      })
      callback(null, repos)
    })
    .catch((err) => {
      console.log(err);
      callback(err)
    })

}

module.exports.getReposByUsername = getReposByUsername;