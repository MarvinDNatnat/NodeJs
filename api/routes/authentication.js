const express = require("express");
const router = express.Router();
const { connection, connectionSP } = require("../database/connection");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  const query = `call shared.process_login('${req.body.username}', '${req.body.password}', 0, 3);`;
  const result = await connectionSP(query);
  if (result.Valid == 1) {
    const token = jwt.sign(
      { user_id: result.UserID, secuiu_code: result.SecuCode },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    return (
      res
        //   .cookie("access_token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //   })
        .status(200)
        .json({
          message: "Logged in successfully 😊 👌",
          data: result,
          token: token,
        })
    );
  }
});

module.exports = router;
