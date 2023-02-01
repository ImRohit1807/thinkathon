require("dotenv").config;
const jwt = require("jsonwebtoken");

module.exports = {
  // Generate Token
  generateToken: (payload) => {
    const options = {
      expiresIn: "1d",
      issuer: "thinkathon",
    };
    // const secret = process.env.JWT_SECRET;
    const secret = 'thinkathonsecret';
    return (token = jwt.sign(payload, secret, options));
  },

  // Validate Token
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: "1d",
        issuer: "thinkathon",
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(token, 'thinkathonsecret', options);
        // Let's pass back the decoded token to the request object
        req.decoded = result;
        next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
      };
      res.status(401).send(result);
    }
  },
};
