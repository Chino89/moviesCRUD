const { Actor, Movie } = require("../database/models");

const actorsController = {
    list: async (req, res) => {
        try {
            const actors = await Actor.findAll();
            return res.render("./actors/actorsList", { actors })
        } catch (error) {
            return res.json(error.message);
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const actor = await Actor.findByPk(id, {include: {
                model: Movie,
                as: 'movies',
                attributes: ['title'],
            }});
            const favoriteMovie = await Movie.findByPk(actor.favorite_movie_id, {attributes: ['title']});
            return res.render("./actors/actorsDetail", { actor, favoriteMovie })
        } catch (error) {
            return res.json(error.message);
        }
    }
}

module.exports = actorsController