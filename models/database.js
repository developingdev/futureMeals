const pg = require('pg');
const Sequelize = require('sequelize');

const uri = 'postgres://aoh89:password@localhost/futuremeals';
const sequelize = new Sequelize(uri);
const db = { connections: {} };

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
    // User.sync();
    db.connections.User = User;

    // RECIPE TABLE
    const Recipe = sequelize.define('recipe', {
        day: {
            type: Sequelize.TEXT
        },
        label: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.TEXT
        },
        url: {
            type: Sequelize.TEXT
        },
        yield: {
            type: Sequelize.TEXT
        },
        healthLabels: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        },
        ingredientLines: {
            type: Sequelize.ARRAY(Sequelize.TEXT)
        }
    });
    // Recipe.sync();
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
    // UserAndRecipe.sync();
    db.connections.UserAndRecipe = UserAndRecipe;

    // SESSION TABLE
    const Session = sequelize.define('session', {
        uid: {
            type: Sequelize.INTEGER // primary key true, auto increment true
        }
    });

    Session.sync();
    db.connections.Session = Session;



    User.belongsToMany(Recipe, { through: UserAndRecipe, foreignKey: 'id', otherKey: 'rid' });
    Recipe.belongsToMany(User, { through: UserAndRecipe, foreignKey: 'id', otherKey: 'uid' });


    User.sync();
    Recipe.sync();
    UserAndRecipe.sync();
}

createTables();

module.exports = db;
