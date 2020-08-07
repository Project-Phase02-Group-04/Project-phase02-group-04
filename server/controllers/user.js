const { User } = require('../models');
const { compare } = require('../helpers/bcrypt')
const { encode } = require('../helpers/jwt')
const axios = require('axios');

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
          return res.status(200).json({token})
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
}

module.exports = UserController