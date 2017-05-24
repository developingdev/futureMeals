const db = require('../models/database');

const dayController = {};

dayController.getRowsForDay = (req, res, next) => {
    let username = req.params.username;
    let day = req.params.day;

    db.connections.UserAndRecipe.hasMany(db.connections.Recipe, { foreignKey: 'id' });
    db.connections.Recipe.belongsTo(db.connections.UserAndRecipe, { foreignKey: 'id' });

    db.connections.UserAndRecipe.findAll({ where: { day: day }, include: [db.connections.Recipe] })
        .then((results) => {
            const recipes = results.map(ele => ele.recipes[0].dataValues);
            console.log(`found ${results.length} results for ${day}!`, recipes);
            res.end(JSON.stringify(recipes));
        });
}

module.exports = dayController;