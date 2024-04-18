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
      await delay(1000)
      if (message.indexOf('HR') !== -1) {
        return res.json({
          msg: `
              Yes we have product for HR management. </br></br>Here is more information about product <a href="https://www.oneadvanced.com/products/hr/">HR Management</a>
            `
        })
      } else if (message.indexOf('any update yet') !== -1) {
        return res.json({
          msg: `
          Please can I get your email address so I can verify your details?
            `
        })
      } else if (message.indexOf('customer1@cfe.com') !== -1) {
        return res.json({
          msg: `
          Thank you for confirming, I have sent a link to this email address for you to verify.
            `
        })
      } else if (message.indexOf('I have received this ') !== -1) {
        return res.json({
          msg: `
          Thank you for verifying, can I get the support ticket number so I can look into this for you?
            `
        })
      } else if (message.indexOf('46382900 ') !== -1) {
        return res.json({
          msg: `
          Thank you, I can see this is a password reset case, I am able to help with this, I have sent a reset link to your email, can you confirm you have received this?
            `
        })
      } else if (message.indexOf('I am able to reset my password now ') !== -1) {
        return res.json({
          msg: `
          Happy to help, in the future you can reset your password via OneAssist which is quicker and easier for you
            `
        })
      } else if (message.indexOf('keep that in mind ') !== -1) {
        return res.json({
          msg: `
          Happy to help. If you have a few minutes I would love you to stay on the chat and complete a short feedback survey. Thank you have a good day!
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
