const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = class Auth {
    static async check(req, res, next) {
        try {
            const userToken = jwt.verify(
                req.headers.accesstoken,
                process.env.SECRET
            );

            let data = await User.findOne({
                where: {
                    email: userToken.email
                }
            })

            req.userLogin = data;
            next();

        } catch (error) {
            console.log(error);
            next({
                code: 409,
                type: 'token',
                body: error
            });
        }
    }
}