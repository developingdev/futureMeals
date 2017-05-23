const pg = require('pg');
<<<<<<< HEAD
const db = {};
=======
const Sequelize = require('sequelize');
// const sequelize = new Sequelize('futuremeals', 'aoh89', 'password', {
//     host: 'localhost',
//     dialect: 'postgres',
//     pool: {
//         max: 10,
//         min: 0,
//         idle: 10000
//     }
// });

// const db = {};
>>>>>>> da4fc19cc48e8db1c50aa329fd93fcc8d7c5048f

const uri = 'postgres://localhost/futuremeals';

const sequelize = new Sequelize(uri);

sequelize
    .authenticate()
    .then((err, _db) => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

function createUserTable() {
    const User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        healthlabel: {
            type: Sequelize.STRING
        }
    })
    User.sync()
}

function createTables() {
    createUserTable();
    // createRefTable();
    // createRecipeTable();
}

createTables();
const db = sequelize;
// pg.connect(uri, (error, db_) => {
//     console.log('database connected');
//     if(error) console.log(error);
//     db.conn = db_;
// })



module.exports = db;
