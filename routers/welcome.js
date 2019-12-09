const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("<h2>Welcome to the random blog post API</h2>")
})

router.get("/api", (req, res) => {
  res.json({ message: "Welcome to Andrew's Hubs API" })
})

module.exports = router