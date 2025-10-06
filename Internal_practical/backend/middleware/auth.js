const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Token can be in Authorization header: "Bearer <token>"
  const header = req.header('Authorization');
  const token = header ? header.split(' ')[1] : null;

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // store user id in req.user
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
