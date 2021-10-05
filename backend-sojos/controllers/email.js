const emailRouter = require('express').Router()
const nodeMailer = require('nodemailer')
const moment = require('moment')
const User = require('../models/user')

let transporter = nodeMailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth:{
    user: "derek@sojournershousechurch.com",
    pass: "wa!kF8th"
  }
})

emailRouter.post('/', async (req, res) => {
  const users = await User.find({})
  const filtusers = users
    .filter(data => data.kid === false )

  const testusers =[
    {username: "dwest62@gmail.com", firstName: "Derek"},
    {username: "heidiewest1@gmail.com", firstName: "Heidi"},
    {username: "michael.f.gonsalves@gmail.com", firstName: "Michael"}
  ]
  const nextSat =moment().weekday(6).format("MM-DD-YY")
    
  const mailOptions = (email, firstName, username) => {
    return(
      {
        from: "info@sojournershousechurch.com",
        to: email,
        subject: `House Church Website Invitation`,
        html:`<p>Dear ${firstName},</p> <p>You are invited to join sojournershousechurch.com. Your username is ${username} and your password is walkfaith. If you have already recieved an email with this information, please disregard this email.</p>`
      }
    )
  }

  for(let i = 0; i < filtusers.length; i++){
    /*await transporter.sendMail(mailOptions(filtusers[i].username, filtusers[i].firstName))*/
    console.log(`email sent to ${filtusers[i].firstName} @ ${filtusers[i].username}`)
  }
  res.status(401).end
})

module.exports = emailRouter