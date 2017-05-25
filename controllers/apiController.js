const request = require('request');

const find = (req, res, next) => {
  console.log(req.query)
  const query = req.query;
  const base = 'https://api.edamam.com/search?';
  const q = `q=${query.query}`;

  const idAndKey = '&app_id=9c91d5f4&app_key=6f47ee6858565edebe96788f8743461a';
  // const url = base + q + idAndKey;
  const range = '&from=0&to=10';
  const url = base + q + idAndKey + range;
  request(url, (error, response, body) => {
    res.end(body);
  });
};

module.exports = { find };
