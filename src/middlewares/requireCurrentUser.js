const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

function requireCurrentUser() {
  return [
    // authorize based on user role
    (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'No token provided' });

      const parts = authHeader.split(' ');

      if (parts.length !== 2) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Token error' });

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Token malformed' });
      // authenticate JWT token and attach user to request object (req.user)
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(httpStatus.UNAUTHORIZED).send({ error: 'Token invalid' });
        if (req.params.userId.toString() !== decoded.sub.toString()) {
          // user is requesting content of other user
          return res.status(httpStatus.UNAUTHORIZED).json({ message: 'You can only access your own content' });
        }
        // authentication and authorization successful
        req.userId = decoded.sub;
        next();
      });
    },
  ];
}

module.exports = requireCurrentUser;
