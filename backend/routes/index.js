const express = require('express');
const router = express.Router();

const authRoute = require("./auth");
const postsRoute = require("./posts");

router.use("/auth", authRoute);

router.use("/posts", postsRoute)
 
module.exports = router