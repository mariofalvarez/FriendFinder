const express = require("express")
const router = express.Router()
const friends = require("../data/friends")

router.get("/", (req, res) => {
  res.send(friends)
})

router.post("/", (req, res) => {
  const newUser = req.body

  let match = ""
  let compatibility = 100

  for (let i = 0; i < friends.length; i++) {
    const currentFriend = friends[i]
    let totalDifference = 0

    for (let j = 0; j < newUser.score.length; j++) {
      let friendScore = currentFriend.scores[j]
      let userScore = newUser.scores[j]
      console.log(friendScore)
      totalDifference += Math.abs(friendScore - userScore)
    }

    if (totalDifference <= compatibility) {
      compatibility = totalDifference
      match = friends[i]
    }
  }
  friends.push(newUser)
})

module.exports = router
