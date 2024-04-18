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
      } else if (message.indexOf('any update') !== -1) {
        return res.json({
          msg: `
          No problem, can I take your email address so I can verify your details?
            `
        })
      } else if (message.indexOf('customer1@cfe.com') !== -1) {
        return res.json({
          msg: `
          That's great, I have sent a verification link across to you. When you see it, please click it.
            `
        })
      } else if (message.indexOf('Thanks ') !== -1) {
        return res.json({
          msg: `
          OK Sarina, we’ve verified your details. Can I get the support ticket number so I can look into this for you?
            `
        })
      } else if (message.indexOf('46382900 ') !== -1) {
        return res.json({
          msg: `
          Thank you, I can see this is a password reset case, which I'm happy to help with! I have sent a reset link to your email, can you confirm you have received this?
            `
        })
      } else if (message.indexOf('see the email ') !== -1) {
        return res.json({
          msg: `
          Fantastic, in the future you can reset your password directly via OneAssist which is quicker and easier for you
            `
        })
      } else if (message.indexOf('keep that in mind ') !== -1) {
        return res.json({
          msg: `
          Happy to help. If you have a few minutes I would love you to stay on the chat and complete a short feedback survey. Thank you have a good day!
            `
        })
      } else if (message.indexOf('legal software solution  ') !== -1) {
        return res.json({
          msg: `
          Thank you for sharing your needs, we definitely have a solution that solves your challenges. Could you please provide us with your contact information like Full Name, Job Title, Email, Company Name, Marketing Opt In so that we can personalise your experience today?
            `
        })
      } else if (message.indexOf('Full name  ') !== -1) {
        return res.json({
          msg: `
          Thank you Sandra, we will now be able to provide you with better assistance and only provide you with useful resources that support you during the research stage. It sounds like you're looking for a solution that not only simplifies your daily operations but also aligns with the size and scope of your firm. Our new software portfolio, OneAdvanced Legal is an excellent choice for small to medium-sized law firms looking to enhance efficiency and productivity. It’s designed to address challenges just like yours, offering seamless case management, document handling, and time tracking in one integrated platform.
            `
        })
      } else if (message.indexOf('sounds promising  ') !== -1) {
        return res.json({
          msg: `
          Absolutely! OneAdvanced Legal empowers firms like yours by automating routine tasks, which frees up your team to focus on more strategic work. For instance, its intuitive case management feature allows you to access all case-related information in one place, improving collaboration and decision-making. The platform also includes advanced document management capabilities, making it easier to store, search, and share documents securely. Plus, with its time tracking and billing features, you can streamline your invoicing process, ensuring accuracy and saving valuable time. Here is a customer testimonial with similar challenges as your law firm www.example.com`
        })
      } else if (message.indexOf('game-changer ') !== -1) {
        return res.json({
          msg: `
          I'm glad to hear it resonates with your needs! On our detailed product page you will find comprehensive information on features, benefits, and how it addresses common challenges faced by firms like yours. The OneAdvanced Legal portfolio also comes with a fantastic eLearning course so that your team can get familiar with the portfolio in their own time, but the OneAdvanced team are also always here to support https://www.oneadvanced.com/products/oneadvanced-legal/  (Open in new tab so prospect can stay on the chat)
          Additionally, now that you have provided your contact details, we will send you related resources tailored to your interests via email.
`
        })
      } else if (message.indexOf('looked at the product page ') !== -1) {
        return res.json({
          msg: `
          Of course! We would love to speak with you. Would you like me to forward your details and enquiry to one of our expert legal software consultants?
`
        })
      } else if (message.indexOf('Yes please ') !== -1) {
        return res.json({
          msg: `
          You're very welcome, Sandra! We’re here to support you and ensure your law firm thrives with the right tools. A member of the team will get in touch shortly and will know all we have discussed today. Have a wonderful day!
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
