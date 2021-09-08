module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).sned({ error: "You must log in!" });
  }

  next();
};
