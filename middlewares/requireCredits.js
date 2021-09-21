module.exports = (req, res, next) => {
  if (req.user.credit < 1) {
    return res.status(403).sned({ error: "Not enough credits!" });
  }

  next();
};
