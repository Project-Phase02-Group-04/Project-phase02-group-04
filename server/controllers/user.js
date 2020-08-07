const { User } = require('../models');
const { compare } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')
const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      const loginData = await User.findOne({ where: { email } })
      if (loginData) {
        if (compare(password, loginData.password)) {
          const dataToken = {
            email: loginData.email,
            hobbies: loginData.hobbies
          }
          const token = encode(dataToken)
          return res.status(200).json({ token })
        } else {
          next({
            errorCode: ''
          });
          return res.status(401).json({ message: "email or password incrorrect" })
        }
      } else {
        return res.status(401).json({ message: "email or password incrorrect" })
      }

    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'internal server error' })
    }
  }

  static register(req, res, next) {
    const { hobbies, email, password } = req.body
    try {
      const regisData = User.create({ email, hobbies, password })
      return res.status(201).json({ message: 'register success' })
    } catch (error) {
      return res.status(500).json({ message: 'internal server error' })
    }
  }

  static async getNews(req, res, next) {
    try {
      const result = await axios({
        method: 'get',
        url: 'https://content.guardianapis.com/search',
        headers: {
          "api-key": '17eaacc7-e89e-430e-826f-8f604853c397'
        },
        params: {
          "q": req.userLogin.hobbies
        }
      })

      let news = result.data.response.results;

      res.status(200).json({
        news
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async googleOauth(req, res, next) {
    const token = req.headers.id_token
    const client = new OAuth2Client(process.env.CLIENT_ID);
    // async function verify() {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      // console.log(payload)
      // const userid = payload['sub'];


      const loginData = await User.findOne({ where: { email: payload.email } })
      if (loginData) {
        const dataToken = {
          email: loginData.email,
          hobbies: loginData.hobbies
        }
        const token = encode(dataToken)
        return res.status(200).json({ token })        
      } else {

        const regisData = User.create({
          email: payload.email,
          hobbies: "sport"
          , password: "123456"
        })
      }

    } catch (error) {
      console.log(error,'<<<<<<<<<')
    }
    // }

  }
}

module.exports = UserController