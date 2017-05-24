const db = require('../models/database');

const dayController = {};

dayController.getRowsForDay = (req, res, next) => {
    // console.log('req.params: ', req.params)
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
    // db.conn.query(`SELECT * FROM ${username} WHERE day = '${day}';`, 
    //     (error, result) => {
    //         console.log(result)
    //         if (error) res.status(400).send(error);
    //         else res.status(200).send(result.rows);
    //     })
}

module.exports = dayController;