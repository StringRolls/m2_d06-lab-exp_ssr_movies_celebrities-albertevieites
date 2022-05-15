// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");

const res = require("express/lib/response");
// MOVIE
// 3. Create new movie
router
  .route("/movies/create")
  .get((req, res, next) => res.render("movies/new-movie"))
  .post((req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => res.render("movies/new-movie"));
  });

// 4. List of movies
router
  .route("/movies")
  .get((req, res, next) => {
    Movie.find()
      .then((movies) => {
        res.render("movies/movies", { movies });
    })
      .catch((err) =>
        console.log("The error while searching movies occurred: ", err)
    );
  });

// 5. Movie details
router
  .route("/movies/:id")
  .get((req, res) => {
  const id = req.params.id;
    Movie.findById(id)
      .populate("cast")
      .then((movie) => {
        res.render("movies/movie-details", { movie });
      })
      .catch((err) =>
        console.log(`Error while seeing movie details from the DB: ${err}`)
      );
  });

// 6. Update existing movies
router
  .route("/movies/:id/edit")
  .get((req, res) => {
      const { id } = req.params;

      Movie.findById(id)
      .populate("cast")
      .then((movie) =>{
      Celebrity.find()
      .then((celebrities) => { 
        res.render("movies/edit-movie", {
          movie: movie, celebrities: {celebrities}
          })
      })
      })
  })
  .post((req, res) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
      .then(() => res.redirect(`/movies`))
      .catch((err) => console.log(err))
})

// 7. Delete movie
router
  .route('/movies/:id/delete')
  .post((req, res) => {
    const { id } = req.params;

    Movie.findByIdAndRemove(id)
      .then(() => res.redirect("/movies"))
      .catch((err) => console.log(err))
  });

// export router modules
module.exports = router;
