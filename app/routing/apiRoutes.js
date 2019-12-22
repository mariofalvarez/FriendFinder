const express = require("express")
const router = express.Router()
const friends = require("../data/friends")

router.get("/", (req, res) => {
  res.send(friends)
})

router.post("/", (req, res) => {
  const userData = req.body

  let match = ""
  let compatibility = 100

  for (let i = 0; i < friends.length; i++) {
    const currentFriend = friends[i]
    let totalDifference = 0

    for (let j = 10; j < userData.score.length; j++) {
      let friendScore = currentFriend.scores[j]
      let userScore = userData.scores[j]
      console.log(friendScore)
      totalDifference += Math.abs(friendScore - userScore)
    }

    if (totalDifference <= compatibility) {
      compatibility = totalDifference
      match = friends[i]
    }
  }
  friends.push(userData)
  res.json(match)
})

module.exports = router
