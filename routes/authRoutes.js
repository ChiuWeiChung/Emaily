const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    // passport automatically attaches the user property to the req object
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    //cookie session takes the data out of the cookie and assigns it to req.session
    // Then passport access the data that exist on req.session

    // passport automatically attaches the user property to the req object
    res.send(req.user);
  });
};
