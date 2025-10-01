
const jwt = require('jsonwebtoken');
const {User} = require('../models');

class Middleware {
  async handle(req, res, next) {
    next();
  }
}

class AuthMiddleware extends Middleware {
  constructor() {
    super()
  }

  async handle(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            await super.handle(req, res, next);
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
  }
}

module.exports = { AuthMiddleware };
