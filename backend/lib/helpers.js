const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const stripIds = (arr) =>
      Array.isArray(arr) ? arr.map(({ id, ...rest }) => rest) : []

module.exports = { generateToken, stripIds };
