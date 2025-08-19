const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      return res.status(401).json({ err: 'Authorization header required.' });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded.payload;
    
    next();
  } catch (err) {
    return res.status(401).json({ err: 'Invalid token.' });
  }
}

module.exports = verifyToken;
