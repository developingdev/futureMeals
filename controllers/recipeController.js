const db = require('../models/database');

const recipeController = {};

recipeController.saveRecipe = (req, res, next) => {
    let day = req.body.day;
    let username = req.body.username;
    let recipe = req.body.recipe.recipe;
    if (!day || !username || !recipe) res.status(400).send('please send day username AND recipe');
    else {
        const { label, image, url, healthLabels, ingredientLines } = recipe;
        let _yield = recipe.yield;

        db.connections.Recipe.create({
            day,
            label,
            image,
            url,
            'yield': _yield,
            healthLabels,
            ingredientLines
        }).then((recipe) => {
            db.connections.User.findAll({
                where: {
                    username: username
                }
            }).then((users) => {
                const uid = users[0].dataValues.id;
                const rid = recipe.dataValues.id;
                console.log(`rid ${rid}`, `uid ${uid}`);
                db.connections.UserAndRecipe.create({
                    uid,
                    rid,
                    day
                }).then((recipe) => {
                    res.status(200);
                    res.end();
                });
            });
        });

    }
}

recipeController.deleteRecipe = (req, res, next) => {
    let day = req.body.day;
    let username = req.body.username;
    db.conn.query(`DELETE FROM ${username} WHERE day='${day}';`,
        (err, result) => {
            if (err) return new Error(err);
            else {
                res.send(result);
            }
        }
    );
}

module.exports = recipeController;