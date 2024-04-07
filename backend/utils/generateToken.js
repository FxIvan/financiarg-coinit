const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "VsvrgG7HSh872LaZHDRXWbN0tP6", {
    expiresIn: "48h",
  });
};

module.exports = generateToken;
