const express = require('express')
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const app = express()

app.use(express.json())

const auth = {
  auth: {
    api_key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

app.post('/', function (req, res) {
  const name = req.body.name
  const email = req.body.email
  const msg = req.body.message

  sendMail(name, email, msg)

  const redir = { redirect: 'sent' }
  return res.json(redir)
})

module.exports = {
  path: '/api/contact',
  handler: app
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth))

const sendMail = (name, email, msg) => {
  const content = 'Message from: Sam Whaley Sailing' + '\n' + msg + '\n \n From:' + name
  nodemailerMailgun.sendMail({
    from: email,
    to: 'sam@whaley.uk.com',
    subject: 'Sam Whaley Sailing',
    text: content
  })
}
