const fs = require("fs");
const publicKey = fs.readFileSync("./keys/public.pem");
const jwt = require("jsonwebtoken");

const secured = (req, res, next) => {
  try {
    
    const token = req.query.token;
    const revert = jwt.verify(token, publicKey);
    next();
   } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
};

module.exports = { secured };
