// requireLogin middleware for routes that require it
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must login" });
  }
  next();
};
