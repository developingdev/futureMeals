const pg = require('pg');

const db = {};

const uri = 'postgres://aoh89:password@localhost/futuremeals';


pg.connect(uri, (error, db_) => {
    console.log('database connected');
    if(error) console.log(error);
    db.conn = db_;
})

module.exports = db;