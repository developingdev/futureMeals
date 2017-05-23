const pg = require('pg');

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


const uri = 'postgres://yvggemra:1lNb7oKhWZtGLc39iprwZZksFvKN3IZr@hard-plum.db.elephantsql.com:5432/yvggemra';

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
    User.sync();
}

function createTables() {
    // USER TABLE
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
    });
    User.sync();

    // RECIPE TABLE
    const Recipe = sequelize.define('recipe', {
        day: {
            type: Sequelize.STRING
        },
        label: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        yield: {
            type: Sequelize.STRING
        },
        healthLabels: {
            type: Sequelize.STRING
        },
        ingredientLines: {
            type: Sequelize.STRING
        }
    });
    Recipe.sync();

    // JOIN TABLE
    const UserAndRecipe = sequelize.define('userandrecipe', {
        uid: {
            type: Sequelize.INTEGER
        },
        rid: {
            type: Sequelize.INTEGER
        },
        day: {
            type: Sequelize.STRING
        }
    });
    UserAndRecipe.hasMany(User);
    UserAndRecipe.hasMany(Recipe);
    UserAndRecipe.sync();

    // SESSION TABLE
    const Session = sequelize.define('session', {
        uid: {
            type: Sequelize.INTEGER
        }
    });

    Session.hasMany(User);
    Session.sync();
}

createTables();

const db = sequelize;
// pg.connect(uri, (error, db_) => {
//     console.log('database connected');
//     if(error) console.log(error);
//     db.conn = db_;
// })



module.exports = db;
