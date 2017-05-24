const request = require('request');


const find = (req, res, next) => {
  const base = 'https://api.edamam.com/search?';
  const q = `q=${req.query.query}`;
  const idAndKey = '&app_id=9c91d5f4&app_key=6f47ee6858565edebe96788f8743461a';
  const range = '&from=0&to=5';
  const url = base + q + idAndKey + range;
  console.log('post to /search with query : ', url);
  request(url, (error, response, body) => {
    console.log('first:', body); // Print the HTML for the Google homepage.
    res.end(body);
  });
};

module.exports = { find };
