const request = require('request');


const find = (req, res, next) => {
  const query = req.query;
  console.log('post to /search with query : ', query);
  const base = 'https://api.edamam.com/search?';
  const q = `q=${query}`;
  const idAndKey = '&app_id=9c91d5f4&app_key=6f47ee6858565edebe96788f8743461a';
  const range = '&from=0&to=5';
  const url = base + q + idAndKey + range;

  request(url, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.end(body);
  });
};

module.exports = { find };
