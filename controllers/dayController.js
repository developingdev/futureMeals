const db = require('../models/database');

const dayController = {};

dayController.getRowsForDay = (req, res, next) => {
    const username = req.params.username;
    const day = req.params.day;
    const User = db.connections.User;
    const Recipe = db.connections.Recipe;
    const UserAndRecipe = db.connections.UserAndRecipe;

    Recipe.findAll({
        include: [{
            model: User,
        }],
        where: { day }

    }).then((results) => {
        const recipes = results.map(ele => {
            const recipe = ele.dataValues;
            
            return recipe;
        });
        console.log(`found ${results.length} results for ${day}!`);
        res.end(JSON.stringify(recipes));
        // res.end();
    });

    // User.belongsTomMany(Recipe, { through: 'userandrecipe' });
    // Recipe.belongsTomMany(User, { through: 'userandrecipe' });

    // db.connections.UserAndRecipe.hasMany(db.connections.Recipe, { foreignKey: 'id' });
    // db.connections.Recipe.belongsTo(db.connections.UserAndRecipe, { foreignKey: 'rid' });

    // db.connections.UserAndRecipe.findAll({ where: { day }, include: [db.connections.Recipe] })
    //     .then((results) => {
    //         const recipes = results.map(ele => ele.recipes[0].dataValues);
    //         console.log(`found ${results.length} results for ${day}!`, recipes);
    //         res.end(JSON.stringify(recipes));
    //     });
};

module.exports = dayController;
