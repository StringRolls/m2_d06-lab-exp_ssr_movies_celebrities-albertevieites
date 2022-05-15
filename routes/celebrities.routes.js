// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const res = require("express/lib/response");
const Celebrity = require("../models/Celebrity.model");

// CELEBRITY
// 1. Create new celebrity
router
  .route("/celebrities/create")
  .get((req, res, next) => res.render("celebrities/new-celebrity"))
  .post((req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => {
        res.redirect("/celebrities");
      })
      .catch((err) => res.render("celebrities/new-celebrity"));
  });

// 2. List of celebrities
router.route("/celebrities").get((req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) =>
      console.log("The error while searching celebrities occurred: ", err)
    );
});

// export router file
module.exports = router;