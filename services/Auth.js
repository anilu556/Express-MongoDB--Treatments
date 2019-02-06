//requerir jwt

const jwt = require('jsonwebtoken');

//crear funcion Auth

const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    next();
  } catch (error) {
     res
      .status(401)
      .json({
        message: 'Authentication Failed'
      });
  }
}

module.exports = Auth;
