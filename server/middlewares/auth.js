const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader :>> ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.payload = payload;
    next();
  });
};

module.exports = authenticate;
