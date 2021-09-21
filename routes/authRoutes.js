const passport = require("passport");

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
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    // passport automatically attaches the user property to the req object

    req.logout();

    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    //cookie session takes the data out of the cookie and assigns it to req.session
    // Then passport access the data that exist on req.session

    // passport automatically attaches the user property to the req object
    res.send(req.user);
  });

  app.get("/test", (req, res) => {
    const host = req.get("host");
    // const origin = req.get("origin");
    // const userIP = req.socket.remoteAddress;

    res.send({ hi: host });
  });
};
