const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  let rolesArray;
  if (typeof roles === 'string') {
    rolesArray = [roles];
  } else {
    rolesArray = roles;
  }

  return [
    // authorize based on user role
    (req, res, next) => {
      const authHeader = req.headers.authorization;

      if (!authHeader) return res.status(401).send({ error: 'No token provided' });

      const parts = authHeader.split(' ');

      if (parts.length !== 2) return res.status(401).send({ error: 'Token error' });

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformed' });
      // authenticate JWT token and attach user to request object (req.user)
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });
        req.userId = decoded.sub;
        // const userRole = 'admin';
        const userRole = (await User.findByPk(decoded.sub)).roles(); // find user role by its ID
        //
        if (rolesArray.length && !rolesArray.includes(userRole)) {
          // user's role is not authorized
          return res.status(401).json({ message: 'Unauthorized role' });
        }
        // authentication and authorization successful
        next();
      });
    },
  ];
}

module.exports = authorize;
