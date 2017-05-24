const pg = require('pg');
const Sequelize = require('sequelize');

const uri = 'postgres://@localhost/futuremeals';
const sequelize = new Sequelize(uri);
const db = {connections: {}};

sequelize
    .authenticate()
    .then((err, _db) => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

function createTables() {
    // USER TABLE
    const User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        healthlabel: {
            type: Sequelize.STRING
        }
    });
    User.sync();
    db.connections.User = User;

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
    db.connections.Recipe = Recipe;

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
    UserAndRecipe.sync();
    db.connections.UserAndRecipe = UserAndRecipe;

    // SESSION TABLE
    const Session = sequelize.define('session', {
        uid: {
            type: Sequelize.INTEGER
        }
    });

    Session.sync();
    db.connections.Session = Session;
}

createTables();

module.exports = db;
