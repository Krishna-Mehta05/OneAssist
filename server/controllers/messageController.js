const Messages = require('../models/messageModel')

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body

    const messages = await Messages.find({
      users: {
        $all: [from, to]
      }
    }).sort({ updatedAt: 1 })

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }
    })
    res.json(projectedMessages)
  } catch (ex) {
    next(ex)
  }
}

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from
    })

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    if (data) {
      await delay(2000)
      if (message.indexOf('HR') !== -1) {
        return res.json({
          msg: `
              Yes we have product for HR management. </br></br>Here is more information about product <a href="https://www.oneadvanced.com/products/hr/">HR Management</a>
            `
        })
      }
       else if (message.indexOf('support') !== -1) {
        return res.json({
          msg: `
              Welcome to OneAssist
            `
        })
      } else {
        return res.json({
          msg: `
              Sorry couldnt understand
            `
        })
      }
    } else return res.json({ msg: 'Failed to add message to the database' })
  } catch (ex) {
    next(ex)
  }
}
