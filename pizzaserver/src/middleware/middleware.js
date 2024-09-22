const jwt=require('jsonwebtoken')

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).send('Token required.');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
};