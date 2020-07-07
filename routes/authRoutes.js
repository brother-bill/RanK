const passport = require("passport"); // Gives express idea of how to handle authentication

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/listings");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); //.logout() is automatically passed to req object by passport
    res.redirect("/");
  });

  // Req, incoming request
  // Res, outgoing response
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    //res.send(req.session); test out session
  });
};
