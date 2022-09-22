const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const Authorization = req.header("authorization");
if (!Authorization) {
    //ERROR
    const err = new Error("Please register account !");
    err.statusCode = 404;
    return next(err);
  }
  const token = Authorization.replace("Bearer ", "");
  const { userId } = jwt.verify(token, process.env.APP_SECRET);
  req.user = { userId };
  next();
};
