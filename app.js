const express = require("express");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const jwtPrivateKey = "secretKey";
const jwtAlgorithm = "HS256";
const jwtExpiredIn = "30s";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  res.json({
    message: "Post Created...",
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com",
  };

  jwt.sign({ user: user }, jwtPrivateKey,{algorithm:jwtAlgorithm,expiresIn:jwtExpiredIn}, (err, token) => {
    //   console.log(token);
    res.status(200).json({
      token: token,
    });
  });
});

//FORMAT TOKEN
// Authorization: Bearer <access_token>

//Verify token
function verifyToken(req, res, next) {
  //get auth header value
  const token = req.headers["authorization"];

  //decoded :payload
  jwt.verify(token,jwtPrivateKey, (err, decoded) => {
      console.log(decoded);
    if (err) {
      res.sendStatus("403").json({message:err});
    } else {
      next();
    }
  });
}

app.listen(3000, () => console.log("Server started on port 3000"));
