const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];  // Ensure the token is present

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token provided.",
      });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("JWT verification error: ", err); // Log the error for debugging
        return res.status(401).json({
          success: false,
          message: "Un-Authorized User",
        });
      } else {
        if (!decode || !decode.id) {
          return res.status(401).json({
            success: false,
            message: "Invalid token payload (missing ID)",
          });
        }

        req.user = { _id: decode.id };  // Attach decoded user ID to req.user
        next();
      }
    });
  } catch (error) {
    console.log("Error in authentication middleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
