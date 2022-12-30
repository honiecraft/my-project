const jwt = require("jsonwebtoken");
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
  // Checking existance of cookie
  const token = req.header("authorization").split(" ")[1];
  if (!token) {
    return next(createError(401, "Not Authenticated!"));
  }
  // Verify the token
  try {
    const user = jwt.verify(token, process.env.JWT);
    req.user = user;
    return next();
  } catch {
    return next(createError(403, "Unvalid Token!"));
  }
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      return next();
    } else return next(createError(403, "Not Authorized!"));
  });
};

module.exports = {
  verifyToken,
  verifyAdmin,
};
