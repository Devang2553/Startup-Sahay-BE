const jwt = require('jsonwebtoken');
const SECRET_KEY="registerApi";

module.exports  = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Access token not provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (error, existingUser) => {
    if (error) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = existingUser ;
    next();
  });
};
